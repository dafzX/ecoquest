<template>
  <div
    ref="host"
    class="landing-island eco-scene"
    role="img"
    aria-label="Pulau ekosistem 3D EcoQuest dengan pepohonan, jalur, kolam, dan turbin angin"
  >
    <div class="landing-island__halo" aria-hidden="true"></div>
    <div ref="canvasHost" class="eco-scene__canvas" aria-hidden="true"></div>
    <EcoIslandIllustration v-if="showFallback" class="eco-scene__fallback" />

    <div class="landing-float-card landing-float-card--level">
      <div class="landing-float-card__top">
        <span class="landing-mini-icon"><Sprout :size="16" aria-hidden="true" /></span>
        <span>Level 1</span>
        <span class="landing-float-card__tag">PREVIEW</span>
      </div>
      <strong>Eco Explorer</strong>
      <div class="landing-progress"><span style="width: 8%"></span></div>
      <small>0 / 500 XP</small>
    </div>

    <div class="landing-float-card landing-float-card--impact">
      <span class="landing-mini-icon landing-mini-icon--blue"><Cloud :size="16" aria-hidden="true" /></span>
      <div><small>CO₂ dihemat</small><strong>0 kg</strong></div>
    </div>

    <div class="landing-float-card landing-float-card--mission">
      <span class="landing-mini-icon"><Recycle :size="16" aria-hidden="true" /></span>
      <div><small>Misi pilihan</small><strong>Daur ulang botol</strong><em>+50 XP</em></div>
    </div>

    <div class="landing-float-card landing-float-card--streak">
      <span class="landing-mini-icon landing-mini-icon--amber"><Flame :size="16" aria-hidden="true" /></span>
      <div><strong>0 hari</strong><small>Mulai kebiasaan baikmu</small></div>
    </div>

    <p class="landing-island__caption">Pratinjau ekosistem EcoQuest</p>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { Cloud, Flame, Recycle, Sprout } from 'lucide-vue-next'
import EcoIslandIllustration from './EcoIslandIllustration.vue'

const host = ref(null)
const canvasHost = ref(null)
const showFallback = ref(true)

let renderer
let scene
let camera
let animationFrame = 0
let resizeObserver
let intersectionObserver
let reducedMotion = false
let isVisible = true
let isDisposed = false
let elapsed = 0
let previousTime = 0
let island
let turbineBlades
let pointerTarget
let pointerPosition
let THREE

const geometries = new Set()
const materials = new Set()
const textures = new Set()

function trackGeometry(geometry) {
  geometries.add(geometry)
  return geometry
}

function trackMaterial(material) {
  materials.add(material)
  return material
}

function trackTexture(texture) {
  textures.add(texture)
  return texture
}

function createMaterial(color, roughness = 0.88) {
  return trackMaterial(new THREE.MeshStandardMaterial({ color, roughness, metalness: 0.02 }))
}

function makeMesh(geometry, material, parent, position, scale) {
  const mesh = new THREE.Mesh(geometry, material)
  if (position) mesh.position.set(...position)
  if (scale) mesh.scale.set(...scale)
  mesh.castShadow = true
  mesh.receiveShadow = true
  parent.add(mesh)
  return mesh
}

function makeIslandShape() {
  const shape = new THREE.Shape()
  shape.moveTo(-2.18, -0.22)
  shape.bezierCurveTo(-2.42, -0.86, -1.72, -1.55, -0.98, -1.4)
  shape.bezierCurveTo(-0.45, -1.81, 0.28, -1.72, 0.62, -1.28)
  shape.bezierCurveTo(1.28, -1.53, 2.13, -1.13, 2.25, -0.48)
  shape.bezierCurveTo(2.6, 0.12, 2.08, 0.83, 1.52, 0.91)
  shape.bezierCurveTo(1.01, 1.55, 0.2, 1.48, -0.34, 1.24)
  shape.bezierCurveTo(-1.02, 1.65, -1.87, 1.24, -1.91, 0.74)
  shape.bezierCurveTo(-2.49, 0.54, -2.63, 0.02, -2.18, -0.22)
  return shape
}

