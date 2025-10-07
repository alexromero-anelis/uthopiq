import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import './slider.css';
import { Autoplay, Navigation, FreeMode } from 'swiper/modules';
import CardProjects from '../CardProjects/CardProjects';

function Slider({ projects }) {
  return (
    <div className="slider-wrap">
      <Swiper
        modules={[Autoplay, Navigation, FreeMode]}
        rewind={true}
        navigation={true}
        autoplay={{ delay: 3500, disableOnInteraction: false, pauseOnMouseEnter: true }}
        spaceBetween={60}
        slidesPerView={'auto'}
        speed={600}
        freeMode={{ enabled: true, momentum: true, momentumRatio: 0.25, momentumVelocityRatio: 0.5, sticky: true }}
        grabCursor={true}
        touchRatio={0.55}
        longSwipesMs={120}
        longSwipesRatio={0.3}
        resistance={true}
        resistanceRatio={0.85}
        centerInsufficientSlides={true}
        watchOverflow={true}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={index} style={{ width: '340px' }}>
            <CardProjects {...project} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default Slider;