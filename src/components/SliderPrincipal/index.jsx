import { Container, ImgItem, SwiperDiv1, SwiperDiv2, SliderContainer, LinkEvento, Description } from './styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useState, useEffect, useRef } from 'react'
import { Autoplay, Navigation } from 'swiper/modules'
import api from '../../services/api'

function Slider() {
  const BASE_URL = "https://letsgoparty-api.onrender.com"
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const swiperRef = useRef(null);

  useEffect(() => {
    
    async function fetchEvents() {
      try {
        setLoading(true);
        const response = await api.get('/eventos-slider');
        setEvents(response.data);
      } catch (error) {
        console.error('Erro ao buscar eventos:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchEvents();
  }, []);

  if (loading) {
    return <Container>Carregando...</Container>;
  }

  if (events.length === 0) {
    return <Container>Não há eventos próximos disponíveis.</Container>;
  }

  return (
    <Container>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next'
        }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        onInit={(swiper) => swiperRef.current = swiper}
      >
        {events.map((item) => (
          <SwiperSlide key={item.id}>
            <LinkEvento href={`/evento?id=${item.id}`}>
              <SliderContainer>
                <SwiperDiv1>
                  <ImgItem src={`${BASE_URL}${item.image}`} alt={item.titleEvent} />
                </SwiperDiv1>
                <SwiperDiv2>
                  <h3>{item.titleEvent}</h3>
                  <Description>{item.descriptionEvent}</Description>
                </SwiperDiv2>
              </SliderContainer>
            </LinkEvento>
          </SwiperSlide>
        ))}
      </Swiper>

      {events.length > 1 && (
        <>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </>
      )}
    </Container>
  );
}

export default Slider
