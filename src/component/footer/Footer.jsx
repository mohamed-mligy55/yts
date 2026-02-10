import React from 'react'
import { Link } from 'react-router-dom'
import "./footer.css"

export const Footer = () => {
  return (
<>
<footer>
  <div className='container '>
    <div className='footer-content'>
    <ul>
      <li><Link>YTS © 2011  </Link> </li>
      <li><Link>2026 </Link> </li>
      <li><Link> Blog </Link> </li>
      <li><Link> DMCA </Link> </li>
      <li><Link> API </Link> </li>
      <li><Link>RSS </Link> </li>
      <li><Link> Contact </Link> </li>
      <li><Link> Browse Movies </Link> </li>
      <li><Link>  Requests </Link> </li>
      <li><Link>  Requests </Link> </li>
      <li><Link>  Logout  </Link> </li>
      
    </ul>
    <ul>
        <li><Link>EZTV  </Link> </li>
      <li><Link> YIFY Status  </Link> </li>
      <li><Link>  YTS Proxies </Link> </li>
      <li><Link> YTS Proxies  </Link> </li>
      <li><Link> YTS Official Link</Link> </li>
      <li><Link> Follow @ytsyify </Link> </li>
    </ul>
    <p className='text-center text-white'>By using this site you agree to and accept our User Agreement, which can be read here.</p>
 </div>
  </div>
</footer>

</>
  )
}
