import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { IoMdCloseCircle, IoMdCheckmarkCircleOutline , IoIosCloseCircleOutline } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

function Resetdeliverylist() {

  // for showing model
  const [modal, setModal] = useState(false);
  const [modalicon, setModalicon] = useState(true)
  const [modalMessage, setModalMessage ] = useState('')
  const toggleModal = (e) =>{
    
    setModal(!modal);

    if(e){

         navigate('/dashboard/deliverylist')
    }
   
   
  };

  const navigate = useNavigate()

  const [pin , setPin] = useState()

  const getpin = (e) =>{

      setPin(e.target.value)
  }

  const resetdeliverylist = async (e) =>{



      e.preventDefault()

      const response = await axios.post(`${process.env.REACT_APP_APIURL}/resetfrequency`,{ withCredentials: true}, {pin})

      if(response.status === 200){

        

        setModalMessage("Delivery list reset successfully")
          toggleModal()
          setModalicon(true)

      }else{

           
       

        setModalMessage("Incorrect PIN")
        toggleModal()
        setModalicon(false)

      }
  } 

  return (

    <div className='main'>

        <p>This buttion will reset the delivery list of the day</p> 
        <p>so please only use it once at the early morning </p>

        <form onSubmit={resetdeliverylist}>

              <input type="number" placeholder="Security PIN" onChange={getpin} required/>

              <button type='submit' className='calculate'>Reset the Delivery list</button>
        </form>

        
        {modal && (
              <div className="modal">
                <div onClick={e=>toggleModal(e.target.value=" ")} className="overlay"></div>
                <div className="modal-content">
                    
                    {modalicon ? 
                    <div className='message'><IoMdCheckmarkCircleOutline className='messagechild'/> <h2>{modalMessage}</h2></div> 
                    : 
                    <div className='message'><IoIosCloseCircleOutline className='messagechild'/> <h2>{modalMessage}</h2></div>}
                  
                  <button className="close-modal" onClick={e=>toggleModal(e.target.value=" ")}>
                    <IoMdCloseCircle/>
                  </button>
                </div>
              </div>
          )}
    </div>
  )
}

export default Resetdeliverylist