function addTree(parent, materialsForTrees, geometryForTrees, position, scale = 1) {
  const tree = new THREE.Group()
  tree.position.set(position[0], position[1], position[2])
  tree.scale.setScalar(scale)

  makeMesh(geometryForTrees.trunk, materialsForTrees.trunk, tree, [0, 0.16, 0])
  makeMesh(geometryForTrees.foliage, materialsForTrees.foliageDark, tree, [0, 0.62, 0], [0.35, 0.38, 0.34])
  makeMesh(geometryForTrees.foliage, materialsForTrees.foliageMid, tree, [-0.2, 0.79, 0.04], [0.27, 0.3, 0.28])
  makeMesh(geometryForTrees.foliage, materialsForTrees.foliageLight, tree, [0.19, 0.82, -0.03], [0.25, 0.28, 0.26])
  parent.add(tree)
  return tree
}

function addBush(parent, material, geometry, position, scale = 1) {
  const bush = new THREE.Group()
  bush.position.set(position[0], position[1], position[2])
  bush.scale.setScalar(scale)
  makeMesh(geometry, material, bush, [-0.1, 0.1, 0], [0.23, 0.2, 0.22])
  makeMesh(geometry, material, bush, [0.11, 0.14, 0.03], [0.19, 0.17, 0.19])
  parent.add(bush)
}

function addWindTurbine(parent, position) {
  const turbine = new THREE.Group()
  turbine.position.set(position[0], 0.79, position[2])
  makeMesh(
    trackGeometry(new THREE.DodecahedronGeometry(0.055, 0)),
    createMaterial('#F5FAF4', 0.6),
    turbine,
    [0, 0.88, 0],
    [1, 1, 0.82]
  )

  const tower = new THREE.Mesh(
    trackGeometry(new THREE.CylinderGeometry(0.035, 0.065, 0.86, 8)),
    createMaterial('#F8FBF7', 0.65)
  )
  tower.position.y = 0.43
  tower.castShadow = true
  turbine.add(tower)

  turbineBlades = new THREE.Group()
  turbineBlades.position.y = 0.88
  const bladeGeometry = trackGeometry(new THREE.ExtrudeGeometry(
    (() => {
      const shape = new THREE.Shape()
      shape.moveTo(0, -0.035)
      shape.quadraticCurveTo(0.05, 0.28, 0.025, 0.42)
      shape.quadraticCurveTo(0.01, 0.46, -0.02, 0.42)
      shape.quadraticCurveTo(-0.045, 0.21, -0.035, -0.035)
      shape.closePath()
      return shape
    })(),
    { depth: 0.025, bevelEnabled: false }
  ))
  const bladeMaterial = createMaterial('#F7FAF6', 0.58)
  for (let index = 0; index < 3; index += 1) {
    const blade = new THREE.Mesh(bladeGeometry, bladeMaterial)
    blade.rotation.z = (index * Math.PI * 2) / 3
    blade.castShadow = true
    turbineBlades.add(blade)
  }
  turbine.add(turbineBlades)
  parent.add(turbine)
}

function addFlowers(parent) {
  const flowerGeometry = trackGeometry(new THREE.SphereGeometry(0.035, 6, 5))
  const flowerMaterials = [
    createMaterial('#F4E8B8', 0.75),
    createMaterial('#F8F5E9', 0.75),
    createMaterial('#EACFD0', 0.78)
  ]
  const positions = [
    [-1.6, 0.8, -0.38], [-1.38, 0.8, -0.18], [-0.94, 0.8, 0.74],
    [-0.76, 0.8, 0.85], [0.8, 0.8, 0.92], [1.01, 0.8, 0.98],
    [1.87, 0.8, 0.14], [1.69, 0.8, 0.3], [-0.23, 0.8, -1.18]
  ]
  positions.forEach((position, index) => {
    makeMesh(flowerGeometry, flowerMaterials[index % flowerMaterials.length], parent, position, [1, 0.62, 1])
  })
}

function addPollen(parent) {
  const particleGeometry = trackGeometry(new THREE.SphereGeometry(0.025, 6, 5))
  const particleMaterial = createMaterial('#9DCEA0', 0.75)
  const particles = new THREE.InstancedMesh(particleGeometry, particleMaterial, 9)
  const dummy = new THREE.Group()
  const positions = [
    [-2.5, 1.5, 0.2], [-2.1, 2.0, -0.3], [-1.3, 1.7, 1.1],
    [0.9, 1.8, -1.7], [2.4, 1.4, -0.8], [2.55, 1.8, 0.9],
    [1.1, 2.1, 1.5], [-0.6, 1.55, 1.8], [-2.5, 1.2, -1.1]
  ]
  positions.forEach((position, index) => {
    dummy.position.set(...position)
    dummy.scale.setScalar(index % 3 === 0 ? 1.15 : 0.75)
    dummy.updateMatrix()
    particles.setMatrixAt(index, dummy.matrix)
  })
  particles.instanceMatrix.needsUpdate = true
  parent.add(particles)
}

function buildEcosystem() {
  scene = new THREE.Scene()
  scene.background = null
  scene.add(new THREE.AmbientLight('#FFFFFF', 1.25))
  scene.add(new THREE.HemisphereLight('#F4FFF5', '#64815E', 1.6))

  const sunlight = new THREE.DirectionalLight('#FFF9E8', 3.1)
  sunlight.position.set(-4, 8, 5)
  scene.add(sunlight)

  const fillLight = new THREE.DirectionalLight('#CBEED1', 0.75)
  fillLight.position.set(5, 3, -5)
  scene.add(fillLight)

  island = new THREE.Group()
  const geometryShape = makeIslandShape()
  const bodyGeometry = trackGeometry(new THREE.ExtrudeGeometry(geometryShape, {
    depth: 0.42,
    bevelEnabled: true,
    bevelSegments: 3,
    steps: 1,
    bevelSize: 0.1,
    bevelThickness: 0.12,
    curveSegments: 10
  }))
  bodyGeometry.rotateX(-Math.PI / 2)
  makeMesh(bodyGeometry, createMaterial('#427C50', 0.96), island, [0, 0.14, 0])

  const grassGeometry = trackGeometry(new THREE.ShapeGeometry(geometryShape))
  grassGeometry.rotateX(-Math.PI / 2)
  makeMesh(grassGeometry, createMaterial('#91C983', 0.98), island, [0, 0.67, 0])

  const grassClumps = trackGeometry(new THREE.SphereGeometry(1, 14, 10))
  const hillColors = [
    createMaterial('#A4D595', 1),
    createMaterial('#85C37B', 1),
    createMaterial('#ABD89B', 1)
  ]
  makeMesh(grassClumps, hillColors[0], island, [-1.32, 0.78, -0.88], [0.95, 0.24, 0.47])
  makeMesh(grassClumps, hillColors[1], island, [0.1, 0.78, -1.02], [0.91, 0.2, 0.39])
  makeMesh(grassClumps, hillColors[2], island, [1.32, 0.79, -0.49], [0.66, 0.19, 0.55])

  const pathCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-2.12, 0.79, -0.28),
    new THREE.Vector3(-1.72, 0.79, -0.48),
    new THREE.Vector3(-1.22, 0.8, -0.44),
    new THREE.Vector3(-0.91, 0.8, -0.08),
    new THREE.Vector3(-0.72, 0.8, 0.3),
    new THREE.Vector3(-0.25, 0.8, 0.44),
    new THREE.Vector3(0.18, 0.8, 0.38),
    new THREE.Vector3(0.58, 0.8, 0.1),
    new THREE.Vector3(1.07, 0.8, 0.03),
    new THREE.Vector3(1.5, 0.8, 0.23)
  ], false, 'catmullrom', 0.38)
  const pathGeometry = trackGeometry(new THREE.TubeGeometry(pathCurve, 80, 0.105, 8, false))
  makeMesh(pathGeometry, createMaterial('#E7D5A7', 1), island)

  const pond = new THREE.Mesh(
    trackGeometry(new THREE.SphereGeometry(1, 28, 18)),
    createMaterial('#79C8B8', 0.3)
  )
  pond.position.set(1.42, 0.805, 0.58)
  pond.scale.set(0.46, 0.025, 0.29)
  pond.receiveShadow = true
  island.add(pond)

  const waterShine = new THREE.Mesh(
    trackGeometry(new THREE.TorusGeometry(0.34, 0.012, 5, 42, Math.PI * 1.65)),
    createMaterial('#D9F4E8', 0.42)
  )
  waterShine.position.set(1.43, 0.833, 0.58)
  waterShine.rotation.x = Math.PI / 2
  waterShine.scale.set(1.35, 0.7, 1)
  island.add(waterShine)

  const treeGeometry = {
    trunk: trackGeometry(new THREE.DodecahedronGeometry(0.1, 0)),
    foliage: trackGeometry(new THREE.DodecahedronGeometry(1, 0))
  }
  treeGeometry.trunk.scale(0.64, 1.65, 0.64)
  const treeMaterials = {
    trunk: createMaterial('#805E3E', 1),
    foliageDark: createMaterial('#34764C', 0.95),
    foliageMid: createMaterial('#4F965A', 0.95),
    foliageLight: createMaterial('#72B86E', 0.95)
  }
  const trees = [
    [-1.62, 0.78, 0.69, 0.92],
    [-1.82, 0.79, -0.48, 0.72],
    [-0.84, 0.79, -0.99, 0.82],
    [0.36, 0.79, -1.08, 0.9],
    [1.82, 0.79, -0.42, 0.92],
    [1.08, 0.79, 0.96, 0.77]
  ]
  trees.forEach(([x, y, z, scale]) => addTree(island, treeMaterials, treeGeometry, [x, y, z], scale))

  const bushGeometry = trackGeometry(new THREE.DodecahedronGeometry(1, 0))
  const bushMaterials = [
    createMaterial('#57995D', 0.98),
    createMaterial('#76B96D', 0.98)
  ]
  const bushes = [
    [-1.95, 0.79, 0.1, 0.8],
    [-1.45, 0.79, -1.05, 0.72],
    [-0.87, 0.79, 0.65, 0.75],
    [-0.16, 0.79, 0.96, 0.77],
    [0.48, 0.79, 0.82, 0.73],
    [1.12, 0.79, 0.7, 0.83],
    [1.72, 0.79, -0.93, 0.68],
    [2.02, 0.79, 0.09, 0.72]
  ]
  bushes.forEach(([x, y, z, scale], index) => {
    addBush(island, bushMaterials[index % bushMaterials.length], bushGeometry, [x, y, z], scale)
  })

  const rockGeometry = trackGeometry(new THREE.DodecahedronGeometry(1, 0))
  const rockMaterials = [createMaterial('#B3B7A2', 1), createMaterial('#C5C6B0', 1)]
  const rocks = [
    [-1.95, 0.82, -0.54, 0.13],
    [-0.57, 0.82, 0.69, 0.09],
    [0.97, 0.82, -0.32, 0.12],
    [1.88, 0.82, -0.63, 0.11],
    [0.84, 0.82, -1.17, 0.1]
  ]
  rocks.forEach(([x, y, z, scale], index) => {
    makeMesh(rockGeometry, rockMaterials[index % rockMaterials.length], island, [x, y, z], [scale * 1.25, scale * 0.8, scale])
  })

  addFlowers(island)
  addWindTurbine(island, [-0.28, 0.8, -0.39])
  scene.add(island)

  const shadowCanvas = document.createElement('canvas')
  shadowCanvas.width = 128
  shadowCanvas.height = 128
  const shadowContext = shadowCanvas.getContext('2d')
  if (!shadowContext) throw new Error('Unable to create the soft-shadow texture.')
  const shadowGradient = shadowContext.createRadialGradient(64, 64, 10, 64, 64, 62)
  shadowGradient.addColorStop(0, 'rgba(40, 77, 48, 0.22)')
  shadowGradient.addColorStop(0.52, 'rgba(40, 77, 48, 0.1)')
  shadowGradient.addColorStop(1, 'rgba(40, 77, 48, 0)')
  shadowContext.fillStyle = shadowGradient
  shadowContext.fillRect(0, 0, 128, 128)
  const shadowTexture = trackTexture(new THREE.CanvasTexture(shadowCanvas))
  const shadow = new THREE.Mesh(
    trackGeometry(new THREE.PlaneGeometry(5.8, 3.8)),
    trackMaterial(new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      toneMapped: false
    }))
  )
  shadow.rotation.x = -Math.PI / 2
  shadow.position.y = -0.03
  shadow.receiveShadow = true
  scene.add(shadow)
  addPollen(scene)
}

