import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'


import { islogged } from '../../../Redux/action'

function Logout() {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logitout = async () =>{

    dispatch(islogged(false))
    navigate('/admin')
    await axios.get(`${process.env.REACT_APP_APIURL}/logout`,{ withCredentials: true})
    
  }

  return (

    <div className='main'>

        <p>You will use this rarely but if you want to logout then do it</p> 

        <button className='calculate' onClick={logitout}>Logout</button>

    </div>
  )
}

export default Logout