import React from 'react'
import { Link } from 'react-router-dom'

const Footer=()=>{

  return (
    <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 mt-4 border-top">
        <div class="col-md-4 d-flex gap-2 align-items-center">
            <Link class="mb-md-0 text-body-secondary text-decoration-none lh-" to="/roadrunning-bot">
                <img src="/roadrunning-bot/assets/images/logo_itog.png" alt="Logo" width="70"  class="d-inline-block align-text-top" />
            </Link>
        </div>

        <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li class="ms-3">
                <a class="text-danger" href="#!">
                    <i class="bi bi-instagram"></i>
                </a>
            </li>
            <li class="ms-3">
                <a class="text-theme" href="#!">
                    <i class="bi bi-twitter-x"></i>
                </a>
            </li>
            <li class="ms-3">
                <a class="text-info" href="#!">
                    <i class="bi bi-telegram"></i>
                </a>
            </li>
        </ul>
    </footer>
  )
}

export default Footer