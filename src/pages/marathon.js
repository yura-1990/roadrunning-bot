import React, {useEffect} from "react";
import {useTranslation} from "react-i18next";
import useEvent from "../zustand/events";
import {Link} from "react-router-dom";

const Marathons = () => {
    const { t, i18n } = useTranslation();
    const events = useEvent((state) => state.state.events)
    const getEvents = useEvent((state) => state.getEvents)
    const formatEventDateRange = useEvent((state) => state.formatEventDateRange)

    useEffect(()=>{
        getEvents(i18n.language)

    }, [i18n.language])
    return <div>
        <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item flex-grow-1" role="presentation">
                <button className="nav-link active w-100" id="life-tab" data-bs-toggle="tab"
                        data-bs-target="#life-tab-pane" type="button" role="tab" aria-controls="life-tab-pane"
                        aria-selected="true">Live
                </button>
            </li>
            <li className="nav-item flex-grow-1" role="presentation">
                <button className="nav-link w-100" id="archive-tab" data-bs-toggle="tab"
                        data-bs-target="#archive-tab-pane" type="button" role="tab" aria-controls="archive-tab-pane"
                        aria-selected="false">Archive
                </button>
            </li>
        </ul>
        <div className="tab-content" id="myTabContent">
            <div className="tab-pane fade show active" id="life-tab-pane" role="tabpanel" aria-labelledby="life-tab"
                 tabIndex="0">
                {
                    events?.data?.map((event, index) => (
                        event.status && <div key={event.id}>
                            <h4 className="my-2">{formatEventDateRange(event.event_has_marathons, t)}</h4>
                            {
                                event?.event_has_marathons.map(eventTime => eventTime?.marathons.map(marathon =>
                                    <div key={marathon.id} className="h-100 text-white p-3 my-3 marathon-bg overflow-hidden shadow-lg rounded-3">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <h2>{marathon?.marathon_type?.name} </h2>
                                            <p className='text-white fw-medium '>{new Intl.NumberFormat('fr-FR').format(marathon?.price)} UZS</p>
                                        </div>

                                        <p className='fw-500'>{t('address')}: <spam
                                            className="border px-2 rounded border-theme">{marathon?.address}</spam></p>
                                        <p>{t('gender')}: <span
                                            className="border px-2 rounded border-theme">{marathon?.gender?.type}</span>
                                        </p>
                                        <div className='d-flex justify-content-between align-items-center flex-wrap '>
                                            <span
                                                className="text-white fw-bold btn btn-outline-success">{t('time')}: {marathon?.datetime_from} - {marathon?.datetime_to}</span>
                                                <Link className="btn bg-theme text-white  shadow"
                                                  to={`/participate/${marathon.id}`}
                                                  type="button"
                                                >
                                                    {t('participate')}
                                                    <i className="bi bi-arrow-right"></i>
                                                </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
            <div className="tab-pane fade" id="archive-tab-pane" role="tabpanel" aria-labelledby="archive-tab"
                 tabIndex="0">
                {
                    events?.data?.map((event) => (
                        !event.status && <div key={event.id}>
                            <h4 className="my-2">{formatEventDateRange(event.event_has_marathons, t)}</h4>
                            {
                                event?.event_has_marathons.map(eventTime => eventTime?.marathons.map(marathon =>
                                    <div key={marathon.id}
                                         className="h-100 text-white p-3 my-3 marathon-bg overflow-hidden shadow-lg rounded-3">
                                        <div className='d-flex align-items-center justify-content-between'>
                                            <h2>{marathon?.marathon_type?.name} </h2>
                                            <p className='text-white fw-medium '>{new Intl.NumberFormat('fr-FR').format(marathon?.price)} UZS</p>
                                        </div>

                                        <p className='fw-500'>{t('address')}: <spam
                                            className="border px-2 rounded border-theme">{marathon?.address}</spam></p>
                                        <p>{t('gender')}: <span
                                            className="border px-2 rounded border-theme">{marathon?.gender?.type}</span>
                                        </p>
                                        <div className='d-flex justify-content-between align-items-center flex-wrap '>
                                        <span
                                            className="text-white fw-bold btn btn-outline-success">{t('time')}: {marathon?.datetime_from} - {marathon?.datetime_to}</span>
                                            <Link className="btn bg-theme text-white shadow"
                                                  to={`/marathons/${marathon.id}`}
                                                  type="button">{t('result')}
                                                <i className="bi bi-arrow-right"></i>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
}

export default Marathons;