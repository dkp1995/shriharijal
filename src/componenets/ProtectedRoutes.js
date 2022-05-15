import React from 'react'
import { useSelector } from 'react-redux'
import Admin from '../componenets/Admin/Admin'
import Dashboard from './Dashboard/Dashboard'
import { Outlet, Navigate } from 'react-router-dom'
  
  function ProtectedRoutes() {


    const loginStatus = useSelector(state => state)

    if (loginStatus) {

        return <Outlet/>; 
      }
    
      return <Navigate to='/admin/login' />

    
  }
  
  export default ProtectedRoutes