import { createRouter, createWebHistory } from 'vue-router'
import { isLoggedIn } from '@/services/auth'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior() {
    return { top: 0 }
  },

  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        title: 'Login - EcoQuest'
      }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        title: 'Register - EcoQuest'
      }
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        title: 'Dashboard - EcoQuest',
        requireAuth: true
      }
    },
    {
      path: '/missions',
      name: 'Missions',
      component: () => import('@/views/missions/MissionsView.vue'),
      meta: {
        title: 'Missions - EcoQuest',
        requireAuth: true
      }
    },
    {
      path: '/missions/:id',
      name: 'MissionDetail',
      component: () => import('@/views/missions/MissionDetailView.vue'),
      meta: {
        title: 'Mission Detail',
        hideBottomNav: true,
        requireAuth: true
      }
    },
    {
      path: '/challenges',
      name: 'Challenges',
      component: () => import('@/views/challenges/ChallengesView.vue'),
      meta: {
        title: 'Challenges - EcoQuest',
        hideBottomNav: true,
        requireAuth: true
      }
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('@/views/leaderboard/LeaderboardView.vue'),
      meta: {
        title: 'Leaderboard - EcoQuest',
        requireAuth: true
      }
    },
    {
      path: '/impact',
      name: 'Impact',
      component: () => import('@/views/impact/ImpactView.vue'),
      meta: {
        title: 'Impact - EcoQuest',
        requireAuth: true
      }
    },
    {
      path: '/rewards',
      name: 'Rewards',
      component: () => import('@/views/reward/RewardsView.vue'),
      meta: {
        title: 'Rewards - EcoQuest',
        requireAuth: true
      }
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/community/CommunityView.vue'),
      meta: {
        title: 'Community - EcoQuest',
        requireAuth: true
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile/ProfileView.vue'),
      meta: {
        title: 'Profile - EcoQuest',
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'EcoQuest'

  if (to.meta.requiresAuth && !isLoggedIn()) {
    return {
      name: 'Login',
      query: { redirect: to.fullPath }
    }
  }

  if ((to.name === 'Login' || to.name === 'Register') && isLoggedIn()) {
    return '/dashboard'
  }
})

export default router