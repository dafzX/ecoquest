import { createRouter, createWebHistory } from 'vue-router'

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
    },

    {
      path: '/missions',
      name: 'Missions',
      component: () => import('../views/MissionsView.vue'),
      meta: {
        title: 'Missions - EcoQuest'
      }
    },

    {
      path: '/challenges',
      name: 'Challenges',
      component: () => import('../views/ChallengesView.vue'),
      meta: {
        title: 'Challenges - EcoQuest'
      }
    },

    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('../views/LeaderboardView.vue'),
      meta: {
        title: 'Leaderboard - EcoQuest'
      }
    },

    {
      path: '/impact',
      name: 'Impact',
      component: () => import('../views/ImpactView.vue'),
      meta: {
        title: 'Impact - EcoQuest'
      }
    },

    {
      path: '/rewards',
      name: 'Rewards',
      component: () => import('../views/RewardsView.vue'),
      meta: {
        title: 'Rewards - EcoQuest'
      }
    },

    {
      path: '/community',
      name: 'Community',
      component: () => import('../views/CommunityView.vue'),
      meta: {
        title: 'Community - EcoQuest'
      }
    },

    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        title: 'Profile - EcoQuest'
      }
    },
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'EcoQuest'
})

export default router