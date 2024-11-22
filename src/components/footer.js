import React from 'react'
import { Link } from 'react-router-dom'

const Footer=()=>{

  return (
    <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
        <div className="col-md-4 d-flex gap-2 align-items-center">
            <Link className="mb-md-0 text-body-secondary text-decoration-none border rounded-pill" to="/roadrunning-bot">
                <img src="/roadrunning-bot/assets/images/logo_itog.png" alt="Logo" width="50"  className="d-inline-block align-text-top" />
            </Link>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li className="ms-3">
                <a className="text-danger" href="#!">
                    <i className="bi bi-instagram"></i>
                </a>
            </li>
            <li className="ms-3">
                <a className="text-theme" href="#!">
                    <i className="bi bi-twitter-x"></i>
                </a>
            </li>
            <li className="ms-3">
                <a className="text-info" href="#!">
                    <i className="bi bi-telegram"></i>
                </a>
            </li>
        </ul>
    </footer>
  )
}

export default Footer