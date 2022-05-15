import React from 'react'
import { useEffect } from 'react'
import { Outlet, NavLink } from 'react-router-dom'
import { IoIosPeople } from 'react-icons/io'
import { RiUserAddFill } from 'react-icons/ri'
import { FaUserEdit } from 'react-icons/fa'
import { MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import '../css/customer.css'

function Customer() {

  const navigate = useNavigate()

  useEffect(()=>{

          navigate('/dashboard/customer/addcustomer')
  }, [])


  return (
    <div className='main'>
      
      <h3>Customer Management</h3>


                <div className='tablinkbox'>
                    <NavLink to='/dashboard/customer/customerlist' className="tablinklist"><IoIosPeople/></NavLink> 
                    <NavLink to='/dashboard/customer/addcustomer' className="tablink"> <RiUserAddFill/>  </NavLink>
                    <NavLink to='/dashboard/customer/editcustomer' className="tablink"> <FaUserEdit/> </NavLink>
                    <NavLink to='/dashboard/customer/deletecustomer' className="tablink"> <MdDelete/> </NavLink>
                </div>

          <Outlet/>

    </div>
  )
}

export default Customer