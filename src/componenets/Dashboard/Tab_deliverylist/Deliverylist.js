import React from 'react'
import { useState, useEffect } from 'react'
import '../css/deliverylist.css'
import axios from 'axios'

function Deliverylist() {

  const [doc, setDoc] = useState([''])

  const gettodaydeliverylist = async () => {

    const response = await axios.get( `${process.env.REACT_APP_APIURL}/todaydeliverylist`,{ withCredentials: true})
   

    setDoc(response.data)

  }


  useEffect(()=>{

          gettodaydeliverylist()
  }, [])

  return (

    <div className='main'>

          <h3>Delivery list of Today</h3>
        
          <div className="table-wrapper">
                  <table>
                          <thead>
                                  <tr>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone Number</th>
                                    <th>Camper Order</th>
                                    <th>Disposal Order</th>
                                    
                                  </tr>
                          </thead>
                          <tbody>
                                
                              {doc.map((data, i)=>{

                                  return(

                                    <tr key={i}>
                                      <td>{data.name}</td>
                                      <td>{data.address}</td>
                                      <td>{data.phoneno}</td>
                                      <td>{data.camperorder}</td>
                                      <td>{data.disposalorder}</td>
                                      

                                      
                                    
                                    </tr>
                                  )
                              })}
                               

                          </tbody>
                  </table>
          </div>

    </div>

  )
}

export default Deliverylist