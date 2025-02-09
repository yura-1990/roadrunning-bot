import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import useEvent from '../zustand/events'
import { useTranslation } from 'react-i18next';

const Events = () => {
    const { t, i18n } = useTranslation();
    const events = useEvent((state) => state.state.events)
    const getEvents = useEvent((state) => state.getEvents)
    const formatEventDateRange = useEvent((state) => state.formatEventDateRange)

    useEffect(()=>{
        getEvents(i18n.language)

      }, [i18n.language])

    return (
        <>
            <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item flex-grow-1" role="presentation">
                    <button className="nav-link active w-100" id="life-tab" data-bs-toggle="tab" data-bs-target="#life-tab-pane" type="button" role="tab" aria-controls="life-tab-pane" aria-selected="true">Live</button>
                </li>
                <li className="nav-item flex-grow-1" role="presentation">
                    <button className="nav-link w-100" id="archive-tab" data-bs-toggle="tab" data-bs-target="#archive-tab-pane" type="button" role="tab" aria-controls="archive-tab-pane" aria-selected="false">Archive</button>
                </li>
            </ul>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="life-tab-pane" role="tabpanel" aria-labelledby="life-tab" tabIndex="0">
                    {
                        events?.data?.map((event, index)=>(
                            event.status && <div key={index} 
                                className="card border-0 rounded-3 events-bg single-event-bg overflow-hidden my-3 card-cover h-100"
                                style={event.image ? {
                                    backgroundImage: `url(https://api.roadrunning.uz/storage/${event.image})`,
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover'
                                }: {}}
                            >
                                <div className='card-header bg-transparent'>
                                    <h2 className='card-title text-white'>{event?.name}</h2>
                                </div>
        
                                <div className="card-body bg-transparent">
                                    <h2 className='card-title text-white multi-line-ellipsis'>{formatEventDateRange(event.event_has_marathons, t)}</h2>
                                    <span className="text-white"><i className="text-danger fa-regular fa-location-dot"></i> {event.address}</span>
                                </div>
        
                                <div className='card-footer bg-transparent'>
                                    <Link to={`/events/${event.id}`} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                                </div>
                            </div> ))
                    }
                </div>
                <div className="tab-pane fade" id="archive-tab-pane" role="tabpanel" aria-labelledby="archive-tab" tabIndex="0">
                {
                        events?.data?.map((event, index)=>(
                            !event.status && <div key={index} 
                                className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100"
                                // style={{backgroundImage: `url(https://api.roadrunning.uz/storage/${event.image})`, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover'}}
                            >
                                <div className='card-header bg-transparent'>
                                    <h2 className='card-title text-white'>{event?.name}</h2>
                                </div>
        
                                <div className="card-body bg-transparent">
                                    <h2 className='card-title text-white multi-line-ellipsis'>{formatEventDateRange(event.event_has_marathons, t)}</h2>
                                    <span className="text-white">{t('address')}: {event.address}</span>
                                </div>
        
                                <div className='card-footer bg-transparent'>
                                    <Link to={`/events/${event.id}`} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                                </div>
                            </div> ))
                    }                 
                </div>
            </div>
        </>
    )
}

export default Events