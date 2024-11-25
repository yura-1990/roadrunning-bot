import React from 'react'
import { Link } from 'react-router-dom'

const Events = () => {

    return (
        <>
            <ul class="nav nav-tabs" id="myTab" role="tablist">
                <li class="nav-item flex-grow-1" role="presentation">
                    <button class="nav-link active w-100" id="life-tab" data-bs-toggle="tab" data-bs-target="#life-tab-pane" type="button" role="tab" aria-controls="life-tab-pane" aria-selected="true">Live</button>
                </li>
                <li class="nav-item flex-grow-1" role="presentation">
                    <button class="nav-link w-100" id="archive-tab" data-bs-toggle="tab" data-bs-target="#archive-tab-pane" type="button" role="tab" aria-controls="archive-tab-pane" aria-selected="false">Archive</button>
                </li>
            </ul>
            <div class="tab-content" id="myTabContent">
                <div class="tab-pane fade show active" id="life-tab-pane" role="tabpanel" aria-labelledby="life-tab" tabindex="0">
                    <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>From 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
                <div class="tab-pane fade" id="archive-tab-pane" role="tabpanel" aria-labelledby="archive-tab" tabindex="0">
                <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                    <div className="card border-0 rounded-3 events-bg overflow-hidden my-3 card-cover h-100">
                        <div className='card-header bg-transparent'>
                            <h2 className='card-title text-white'>Event 1</h2>
                        </div>

                        <div className="card-body bg-transparent">
                            <h2 className='card-title text-white multi-line-ellipsis'>from 12 to 18 october 2024</h2>
                            <span className="text-white">Address: Tashkent</span>
                        </div>

                        <div className='card-footer bg-transparent'>
                            <Link to={'/roadrunning-bot/events/1'} className='btn bg-theme text-white float-end shadow'>More <i className="bi bi-arrow-right"></i></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Events