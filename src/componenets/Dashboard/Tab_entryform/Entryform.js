import React from 'react'
import '../css/entryform.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Calculate from './Calculate'


function Entryform() {

  const [customers, setCustomers] = useState([])
  const [match, setMatch] = useState([])
  const [name , setName] = useState('')

  
  const [camper, setCamper] = useState('')
  const [disposal, setDisposal] = useState('')

  const [customerobj, setCustomerobj] = useState()
 
 
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

  // for last two input fields 
  const getCamper = (e) =>{
    setCamper(e.target.value)
  }
  const getDisposal = (e) =>{
      setDisposal(e.target.value)
    }
  
  const calculate = (e) =>{
    e.preventDefault()

    const loadsinglecustomer = async () =>{
      const response = await axios.post(`${process.env.REACT_APP_APIURL}/getsinglecustomer`,{ withCredentials: true}, {name:name, camper:camper, disposal:disposal})
      setCustomerobj(response.data)
     
    }

    loadsinglecustomer()

  }

  

  return (

    <div className='main'>

        <h3>Delivery Form</h3>

        <form onSubmit={calculate}>
             
            <div className='Namesuggestion'>

              <input  type="text" 
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
  
            <input type="number" name="camper"  placeholder='Number of Camper' autoComplete="off" required onChange={getCamper}></input>
          
            <input type="number" name="disposal" placeholder='Number of Disposal' autoComplete="off" required onChange={getDisposal}></input>

            <button type="submit" className='calculate'>Calculate</button>

        </form>

       {customerobj &&   <Calculate 
            camperrate={customerobj.doc.camperrate}
            disposalrate={customerobj.doc.disposalrate}
            getcamperprice={customerobj.getCamperprice}
            getDisposalprice={customerobj.getDisposalprice}
            todayamount={customerobj.todayamount} 
            payableamount={customerobj.payableamount}
            pendingamount={customerobj.doc.pendingamount}
            camperhold={customerobj.doc.camperhold}
            disposalhold={customerobj.doc.disposalhold}
            name={customerobj.doc.name}
            camper={camper}
            disposal={disposal}

        />}

      

      </div>

      
  )
}

export default Entryform