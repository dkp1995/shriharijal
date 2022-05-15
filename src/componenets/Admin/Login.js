import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { IoMdCloseCircle, IoIosCloseCircleOutline  } from 'react-icons/io'
import { islogged } from '../../Redux/action'

function Login() {

    // for showing model
    const [modal, setModal] = useState(false);
    const [modalMessage, setModalMessage ] = useState('')
    const toggleModal = (e) =>{
      
      setModal(!modal);
  
    };

  const navigate = useNavigate()

  const [logindata, setLogindata] = useState()

  const dispatch = useDispatch()
  
  const getData = (e) =>{

    setLogindata({...logindata, [e.target.name]: e.target.value})

  }

  const summiteddata = async (e) =>{

    e.preventDefault()

    const res = await axios.post(`${process.env.REACT_APP_APIURL}/ownervalidate`, logindata)

        if(res.status === 200){
            
            dispatch(islogged(true))
            navigate('/dashboard')
            
        }
        else{
          setModalMessage("Incorrect Email & Password")
          toggleModal()
        }
  }

  return (


    <div className='loginformbox'>

            
           
            <form method='POST' onSubmit={summiteddata} className='loginform'>

                  <h2 className='lognlabel'>Login</h2>
              
                  <input type="text" placeholder='Email' name="email" onChange={getData} className="logininput"/>
                  <input type="password" placeholder='Password' name="password" onChange={getData}  className="logininput2"/>
                  <input type="submit" value='LOGIN' className="logininputbtn"/>


            </form>

            {modal && (
              <div className="modal">
                <div onClick={e=>toggleModal(e.target.value=" ")} className="overlay"></div>
                <div className="modal-content">
                    
                <h2> <IoIosCloseCircleOutline/> {modalMessage}</h2>
                  
                  <button className="close-modal" onClick={e=>toggleModal(e.target.value=" ")}>
                    <IoMdCloseCircle/>
                  </button>
                </div>
              </div>
          )} 

    </div>
        
           

  )


}

export default Login