import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { IoMdCloseCircle, IoMdCheckmarkCircleOutline } from 'react-icons/io'

function Calculate(props) {

  // for modal show 
  const [modal, setModal] = useState(false);
  const [modalMessage, setModalMessage ] = useState('')
  const toggleModal = () =>{
    
    setModal(!modal);
   
  };

  const [ inputvalue, setInputvalue ] = useState()



  const getinputvalue = (e) =>{

      const name = e.target.name 
      const value = e.target.value

      setInputvalue({...inputvalue, [name]:value})
  }

  const savedelivery = async (e) =>{

    e.preventDefault()

    if(inputvalue.paymentreceived <= props.payableamount){
      
   
        const response = await axios.post(`${process.env.REACT_APP_APIURL}/adddelivery`,{ withCredentials: true}, {
          name:props.name, 
          camper:props.camper,
          disposal: props.disposal,
          camperreturn: inputvalue.camperreturn,
          disposalreturn:inputvalue.disposalreturn  ,
          paymentreceived:inputvalue.paymentreceived

        })

        if(response.status === 200){
        
          setModalMessage("Delivery successfully recorded")
          
          toggleModal()

        }
        else{
          setModalMessage("Something went wrong")
          
          toggleModal()
        }
    }
    else{
      alert("paymentreceived can't be greater than payable amount")
    }
  }

  return (

          <>
            {props ? <div>
                <h5>
                  
                  Camper : {props.camper} x {props.camperrate} = {props.getcamperprice} || 
                  Disposal : {props.disposal} x {props.disposalrate} = {props.getDisposalprice} 
                   

                </h5>

                <h4>Today Amount : {props.todayamount}</h4>

                <h4>Pending Amount : {props.pendingamount} </h4>
                <h3>Payable Amount : {props.payableamount}</h3>
                <h4>Camper hold : {props.camperhold}</h4>
                <h4>Disposal hold : {props.disposalhold}</h4> 

              

                <form onSubmit={savedelivery}>
             
                  <input type="number" name="paymentreceived"  placeholder='Amount received' onChange={getinputvalue} required></input>
       
                  <input type="number" name="camperreturn" placeholder='Number of Camper Returned' onChange={getinputvalue} required></input>
                
                  <input type="number" name="disposalreturn"  placeholder='Number of Disposal Returned' onChange={getinputvalue} required></input>

                  <button type="submit" className='calculate'>Submit</button>

               </form>

        </div>: <h3>Loading...</h3>}



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
          </>
      
  )
}

export default Calculate