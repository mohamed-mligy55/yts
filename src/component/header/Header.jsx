import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { Link } from 'react-router-dom';
import "./header.css"


export const Header = () => {
  return (
    <>
    <header className='flex items-center justify-between pl-10 pr-10 bg-[#1d1d1d] '>
      <div className='left flex items-center'>
     <Link to="/">< img src="https://yts.lt/assets/images/website/logo-YTS-lt.svg" alt="YIFY" loading='lazy'/></Link>
     <p className='ml-4 text-xl text-[#919191]' >HD movies at the smallest file size.</p>
      </div>
      <nav className='flex items-center'>
        <form className='flex w-[250px] relative items-center'  >
          <IoMdSearch className='absolute left-[15px] top-1/2 -translate-y-1/2 block mr-3 text-[#919191]' />

          <input type='search' placeholder='Quick search'   className="
    w-full
    h-[35px]
    text-[0.85em]
    font-bold
    text-[#919191]
    border-2
    border-[#333]
    rounded-[20px]
    px-[30px]
    py-[4px]
  mr-4"/>
        </form>
        <ul className='flex items-center '>
          <li><Link to='/' className='p-2 text-sm text-[#919191] font-bold transition duration-300 hover:text-white' >Home</Link></li>
          <li><Link to='4k' className='p-2 text-sm text-[#6AC045] font-bold transition duration-300 hover:text-white'>4K</Link></li>
          <li><Link to='Trending' className='text-sm p-2 text-[#919191] font-bold transition duration-300 hover:text-white'>Trending</Link></li>
          <li><Link to='BroweserMovie' className='text-sm p-2 text-[#919191] font-bold transition duration-300 hover:text-white'>BroweserMovie</Link></li>
        </ul>
        <ul className='flex items-center p-4'>
          <li><Link to='login' className='p-2 text-sm transition duration-300 text-white font-bold hover:text-[#919191] '>Login</Link></li>
          <li><Link to='signup' className='p-2 text-sm transition duration-300 text-white font-bold hover:text-[#919191] '>SignUp</Link></li>
        </ul>
      </nav>
    </header>
    </>
  )
}
