import React from 'react'
import { useEffect } from 'react'
import { Outlet , NavLink } from 'react-router-dom'
import { BsTruck, BsBarChart,  BsPeople } from 'react-icons/bs'
import { AiOutlineForm } from 'react-icons/ai'
import { FiSettings } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'


import './css/menu.css'
import './css/modal.css'

function Dashboard() {

  const navigate = useNavigate()

  useEffect(()=>{

          navigate('/dashboard/deliverylist')
  }, [])

  return (


    <div>

    
      
         <div className='bottom_menu'>

            <NavLink to='/dashboard/deliverylist' className="link"><BsTruck/>  </NavLink> 
            <NavLink to='/dashboard/entryform' className="link"> <AiOutlineForm/> </NavLink>  
            <NavLink to='/dashboard/report' className="link"> <BsBarChart/> </NavLink>  
            <NavLink to='/dashboard/customer' className="link"> <BsPeople/> </NavLink>  
            <NavLink to='/dashboard/setting' className="link"> <FiSettings/> </NavLink>

        </div>
      
        <div className='content'><Outlet/></div>
      
        
      
    </div>
  )
}

export default Dashboard