function resizeScene() {
  if (!renderer || !canvasHost.value || !camera) return
  const { width, height } = canvasHost.value.getBoundingClientRect()
  if (width <= 0 || height <= 0) return
  const aspect = width / height
  const viewHeight = 5.25
  camera.left = (-viewHeight * aspect) / 2
  camera.right = (viewHeight * aspect) / 2
  camera.top = viewHeight / 2
  camera.bottom = -viewHeight / 2
  camera.updateProjectionMatrix()
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
  renderer.setSize(width, height, false)
  renderer.render(scene, camera)
}

function animate(time) {
  animationFrame = 0
  if (isDisposed || !renderer || !scene || !camera || !isVisible || document.hidden) return
  const delta = previousTime ? Math.min((time - previousTime) / 1000, 0.05) : 0
  previousTime = time
  elapsed += delta

  if (!reducedMotion && island) {
    pointerPosition.lerp(pointerTarget, 0.035)
    island.position.y = Math.sin(elapsed * 0.72) * 0.075
    island.rotation.y = Math.sin(elapsed * 0.23) * 0.035 + pointerPosition.x * 0.055
    island.rotation.x = pointerPosition.y * 0.018
  }

  if (turbineBlades) turbineBlades.rotation.z -= delta * (reducedMotion ? 0.6 : 1.35)

  renderer.render(scene, camera)
  animationFrame = window.requestAnimationFrame(animate)
}

