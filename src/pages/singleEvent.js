import React, {useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import useEvent from '../zustand/events'
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const SingleEvent = () => {
    const { t, i18n } = useTranslation();
    const singleEvent = useEvent((state) => state.state.singleEvent)
    const getEvents = useEvent((state) => state.getOneEvent)
    const formatEventDateRange = useEvent((state) => state.formatEventDateRange)
    const formatDate = useEvent((state) => state.formatDate)

    const { id } = useParams();

    useEffect(()=>{
        getEvents(i18n.language, id)
    }, [i18n.language])

    return (
        <div className="py-4">
            <div className="mb-4  shadow-lg rounded-3 overflow-hidden">
                <div className="container-fluid py-5 single-event-bg"
                     style={singleEvent?.image ? {
                         backgroundImage: `url(https://api.roadrunning.uz/storage/${singleEvent?.image})`,
                         backgroundSize: 'cover',
                         backgroundRepeat: 'no-repeat',
                     } : {}}
                >
                    <h2 className='card-title text-white'>{ singleEvent?.name }</h2>
                    <p className="col-md-8 text-white fs-4 fw-medium mt-3">
                        { formatEventDateRange(singleEvent?.event_has_marathons, t) }
                    </p>
                    <span className="text-white"><i className="text-danger fa-regular fa-location-dot"></i> {singleEvent?.address}</span>
                </div>
            </div>

            {
                singleEvent?.event_has_marathons?.map((single, index)=>(
                    <div key={index}>
                        <div className='pb-2 mb-3 border-bottom d-flex align-items-center justify-content-between flex-wrap'>
                            <h2 className="">{ formatDate(single.date_event, t) }</h2>
                            <Link className='btn bg-theme text-white float-end shadow' to={'/marathons'}>{t('all')} <i className="bi bi-arrow-right"></i></Link>
                        </div>
                        <div className="row align-items-md-stretch">
                            {
                                single?.marathons.map((marathon, marathonIndex)=>(
                                    <div key={marathonIndex}
                                         className="col-lg-6  mb-4 "
                                    >
                                        <div className="h-100 text-white p-3 marathon-bg overflow-hidden shadow-lg rounded-3"
                                             style={marathon.image ? {
                                                 backgroundImage: `url(https://api.roadrunning.uz/storage/${marathon.image})`,
                                             } : {}}
                                        >
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <h2 className='card-title text-white'>{ marathon?.marathon_type.name }</h2>
                                                <p className='text-white fw-medium '>{ new Intl.NumberFormat('fr-FR').format(marathon?.price) } UZS</p>
                                            </div>

                                            <p className='fw-500'>
                                                <i className="text-danger fa-regular fa-location-dot"></i>
                                                <spam className="px-2 rounded border-theme">{ marathon?.address }</spam>
                                            </p>
                                            <p>
                                                <i className="fa-regular text-info fa-venus-mars"></i>
                                                <span className="px-2 rounded border-theme">{ marathon?.gender?.type ? marathon?.gender?.type : 'MIX' }</span>
                                            </p>
                                            <p>
                                                <i className="fa-light fa-user-plus"></i>
                                                <span className="px-2 rounded border-theme"> {marathon?.marathon_type.amount - marathon.participants_count} Left</span>
                                            </p>
                                            <div className='d-flex justify-content-between align-items-center flex-wrap '>
                                                <span className="text-white fw-medium btn btn-outline-success">
                                                  {t('time')}: {marathon?.datetime_from} { marathon?.datetime_to && '- ' + marathon?.datetime_to}
                                                </span>
                                                {
                                                    single?.status && (marathon?.marathon_type.amount - marathon.participants_count) > 0
                                                        ? <Link className="btn bg-theme text-white  shadow" to={`/participate/${marathon.id}`} type="button">{ t('participate') } <i className="bi bi-arrow-right"></i></Link>
                                                        : <Link className="btn bg-theme text-white  shadow" to={`/marathons/${marathon.id}`} type="button">{ t('result') } <i className="bi bi-arrow-right"></i></Link>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }


        </div>
    )
}

export default SingleEvent