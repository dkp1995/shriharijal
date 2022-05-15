import React from 'react'
import {useState, useEffect, useRef} from 'react'
import axios from 'axios'
import '../css/modal.css'
import { IoMdCloseCircle, IoMdCheckmarkCircleOutline } from 'react-icons/io'

function AddCustomer() {

  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage ] = useState('')
  const toggleModal = () =>{
    
    setModal(!modal);
   
  };
  

  const [ formdata, setFormdata ] = useState({})

  const formtRef = useRef(null)
  const inputRef = useRef(null)
 
  const getformdata = (e) =>{

      const name = e.target.name
      const value = e.target.value

      

      setFormdata({...formdata, [name]:value})
  }

  useEffect(()=>{
    
  },[])

  const addformdatatoapi = async (e) =>{

      e.preventDefault()

      try {
        
        const customerres = await axios.post(`${process.env.REACT_APP_APIURL}/addcustomer`, formdata)

        
        if(customerres.status === 200){
          
          setModalMessage(customerres.data.message)
      
          
          toggleModal()
          setFormdata({})
          formtRef.current.value = ' ';

        }
        else{

          setModalMessage(customerres.data.message)
         
          toggleModal()
          
          inputRef.current.value = ' '
          inputRef.current.focus()

        } 
        
      } catch (error) {
        
      }
  }

  return (

    <div>

        {modal && (
              <div className="modal">
                <div onClick={toggleModal} className="overlay"></div>
                <div className="modal-content">
                <h2> <IoMdCheckmarkCircleOutline/> {modalMessage}</h2>
                  
                  <button className="close-modal" onClick={toggleModal}>
                  <IoMdCloseCircle/>
                  </button>
                </div>
              </div>
          )}


          <h3>Add a New Customer</h3>

              <div>
                      <form onSubmit={addformdatatoapi} ref={formtRef}>
                  
                        <div>
                            <small>Note : name can never be changed so write mindfully</small>
                            <input type="text" ref={inputRef} name="name" id="name" placeholder='Customer Name' onChange={getformdata} autoComplete="off" required></input>
                            
                        </div>

                        <input type="text"  name="address" placeholder='Address' onChange={getformdata} autoComplete="off" required></input>
                      
                        <input type="number"  name="phoneno" placeholder='Phone Number' onChange={getformdata} autoComplete="off" required></input>

                        <input type="text"  name="area" placeholder='Area' onChange={getformdata} autoComplete="off" required></input>

                        <input type="number"  name="deposit"  placeholder='Deposit Amount' onChange={getformdata} autoComplete="off" required></input>

                        <input type="number" name="camperrate"  placeholder='Camper Price' onChange={getformdata} autoComplete="off" required></input>

                        <input type="number"  name="disposalrate" placeholder='Disposal Price' onChange={getformdata} autoComplete="off" required></input>

                        <input type="number"  name="pendingamount"  placeholder='Pending Amount' onChange={getformdata} autoComplete="off" required></input>

                        <input type="number"  name="camperhold"  placeholder='Camper Hold' onChange={getformdata} autoComplete="off" required></input>

                        <input type="number"  name="disposalhold"  placeholder='Disposal Hold' onChange={getformdata} autoComplete="off" required></input>

                        <input type="number"  name="camperorder"  placeholder='Camper Order Quantity' onChange={getformdata} autoComplete="off" required></input>

                        <input type="number"  name="disposalorder"  placeholder='Disposal Order Quantity' onChange={getformdata} autoComplete="off" required></input>

                        

                        <select name="flag"  id='choose'  onChange={getformdata} required>
                            <option value="" hidden>Set Customer Type</option>
                            <option value="daily">Daily</option>
                            <option value="alternate">Alternate</option>
                            <option value="custom">Custom</option>
                        </select>

                       

                        <select name="frequency"  id='choose' onChange={getformdata} required>
                            <option value="" hidden>When first delivery</option>
                            <option value="true">Starting from Today</option>
                            <option value="false">Not starting from Today</option>
                        </select>


                        <button type="submit" className='calculate'>Add Customer</button>

                    </form>
              </div>
    </div>
  )
}

export default AddCustomer