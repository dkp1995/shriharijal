import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import '../css/customer.css'
import Loadcustomer from './Loadcustomer'
import { IoMdCloseCircle, IoMdCheckmarkCircleOutline } from 'react-icons/io'



function EditCustomer() {

  // for showing model
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage ] = useState('')
  const toggleModal = () =>{
    
    setModal(!modal);
   
  };

  const [customers, setCustomers] = useState([])
  const [match, setMatch] = useState([])
  const [name , setName] = useState('')

  const [inputdata, setInputdata] = useState()
  const [flag , setFlag] = useState(null)

  const [customerobj, setCustomerobj] = useState()

  const getinput = (e) =>{

    if(e.target.value === "flag"){
      setFlag(true)
    }
    else{
      setFlag(false)
    }

    const name = e.target.name
    const value = e.target.value

    setInputdata({...inputdata, [name]:value})
  }

  const onformsubmit = async (e) =>{
      e.preventDefault()

      const response = await axios.post(`${process.env.REACT_APP_APIURL}/updatecustomer`,{ withCredentials: true}, {...inputdata, name:name})

      if(response.status === 200){

        setModalMessage("Record updated successfully")
        toggleModal()
      }
      else{

        setModalMessage("Error in updating record")
        toggleModal()
      }
  }

 // hitting the endpoint the getting the list of all customers 
 useEffect(()=>{

  const loadcustomer = async () =>{
      const response = await axios.get(`${process.env.REACT_APP_APIURL}/customerlist`,{ withCredentials: true})
        setCustomers(response.data)
        
  }

  loadcustomer()
     
},[])


  const onSuggestion = (text) => {
    setName(text)
    
    setMatch([])

    const loadsinglecustomer = async () =>{
      const response = await axios.post(`${process.env.REACT_APP_APIURL}/getsinglecustomertoupdate`,{ withCredentials: true}, {name:text})
      setCustomerobj(response.data)
       
    }
  
    loadsinglecustomer()

 }

 const suggestion = (e) =>{

    const inputvalue = e.target.value
    let Matches = []

    if(inputvalue.length > 0 ){
       Matches = customers.filter(cust =>{

           const regex = new RegExp(`${inputvalue}`, "gi")
           return cust.name.match(regex)
       })
    }
     setMatch(Matches)
     setName(inputvalue)
 }
 

  return (

    <div>

<h3>Update Customer Details</h3>

            <div>
                  <form onSubmit={onformsubmit}>
                      
                      <div>
                            <input  
                                type="text" 
                                name="name" 
                                value={name} 
                                placeholder='Customer Name' 
                                onChange={suggestion} 
                                autoComplete="off" 
                                required
                            />
                            
                            {match && match.map((match, i)=>{

                                return (<p key={i} onClick={()=>onSuggestion(match.name)} className="suggestionlist">{match.name}</p>)
                            })}

                      </div>

                     

                      {customerobj && <Loadcustomer
                      
                            name={customerobj.name} 
                            camperrate={customerobj.camperrate}
                            disposalrate={customerobj.disposalrate} 
                            camperorder={customerobj.camperorder}
                            disposalorder={customerobj.disposalorder}
                            address={customerobj.address}
                            area={customerobj.area}
                            deposit={customerobj.deposit}
                            flag={customerobj.flag}
                            camperhold={customerobj.camperhold}
                            disposalhold={customerobj.disposalhold}
                            pendingamount={customerobj.pendingamount}
                           
                         
                      
                      />}

                      

                      <div className='udpatefield'>

                            <select name="fieldname"  id='choose'  onChange={getinput} required>
                                  <option value="" hidden>What to update</option>
                                  <option value="pendingamount">Payment Received</option>
                                  <option value="camperhold">Camper Received</option>
                                  <option value="disposalhold">Disposal Received</option>
                                  <option value="address">Address</option>
                                  <option value="area">Area</option>
                                  <option value="flag">Type of Customer</option>
                                  <option value="camperrate">Camper Rate</option>
                                  <option value="disposalrate">Disposal Rate</option>
                                  <option value="camperorder">Camper Order</option>
                                  <option value="disposalorder">Disposal Order</option>
                                  <option value="deposit">Deposit</option>
                            </select>




                            {flag ?   <select name="value"  id='choose'  onChange={getinput} required>
                                        <option value="" hidden>Choose</option>
                                        <option value="daily">Daily</option>
                                        <option value="alternate">Alternate</option>
                                        <option value="custom">Custom</option>
                                      </select> 
                                
                                : <input type="text" name="value" placeholder='Enter the value' required onChange={getinput}/>
                                
                              }
                    
                      </div>


                      <button type="submit" className='calculate'>Save the Change</button>

                  </form>
            </div>

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

    </div>
  )
}

export default EditCustomer