import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),

  scrollBehavior() {
    return { top: 0 }
  },

  routes: [
    // Auth
    {
      path: '/',
      redirect: '/login'
    },

    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/LoginView.vue'),
      meta: {
        title: 'Login - EcoQuest',
        hideBottomNav: true
      }
    },

    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/RegisterView.vue'),
      meta: {
        title: 'Register - EcoQuest',
        hideBottomNav: true
      }
    },

    // Dashboard
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('@/views/DashboardView.vue'),
      meta: {
        title: 'Dashboard - EcoQuest'
      }
    },

    // Missions
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
        title: 'Mission Detail - EcoQuest',
        hideBottomNav: true
      }
    },

    // Challenges
    {
      path: '/challenges',
      name: 'Challenges',
      component: () => import('@/views/challenges/ChallengesView.vue'),
      meta: {
        title: 'Challenges - EcoQuest',
        hideBottomNav: true
      }
    },

    // Leaderboard
    {
      path: '/leaderboard',
      name: 'Leaderboard',
      component: () => import('@/views/leaderboard/LeaderboardView.vue'),
      meta: {
        title: 'Leaderboard - EcoQuest'
      }
    },

    // Impact
    {
      path: '/impact',
      name: 'Impact',
      component: () => import('@/views/impact/ImpactView.vue'),
      meta: {
        title: 'Impact - EcoQuest'
      }
    },

    // Rewards
    {
      path: '/rewards',
      name: 'Rewards',
      component: () => import('@/views/reward/RewardsView.vue'),
      meta: {
        title: 'Rewards - EcoQuest'
      }
    },

    // Community
    {
      path: '/community',
      name: 'Community',
      component: () => import('@/views/community/CommunityView.vue'),
      meta: {
        title: 'Community - EcoQuest'
      }
    },

    // Profile
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('@/views/profile/ProfileView.vue'),
      meta: {
        title: 'Profile - EcoQuest'
      }
    },

    // Edit Profile
    {
      path: '/profile/edit',
      name: 'EditProfile',
      component: () => import('@/views/profile/EditProfileView.vue'),
      meta: {
        title: 'Edit Profil - EcoQuest',
        hideBottomNav: true
      }
    },

    // Achievements
    {
      path: '/profile/achievements',
      name: 'Achievements',
      component: () => import('@/views/profile/AchievementsView.vue'),
      meta: {
        title: 'Achievements - EcoQuest',
        hideBottomNav: true
      }
    },

    // Settings
    {
      path: '/profile/settings',
      name: 'Settings',
      component: () => import('@/views/profile/SettingsView.vue'),
      meta: {
        title: 'Settings - EcoQuest',
        hideBottomNav: true
      }
    },

    // Help & Support
    {
      path: '/profile/help-support',
      name: 'HelpSupport',
      component: () => import('@/views/profile/HelpSupportView.vue'),
      meta: {
        title: 'Help & Support - EcoQuest',
        hideBottomNav: true
      }
    },

    // Privacy
    {
      path: '/profile/settings/privacy',
      name: 'Privacy',
      component: () => import('@/views/profile/PrivacyView.vue'),
      meta: {
        title: 'Privacy - EcoQuest',
        hideBottomNav: true
      }
    },

    // Security
    {
      path: '/profile/settings/security',
      name: 'Security',
      component: () => import('@/views/profile/SecurityView.vue'),
      meta: {
        title: 'Security - EcoQuest',
        hideBottomNav: true
      }
    }
  ]
})

router.beforeEach((to) => {
  document.title = to.meta.title || 'EcoQuest'
})

export default router