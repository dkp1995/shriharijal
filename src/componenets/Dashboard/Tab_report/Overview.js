import React from 'react'
import '../css/report.css'
import { useEffect, useState } from 'react'
import axios from 'axios'

function Overview() {

  const [report , setReport] = useState()

  const getreport = async () =>{

      const response = await axios.get(`${process.env.REACT_APP_APIURL}/getoverivew`,{ withCredentials: true})
   

      if(response.status === 200){
          setReport(response.data)
      
      }
  }

  useEffect(()=>{

        getreport()
  },[])

  return (
    
    <div>
              {report && report.map((data)=>{

                return (

                  <div className='overviewbox' key={data._id}>
                    <div className='overviewcard'><h4>Camper Delivered</h4><h1>{data.totalcamper}</h1></div>
                    <div className='overviewcard'><h4>Disposal Delivered</h4><h1>{data.totaldisposal}</h1></div>
                    <div className='overviewcard'><h4>Camper Returned</h4><h1>{data.totalcamperreturn}</h1></div>
                    <div className='overviewcard'><h4>Disposal Returned</h4><h1>{data.totaldisposalretren}</h1></div>
                    <div className='overviewcard'><h4>Payment Received</h4><h1>&#8377; {data.totalpaymentreceived}</h1></div>
                    <div className='overviewcard'><h4>Pending Received with Delivery</h4><h1> &#8377; {data.totalpendingreceived}</h1></div>
                    <div className='overviewcard'><h4>Pending Created</h4><h1>&#8377;  {data.totalpendingcreated}</h1></div>
                
                  </div>
                )
              })}
                
    </div>
  )
}

export default Overview