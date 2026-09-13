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
        title: 'Dashboard - EcoQuest'
      }
    },
    {
      path: '/missions',
      name: 'Missions',
      component: () => import('@/views/missions/MissionsView.vue'),
      meta: {
        title: 'Missions - EcoQuest'
      }
    },
    {
      path: '/missions/:id',
      name: 'MissionDetail',
      component: () => import('@/views/missions/MissionDetailView.vue'),
      meta: {
        title: 'Mission Detail',
        hideBottomNav: true
      }
    },
    {
      path: '/challenges',
      name: 'Challenges',
      component: () => import('@/views/challenges/ChallengesView.vue'),
      meta: {
        title: 'Challenges - EcoQuest',
        hideBottomNav: true
      }
    },
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('@/views/leaderboard/LeaderboardView.vue'),
      meta: {
        title: 'Leaderboard - EcoQuest'
      }
    },
    {
      path: '/impact',
      name: 'Impact',
      component: () => import('@/views/impact/ImpactView.vue'),
      meta: {
        title: 'Impact - EcoQuest'
      }
    },
    {
      path: '/rewards',
      name: 'Rewards',
      component: () => import('@/views/reward/RewardsView.vue'),
      meta: {
        title: 'Rewards - EcoQuest'
      }
    },
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/community/CommunityView.vue'),
      meta: {
        title: 'Community - EcoQuest'
      }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile/ProfileView.vue'),
      meta: {
        title: 'Profile - EcoQuest'
      }
    },
    {
      path: '/eco-action',
      name: 'EcoAction',
      component: () => import('@/views/eco-action/EcoActionView.vue'),
      meta: {
        title: 'Eco Action - EcoQuest'
      }
    },
    {
      path: '/achievements',
      name: 'Achievements',
      component: () => import('@/views/achievements/AchievementsView.vue'),
      meta: {
        title: 'Achievements - EcoQuest'
      }
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'EcoQuest'
})

export default router