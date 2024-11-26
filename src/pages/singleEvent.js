import React from 'react'
import { Link } from 'react-router-dom'

const SingleEvent = () => {
    
  return (
    <div class="py-4">
      <div class="mb-4 single-event-bg shadow-lg rounded-3 overflow-hidden">
        <div class="container-fluid py-5">
          <h1 class="display-5 text-white fw-bold">Event 1</h1>
          <p class="col-md-8 text-white fs-4 ">
            12-18 October 2024 
          </p>
          <span className="text-white">Address: Tashkent</span>
        </div>
      </div>

      <div>
        <div className='pb-2 mb-3 border-bottom d-flex align-items-center justify-content-between flex-wrap'>
          <h2 className="">12 October 2024 </h2>
          <Link className='btn bg-theme text-white float-end shadow' to={'/roadrunning-bot/marathons'}>All <i className="bi bi-arrow-right"></i></Link>
        </div>
        <div class="row align-items-md-stretch">
          <div class="col-md-6  mb-4 ">
            <div class="h-100 text-white p-3 marathon-bg overflow-hidden shadow-lg rounded-3">
              <h2>Marathon Type 10kms</h2>
              <p>Address info</p>
              <p>2 500 000 sum</p>
              <div className='d-flex justify-content-between align-items-center flex-wrap '>
                <span className="text-theme fw-bold btn btn-outline-success">Time: 10:00</span>
                <Link class="btn bg-theme text-white  shadow" to={'/roadrunning-bot/participate/1'} type="button">Participant <i className="bi bi-arrow-right"></i></Link>
              </div>
            </div>
          </div>
          <div class="col-md-6  mb-4 ">
            <div class="h-100 text-white p-3 marathon-bg overflow-hidden shadow-lg rounded-3">
              <h2>Marathon Type 3kms</h2>
              <p>Address info</p>
              <p>2 500 000 sum</p>
              <div className='d-flex justify-content-between align-items-center flex-wrap '>
                <span className="text-theme fw-bold btn btn-outline-success">Time: 15:00</span>
                <Link class="btn bg-theme text-white shadow" to={'/roadrunning-bot/participate/2'} type="button">Participant <i className="bi bi-arrow-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className='pb-2 mb-3 border-bottom d-flex align-items-center justify-content-between flex-wrap'>
          <h2 className="">13 October 2024 </h2>
          <Link className='btn bg-theme text-white float-end shadow' to={'/roadrunning-bot/marathons'}>All <i className="bi bi-arrow-right"></i></Link>
        </div>
        <div class="row align-items-md-stretch">
          <div class="col-md-6  mb-4 ">
            <div class="h-100 p-3 text-white marathon-bg overflow-hidden shadow-lg rounded-3">
              <h2>Marathon Type 10kms</h2>
              <p>Address info</p>
              <p>2 500 000 sum</p>
              <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <span className="text-theme fw-bold btn btn-outline-success">Time: 10:00</span>
                <Link class="btn bg-theme text-white  shadow" to={'/roadrunning-bot/participate/3'} type="button">Participant <i className="bi bi-arrow-right"></i></Link>
              </div>
            </div>
          </div>
          <div class="col-md-6  mb-4 ">
            <div class="h-100 p-3 text-white marathon-bg overflow-hidden shadow-lg rounded-3">
              <h2>Marathon Type 3kms</h2>
              <p>Address info</p>
              <p>2 500 000 sum</p>
              <div className='d-flex justify-content-between align-items-center flex-wrap'>
                <span className="text-theme fw-bold btn btn-outline-success">Time: 17:00</span>
                <Link class="btn bg-theme text-white shadow" to={'/roadrunning-bot/participate/4'} type="button">Participant <i className="bi bi-arrow-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleEvent