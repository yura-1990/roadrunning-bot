import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const  Home = () => {
    return (
        <>
            <h2 class="pb-2 border-bottom">Custom cards</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                    delay: 50000,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                <SwiperSlide>
                    <div className="card border bg-theme-bot card-cover h-100">
                        <div className='card-header'>
                            <h2 className='card-title text-theme-bot'>Event 1</h2>
                        </div>

                        <div className="card-body">
                            <h2 className='card-title text-theme-bot'>from 12 to 18 october 2024</h2>
                            <span>Address: Tashkent</span>
                        </div>

                        <div className='card-footer'>
                            <button className='btn bg-theme text-white float-end border'>More <i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card border bg-theme-bot card-cover h-100">
                        <div className='card-header'>
                            <h2 className='card-title text-theme-bot'>Event 1</h2>
                        </div>

                        <div className="card-body">
                            <h2 className='card-title text-theme-bot'>from 12 to 18 october 2024</h2>
                            <span>Address: Tashkent</span>
                        </div>

                        <div className='card-footer'>
                            <button className='btn bg-theme text-white float-end border'>More <i class="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </>
    );
}

export default Home;