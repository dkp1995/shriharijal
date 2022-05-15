import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Outlet , NavLink } from 'react-router-dom'
import '../css/settings.css'

function Settings() {

  const navigate = useNavigate()

  useEffect(()=>{

          navigate('/dashboard/setting/resetdeliverylist')
  }, [])


  return (

    <div className='main'>

      <h3>Settings</h3>
           

                <div className='linkbox'>
                    <NavLink to='/dashboard/setting/resetdeliverylist' className="link2">Reset Delivery list  </NavLink> 
                    <NavLink to='/dashboard/setting/logout' className="link2"> Logout </NavLink>
                </div>

          <Outlet/>

    </div>
  )
}

export default Settings