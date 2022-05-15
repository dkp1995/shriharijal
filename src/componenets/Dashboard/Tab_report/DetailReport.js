import React from 'react'
import '../css/report.css'
import { useState, useEffect} from 'react'
import axios from 'axios'

function DetailReport() {

  const [customers, setCustomers] = useState([])
  const [match, setMatch] = useState([])
  const [name , setName] = useState('')

  const [dates, setDates] = useState()
  const [doc, setDoc] = useState()
  const [thetotal, setThetotal] = useState()

  

  useEffect(()=>{

    const loadcustomer = async () =>{
        const response = await axios.get(`${process.env.REACT_APP_APIURL}/customerlist`,{ withCredentials: true})
          setCustomers(response.data)
          
    }

    loadcustomer()
       
 },[])

  const getdates = (e) => { 

      const name = e.target.name
      const value = e.target.value

      setDates({...dates, [name]:value})
  }

  const getfiltereddata = async (e) =>{

      e.preventDefault()

      if(name){

            const response = await axios.post(`${process.env.REACT_APP_APIURL}/getreportwithname`,{ withCredentials: true}, {...dates,name:name})

            if(response.status === 200){
               
                setDoc(response.data)

                const total = await axios.post( `${process.env.REACT_APP_APIURL}/gettotalvaluewithname`,{ withCredentials: true}, {...dates,name:name})
                if(total.status === 200){
                  setThetotal(total.data)
                }
            }
          

      }else{

            const response = await axios.post(`${process.env.REACT_APP_APIURL}/getreport`,{ withCredentials: true}, dates)

            if(response.status === 200){
                
                setDoc(response.data)

                const total = await axios.post(`${process.env.REACT_APP_APIURL}/gettotalvalue`,{ withCredentials: true}, dates)
                if(total.status === 200){
                  setThetotal(total.data)
                }
            }
           

      }
      
      
  }

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

  return (


    <div>

              <form className='filterbox' onSubmit={getfiltereddata}>

                      <div className='searchbox'>

                          <input 
                            type="text" 
                            name="name" 
                            value={name} 
                            placeholder='Customer Name' 
                            className='search'
                            onChange={suggestion} 
                            autoComplete="off" 
                            
                          />

                        {match && match.map((match, i)=>{

                        return (<p key={i} onClick={()=>onSuggestion(match.name)} className="suggestionlist">{match.name}</p>)
                        })}


                      </div>

                      <div className='datebox'>
                          <input type='date' name="start" required onChange={getdates}/>
                          <input type='date' name="end" required onChange={getdates}/>
                      </div>

                      <button className='searchbtn' type='submit'>Search</button>
              </form>

              {doc && <div className="table-wrapper">
                    <table>
                            <thead>
                                    <tr>
                                      <th>Name</th>
                                      <th>Camper</th>
                                      <th>Disposal</th>
                                      <th>Camper return</th>
                                      <th>disposal return</th>
                                      <th>payment received</th>
                                      <th>pending recived </th>
                                      <th>pending created </th>
                                      <th>date </th>
                                  
                                      
                                    </tr>
                            </thead>
                            <tbody>
                                  
                                {doc.map((data,i)=>{

                                    return(

                                      <tr key={i}>
                                        <td >{data.name}</td>
                                        <td>{data.camper}</td>
                                        <td>{data.disposal}</td>
                                        <td>{data.camperreturn}</td>
                                        <td>{data.disposalreturn}</td>
                                        <td>&#8377;{data.paymentreceived}</td>
                                        <td>&#8377;{data.pendingrecived}</td>
                                        <td>&#8377;{data.pendingcreated}</td>
                                        <td>{data.date}</td>
                                    
                                      
                                      </tr>
                                    )
                                })}

                                {thetotal && thetotal.map((data)=>{

                                  return(

                                      <tr key={data.id} className="total">

                                        <td >{data.count } Total</td>
                                        <td>{data.totalcamper}</td>
                                        <td>{data.totaldisposal}</td>
                                        <td>{data.totalcamperreturn}</td>
                                        <td>{data.totaldisposalretren}</td>
                                        <td>&#8377;{data.totalpaymentreceived}</td>
                                        <td>&#8377;{data.totalpendingreceived}</td>
                                        <td>&#8377;{data.totalpendingcreated}</td>
                                        <td>{data.date}</td>

          
                                    
                                      </tr>
                                  )
                                })}
                                

                            </tbody>
                        </table>


                        
                        
                </div>
                
              }
    </div>
  )
}

export default DetailReport