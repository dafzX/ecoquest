import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior() {
    return {
      top: 0
    }
  },

  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/auth/LoginView.vue'),
      meta: {
        title: 'Login - EcoQuest'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/RegisterView.vue'),
      meta: {
        title: 'Register - EcoQuest'
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('../views/DashboardView.vue'),
      meta: {
        title: 'Dashboard - EcoQuest'
      }
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'EcoQuest'
})

export default router