import React from 'react'
import { useState, useEffect } from 'react'

import axios from 'axios'

function Customerlist() {

  const [doc, setDoc] = useState([''])

  

  const getcustomerlist = async () => {

    
    const response = await axios.get(`${process.env.REACT_APP_APIURL}/customerlist`,{ withCredentials: true})

    setDoc(response.data)

  }


  useEffect(()=>{

          getcustomerlist()
  }, [])

  

  return (

    <div className='main'>

            <h3>Customer List</h3>
          
            <div className="table-wrapper">
                    <table>
                            <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Address</th>
                                      <th>Phone Number</th>
                                      <th>Area</th>
                                      <th>Deposit</th>
                                      <th>Frequency</th>
                                      <th>Camper Rate</th>
                                      <th>Disposal Rate</th>
                                      <th>Camper hold</th>
                                      <th>Disposal hold</th>
                                      <th>Pending Amount</th>
                                      <th>Camper Order</th>
                                      <th>Disposal Order</th>
                                     
                                      
                                    </tr>
                            </thead>
                            <tbody>
                                  
                                {doc.map((data,i)=>{

                                    return(

                                      <tr key={i}>
                                        <td >{data.name}</td>
                                        <td>{data.address}</td>
                                        <td>{data.phoneno}</td>
                                        <td>{data.area}</td>
                                        <td>{data.deposit}</td>
                                        <td>{data.flag}</td>
                                        <td>{data.camperrate}</td>
                                        <td>{data.disposalrate}</td>
                                        <td>{data.camperhold}</td>
                                        <td>{data.disposalhold}</td>
                                        <td>{data.pendingamount}</td>
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

export default Customerlist