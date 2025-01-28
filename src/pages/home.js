import React, {useEffect} from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import {useTranslation} from "react-i18next";
import useEvent from "../zustand/events";

const  Home = () => {
    const { t, i18n } = useTranslation();
    const events = useEvent((state) => state.state.events)
    const getEvents = useEvent((state) => state.getEvents)
    const formatEventDateRange = useEvent((state) => state.formatEventDateRange)

    useEffect(() => {
        getEvents(i18n.language)
    }, [i18n.language]);

    return (
        <>
            <div>
                <div className='pb-2 border-bottom d-flex align-items-center justify-content-between flex-wrap'>
                    <h2 className="">{ t('events') }</h2>
                    <Link className='btn bg-theme text-white float-end shadow' to={'/events'}>{ t('all') } <i className="bi bi-arrow-right"></i></Link>
                </div>
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
                    {events?.data?.map((event) =>
                        <SwiperSlide>
                            <div className="card bg-transparent border-0 rounded-3  card-cover h-100">
                                <div className='card-header bg-transparent'>
                                    <h2 className='card-title text-white'>{ event.name }</h2>
                                </div>

                                <div className="card-body bg-transparent">
                                    <h2 className='card-title text-white multi-line-ellipsis'>{ formatEventDateRange(event.event_has_marathons, t) }</h2>
                                    <span className="text-white">{t('address')}: { event.address }</span>
                                </div>

                                <div className='card-footer bg-transparent'>
                                    <Link to={`/events/${event.id}`}
                                          className='btn bg-theme text-white float-end shadow'>{ t('more_about') } <i className="bi bi-arrow-right"></i>
                                    </Link>
                                </div>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

            <h2 className="pb-2 border-bottom mt-3">Marathon Types</h2>
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
                    <div className="card bg-transparent border-0 rounded-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>10Ks</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>A 10km run is a fantastic goal distance, benchmark and achievement for someone looking to start distance running. </h2>
                            <span className="text-white">Published: 19 october 2024</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/marathon-type/1'} className='btn bg-theme text-white float-end'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card bg-transparent border-0 rounded-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Marathons</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>Every runner will tell you that their first marathon was a significant event in their running lives!  There’s no short-cuts in a marathon – if you try and just wing it, or are off your game or under-prepared then you’re in for a tough, and long, event.  The flip side, of course, is that the sense of achievement when you finish your first marathon is unparalleled.</h2>
                            <span className="text-white">Published: 19 october 2024</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/marathon-type/2'} className='btn bg-theme text-white float-end'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
            <h2 className="pb-2 border-bottom mt-3">Number Types</h2>
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
                    <div className="card border-0 bg-transparent rounded-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Simple</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>No pay is required</h2>
                            <span className="text-white">Active</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/number-type/1'} className='btn bg-theme text-white float-end'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card bg-transparent border-0 rounded-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Gold</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>Its cost is created with marathon and marathon type</h2>
                            <span className="text-white">Active</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/marathon-type/2'} className='btn bg-theme text-white float-end'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="card bg-transparent border-0 rounded-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Plantium</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>Its cost is created with marathon and marathon type</h2>
                            <span className="text-white">Active</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/marathon-type/3'} className='btn bg-theme text-white float-end'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>

        </>
    );
}

export default Home;