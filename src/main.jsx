import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import MyGlobalStyles from './styles/globalStyles'
import App from './App'
import { register } from 'swiper/element'
register()
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MyGlobalStyles />

    <App /> 
   
  </StrictMode >,
)
