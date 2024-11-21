import React from 'react';

function Header () {
    return (
        <div className='pb-2 border-bottom d-flex align-items-center justify-content-between flex-wrap'> 
            <h2 className="">Events</h2>
            <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                RU
            </button>
            <ul class="dropdown-menu" ariaLabelledBy="dropdownMenuButton">
                <li><a class="dropdown-item" href="/en/">English</a></li>
                <li><a class="dropdown-item" href="/es/">Español</a></li>
                <li><a class="dropdown-item" href="/fr/">Français</a></li>
                ...
            </ul>
            </div>
        </div>
    );
}

export default Header;