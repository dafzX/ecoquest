import { createI18n } from 'vue-i18n'
import en from './locales/en.json'
import id from './locales/id.json'

const i18n = createI18n({
  legacy: false,
  locale: 'Bahasa Indonesia',
  fallbackLocale: 'en',
  messages: {
    'English': en,
    'Bahasa Indonesia': id
  }
})

export default i18n
