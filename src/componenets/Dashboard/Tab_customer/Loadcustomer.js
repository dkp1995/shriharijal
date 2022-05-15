import React from 'react'
import '../css/customer.css'
function Loadcustomer(props) {

  

  return (
    <div>

                    {props && <div className="table-wrapper customtablelist">

                    <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Pending amount</th>
                                    <th>Camper hold</th>
                                    <th>Disposal hold</th>
                                    <th>address</th>
                                    <th>area</th>
                                    <th>deposit</th>
                                    <th>Type of customer</th>
                                    <th>camper rate</th>
                                    <th>disposal rate</th>
                                    <th>camper order</th>
                                    <th>disposal order</th>
                                </tr>
                            </thead>

                            <tbody>
                                    <tr key={props.id}>

                                        <td >{props.name}</td>
                                        <td>&#8377; {props.pendingamount}</td>
                                        <td>{props.camperhold}</td>
                                        <td>{props.disposalhold}</td>
                                        <td>{props.address}</td>
                                        <td>{props.area}</td>
                                        <td>&#8377; {props.deposit}</td>
                                        <td>{props.flag}</td>
                                        <td>&#8377; {props.camperrate}</td>
                                        <td>&#8377; {props.disposalrate}</td>
                                        <td>{props.camperorder}</td>
                                        <td>{props.disposalorder}</td>
                                    
                                    
                                    </tr>
                            
                          
                                

                            </tbody>

                    </table>

                    </div>          

                    }  





    </div>
  )
}

export default Loadcustomer