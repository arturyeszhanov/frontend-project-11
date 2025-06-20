import i18next from 'i18next'
import ru from '../locales/ru.js'

const initI18n = () => i18next.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
})

export default initI18n