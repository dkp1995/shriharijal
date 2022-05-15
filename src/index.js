import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import LoginReducer from './Redux/reducer'

//components import
import Admin from './componenets/Admin/Admin'
import Customer from './componenets/Dashboard/Tab_customer/Customer'
import Deliverylist from './componenets/Dashboard/Tab_deliverylist/Deliverylist'
import Entryform from './componenets/Dashboard/Tab_entryform/Entryform'
import Login from './componenets/Admin/Login'
import Register from './componenets/Admin/Register'
import Report from './componenets/Dashboard/Tab_report/Report';
import Settings from './componenets/Dashboard/Tab_settings/Settings';
import Dashboard from './componenets/Dashboard/Dashboard'
import Overview from './componenets/Dashboard/Tab_report/Overview'
import DetailReport from './componenets/Dashboard/Tab_report/DetailReport'
import Customerlist from './componenets/Dashboard/Tab_customer/Customerlist'
import Addcustomer from './componenets/Dashboard/Tab_customer/AddCustomer'
import Deletecustomer from './componenets/Dashboard/Tab_customer/DeleteCustomer'
import Editcustomer from './componenets/Dashboard/Tab_customer/EditCustomer'
import Resetdeliverylist from './componenets/Dashboard/Tab_settings/Resetdeliverylist';
import Logout from './componenets/Dashboard/Tab_settings/Logout';
import ProtectedRoutes from './componenets/ProtectedRoutes';

let store = createStore(LoginReducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
    <BrowserRouter>

        <Routes>
              <Route path='/' element={<App />}/>

              <Route path='/admin' element={<Admin/>}>
                  <Route path='/admin/register' element={<Register/>}/>
                  <Route path='/admin/login' element={<Login/>}/>
              </Route>     

              
              <Route element={ <ProtectedRoutes/> }>

                <Route path='/dashboard' element={ <Dashboard />}>

                    <Route path='/dashboard/deliverylist' element={<Deliverylist/>}/>  
                    <Route path='/dashboard/entryform' element={<Entryform/>}/>

                    <Route path='/dashboard/report' element={<Report/>}>
                        <Route path='/dashboard/report/overiew' element={<Overview/>}/>
                        <Route path='/dashboard/report/detailreport' element={<DetailReport/>}/>
                    </Route>

                    <Route path='/dashboard/customer' element={<Customer/>}>
                        <Route path='/dashboard/customer/customerlist' element={<Customerlist/>}/>
                        <Route path='/dashboard/customer/addcustomer' element={<Addcustomer/>}/>
                        <Route path='/dashboard/customer/deletecustomer' element={<Deletecustomer/>}/>
                        <Route path='/dashboard/customer/editcustomer' element={<Editcustomer/>}/>
                    </Route>
                    
                    <Route path='/dashboard/setting' element={<Settings/>}>
                        <Route path='/dashboard/setting/resetdeliverylist' element={<Resetdeliverylist/>}/> 
                        <Route path='/dashboard/setting/logout' element={<Logout/>}/> 
                    </Route>  
                    
                </Route>  

              </Route>

        </Routes>

    </BrowserRouter>
    </Provider>
);


