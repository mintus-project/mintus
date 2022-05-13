import { createI18n } from 'vue-i18n'
import en from './lang/en'
import zh from './lang/zh'

const messages = {
  en,
  zh
}

export default createI18n({
  locale: 'zh', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages // set locale i18n
})