function startAnimation() {
  if (isDisposed || !isVisible || document.hidden || animationFrame) return
  previousTime = 0
  animationFrame = window.requestAnimationFrame(animate)
}

function handlePointerMove(event) {
  if (reducedMotion || !host.value) return
  const rect = host.value.getBoundingClientRect()
  pointerTarget.set(
    THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1),
    THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1)
  )
}

function resetPointer() {
  pointerTarget.set(0, 0)
}

function handleVisibilityChange() {
  if (document.hidden && animationFrame) {
    window.cancelAnimationFrame(animationFrame)
    animationFrame = 0
  } else {
    startAnimation()
  }
}

function handleContextLost(event) {
  event.preventDefault()
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  animationFrame = 0
  showFallback.value = true
}

function disposeScene() {
  isDisposed = true
  if (animationFrame) window.cancelAnimationFrame(animationFrame)
  resizeObserver?.disconnect()
  intersectionObserver?.disconnect()
  host.value?.removeEventListener('pointermove', handlePointerMove)
  host.value?.removeEventListener('pointerleave', resetPointer)
  document.removeEventListener('visibilitychange', handleVisibilityChange)
  renderer?.domElement.removeEventListener('webglcontextlost', handleContextLost)

  geometries.forEach((geometry) => geometry.dispose())
  materials.forEach((material) => material.dispose())
  textures.forEach((texture) => texture.dispose())
  geometries.clear()
  materials.clear()
  textures.clear()
  if (renderer) {
    renderer.renderLists.dispose()
    renderer.dispose()
    renderer.domElement.remove()
  }
  renderer = null
  scene = null
  camera = null
  island = null
  turbineBlades = null
}

onMounted(async () => {
  if (!host.value || !canvasHost.value) return
  reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  try {
    THREE = (await import('./ecoSystemThreeApi.js')).default
    if (isDisposed) return

    pointerTarget = new THREE.Vector2()
    pointerPosition = new THREE.Vector2()
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio <= 1.5,
      powerPreference: 'low-power',
      failIfMajorPerformanceCaveat: false
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
    renderer.setClearColor(0x000000, 0)
    renderer.outputColorSpace = 'srgb'
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.05
    renderer.shadowMap.enabled = false
    renderer.domElement.className = 'eco-scene__webgl'
    renderer.domElement.setAttribute('aria-hidden', 'true')
    renderer.domElement.addEventListener('webglcontextlost', handleContextLost)
    canvasHost.value.appendChild(renderer.domElement)

    camera = new THREE.OrthographicCamera(-3, 3, 3, -3, 0.1, 50)
    camera.position.set(5.5, 6.5, 8)
    camera.lookAt(0, 0.58, 0)
    buildEcosystem()
    resizeScene()

    resizeObserver = new ResizeObserver(resizeScene)
    resizeObserver.observe(canvasHost.value)
    intersectionObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting
      if (isVisible) startAnimation()
      else if (animationFrame) {
        window.cancelAnimationFrame(animationFrame)
        animationFrame = 0
      }
    })
    intersectionObserver.observe(host.value)

    host.value.addEventListener('pointermove', handlePointerMove, { passive: true })
    host.value.addEventListener('pointerleave', resetPointer, { passive: true })
    document.addEventListener('visibilitychange', handleVisibilityChange)
    showFallback.value = false

    startAnimation()
  } catch (error) {
    if (isDisposed) return
    console.warn('EcoQuest 3D scene could not be initialized; showing the illustration fallback.', error)
    disposeScene()
    isDisposed = false
    showFallback.value = true
  }
})

onUnmounted(disposeScene)
</script>
