import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet , Navigate } from 'react-router-dom'
import '../Admin/admin.css'
import { useNavigate } from 'react-router-dom'

function Admin() {

  
  const loginStatus = useSelector(state => state)

  const navigate = useNavigate()

  useEffect(()=>{

          navigate('/admin/login')
  }, [])


    if(!loginStatus){

      return (

        <div>
          
          <div className='adminloginoption'>
    
                    {/* <NavLink to='/admin/register' className='loginlink'>Register  </NavLink>  */}
                    {/* <NavLink to='/admin/login' className='loginlink'> Login </NavLink> */}
                
          </div>
          
          <Outlet/> </div>
      )
    }else{

        return ( 

          <Navigate to='/dashboard/deliverylist' />
        )
    }
}

export default Admin