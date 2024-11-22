import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
    const location = useLocation();
    const [urls, setUrls] = useState([])

    useEffect(() => {
      const pathParts = location.pathname.split('/').filter(Boolean);  
  
      setUrls(pathParts);
    }, [location]);
  
    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    {urls.map((el, i)=>(
                        <li class={ urls.length-1 === i ? 'breadcrumb-item text-theme active fw-bold text-uppercase' :  'breadcrumb-item fw-bold text-uppercase'}>
                            {urls.length-1 === i ? el : <Link to={'/'+el}>{el}</Link>}
                        </li>
                    ))}
                </ol>
            </nav>
        </div>
    );
}

export default Breadcrumb
