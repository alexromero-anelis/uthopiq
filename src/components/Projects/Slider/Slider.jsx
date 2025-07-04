import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import './slider.css'
import { Autoplay } from 'swiper/modules';
import CardProjects from '../CardProjects/CardProjects';

function Slider({ projects }) {
    return (
        <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 3000 }}
            loop={true}
            spaceBetween={60}
            slidesPerView="auto"
            speed={3000}
            >
            {projects.map((project, index) => (
                <SwiperSlide key={index} style={{ width: '340px' }}>
                    <CardProjects {...project} />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default Slider;
