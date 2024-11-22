import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';

const  Home = () => {
    return (
        <>
            <h2 class="pb-2 border-bottom">Events</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                    delay: 50000,
                    disableOnInteraction: false,
                }}
                className='event-swiper'
                loop={true}
            >
                <SwiperSlide>
                    <div className="card bg-transparent border-0 rounded-3  card-cover h-100">
                        <div className='card-header'>
                            <h2 className='card-title text-white multi-line-ellipsis'>Event 1</h2>
                        </div>

                        <div className="card-body">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer'>
                            <Link to={'event/1'} className='btn bg-theme text-white float-end shadow'>More <i class="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card bg-transparent border-0 rounded-3 card-cover h-100">
                        <div className='card-header'>
                            <h2 className='card-title text-white multi-line-ellipsis'>Event 1</h2>
                        </div>

                        <div className="card-body">
                            <h2 className='card-title text-white multi-line-ellipsis'>From 12 October to 18 November 2024</h2>
                            <span>Address: Tashkent</span>
                        </div>

                        <div className='card-footer'>
                            <Link to={'event/2'} className='btn bg-theme text-white float-end shadow'>More <i class="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

            <h2 class="pb-2 border-bottom mt-3">Marathon Types</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                className='marathon-type-swiper'
                autoplay={{
                    delay: 50000,
                    disableOnInteraction: false,
                }}
                loop={true}
            >
                <SwiperSlide>
                    <div className="card border-0 rounded-3 bg-theme-bot card-cover h-100">
                        <div className='card-header'>
                            <h2 className='card-title text-white'>10Ks</h2>
                        </div>

                        <div className="card-body">
                            <h2 className='card-title text-white multi-line-ellipsis'>A 10km run is a fantastic goal distance, benchmark and achievement for someone looking to start distance running. </h2>
                            <span className="text-white">Published: 19 october 2024</span>
                        </div>

                        <div className='card-footer'>
                            <Link to={'/roadrunning-bot/marathon-type/1'} className='btn bg-theme text-white float-end'>More <i class="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card border-0 rounded-3 bg-theme-bot card-cover h-100">
                        <div className='card-header'>
                            <h2 className='card-title text-white'>Marathons</h2>
                        </div>

                        <div className="card-body">
                            <h2 className='card-title text-white multi-line-ellipsis'>Every runner will tell you that their first marathon was a significant event in their running lives!  There’s no short-cuts in a marathon – if you try and just wing it, or are off your game or under-prepared then you’re in for a tough, and long, event.  The flip side, of course, is that the sense of achievement when you finish your first marathon is unparalleled.</h2>
                            <span className="text-white">Published: 19 october 2024</span>
                        </div>

                        <div className='card-footer'>
                            <Link to={'/roadrunning-bot/marathon-type/2'} className='btn bg-theme text-white float-end'>More <i class="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <h2 class="pb-2 border-bottom mt-3">Number Types</h2>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                centeredSlides={true}
                autoplay={{
                    delay: 50000,
                    disableOnInteraction: false,
                }}
                className='number-type-swiper'
                loop={true}
            >
                <SwiperSlide>
                    <div className="card border-0  rounded-3 bg-theme-bot card-cover h-100">
                        <div className='card-header'>
                            <h2 className='card-title text-white'>Simple</h2>
                        </div>

                        <div className="card-body">
                            <h2 className='card-title text-white multi-line-ellipsis'>No pay is required</h2>
                            <span className="text-white">Active</span>
                        </div>

                        <div className='card-footer'>
                            <Link to={'/roadrunning-bot/number-type/1'} className='btn bg-theme text-white float-end'>More <i class="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card border-0 rounded-3 bg-theme-bot card-cover h-100">
                        <div className='card-header'>
                            <h2 className='card-title text-white'>Gold</h2>
                        </div>

                        <div className="card-body">
                            <h2 className='card-title text-white multi-line-ellipsis'>Its cost is created with marathon and marathon type</h2>
                            <span className="text-white">Active</span>
                        </div>

                        <div className='card-footer'>
                            <Link to={'/roadrunning-bot/marathon-type/2'} className='btn bg-theme text-white float-end'>More <i class="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card border-0 rounded-3 bg-theme-bot card-cover h-100">
                        <div className='card-header'>
                            <h2 className='card-title text-white'>Plantium</h2>
                        </div>

                        <div className="card-body">
                            <h2 className='card-title text-white multi-line-ellipsis'>Its cost is created with marathon and marathon type</h2>
                            <span className="text-white">Active</span>
                        </div>

                        <div className='card-footer'>
                            <Link to={'/roadrunning-bot/marathon-type/3'} className='btn bg-theme text-white float-end'>More <i class="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

        </>
    );
}

export default Home;