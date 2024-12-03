import React, { useEffect } from 'react'
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
      <div className="mb-4 single-event-bg shadow-lg rounded-3 overflow-hidden">
        <div className="container-fluid py-5">
          <h1 className="display-5 text-white fw-bold">{ singleEvent?.name }</h1>
          <p className="col-md-8 text-white fs-4 ">
          { formatEventDateRange(singleEvent?.event_has_marathons, t) }
          </p>
          <span className="text-white">{t('address')}: {singleEvent?.address}</span>
        </div>
      </div>

      {
        singleEvent?.event_has_marathons?.map((single, index)=>(
          <div>
            <div className='pb-2 mb-3 border-bottom d-flex align-items-center justify-content-between flex-wrap'>
              <h2 className="">{ formatDate(single.date_event, t) }</h2>
              <Link className='btn bg-theme text-white float-end shadow' to={'/roadrunning-bot/marathons'}>{t('all')} <i className="bi bi-arrow-right"></i></Link>
            </div>
            <div className="row align-items-md-stretch">
              {
                single?.marathons.map((marathon, marathonIndex)=>(
                  <div className="col-md-6  mb-4 ">
                    <div className="h-100 text-white p-3 marathon-bg overflow-hidden shadow-lg rounded-3">
                      <div className='d-flex align-items-center justify-content-between'>
                        <h2>{ marathon?.marathon_type.name } </h2>
                        <p className='text-white fw-medium '>{ new Intl.NumberFormat('fr-FR').format(marathon?.price) } UZS</p>
                      </div>
                      
                      <p className='fw-500'>{t('address')}: <spam className="border px-2 rounded border-theme">{ marathon?.address }</spam></p>
                      <p>{t('gender')}: <span className="border px-2 rounded border-theme">{ marathon?.gender?.type }</span></p>
                      <div className='d-flex justify-content-between align-items-center flex-wrap '>
                        <span className="text-white fw-bold btn btn-outline-success">{t('time')}: {marathon?.datetime_from} - {marathon?.datetime_to}</span>
                        <Link className="btn bg-theme text-white  shadow" to={'/roadrunning-bot/participate/1'} type="button">Participant <i className="bi bi-arrow-right"></i></Link>
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