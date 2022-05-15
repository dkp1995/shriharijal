import React from 'react'
import { useEffect } from 'react'
import '../css/report.css'
import { Outlet, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Report() {

  const navigate = useNavigate()

  useEffect(()=>{

          navigate('/dashboard/report/overiew')
  }, [])


  return (

    <div className='main'>

      

                <div className='linkbox'>
                    <NavLink to='/dashboard/report/overiew' className="link2">Overview  </NavLink> 
                    <NavLink to='/dashboard/report/detailreport' className="link2"> Detail Report </NavLink>
                </div>

          <Outlet/>
    </div>
  )
}

export default Report