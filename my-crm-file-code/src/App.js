import React, { useState } from "react";
import "./App.css";
import { Routes, Route ,useLocation} from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Dashboard from "./components/Dashboard/Dashboard";
import Sales from "./components/Sales/Sales";
import Customers from "./components/Customer/Customers";
import Tasks from "./components/Tasks/Tasks";
import Opportunities from "./components/Opportunity/Opportunities";
import Leads from "./components/Lead/Leads";
import Tickets from "./components/Tickets/Tickets";
import UserProfile from "./components/User/UserProfile";
import AddNewCustomer from "./components/Customer/AddNewCustomer";
import EditCustomer from "./components/Customer/EditCustomer";
import AddNewLead from "./components/Lead/AddNewLead";
import EditLead from "./components/Lead/EditLead";
import EditOpportunity from "./components/Opportunity/EditOpportunity";
import AddNewOpportunity from "./components/Opportunity/AddNewOpportunity";
import AddNewSale from "./components/Sales/AddNewSale";
import EditSale from "./components/Sales/EditSale";
import AddNewTask from "./components/Tasks/AddNewTask";
import EditTask from "./components/Tasks/EditTask";
import EditTicket from "./components/Tickets/EditTicket";
import AddNewTicket from "./components/Tickets/AddNewTicket";
import LineGraphView from "./components/OthersServices/LineGraphView";
import SendEmail from "./components/OthersServices/SendEmail";
import Land from "./components/User/Land";
import Login from "./components/User/Login";
const App = () => {
  // const[loggedin,setloggedin]=useState(localStorage.getItem("loggedin")?localStorage.getItem("loggedin"):false);
  const location = useLocation();
  const isLandOrLogin = location.pathname === '/' || location.pathname === '/login';
  return (
    <div className="App">
     {/* <div className="main-elements">
        <Sidebar />
      </div> */}
      {!isLandOrLogin && (
        <div className="main-elements">
          <Sidebar />
        </div>
      )}
      <div className="content">
        <Routes>
          <Route path="/" element={<Land/>} />
          <Route path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/sales" element={<Sales />} />
          <Route exact path="/customers" element={<Customers />} />
          <Route exact path="/tasks" element={<Tasks />} />
          <Route exact path="/opportunities" element={<Opportunities />} />
          <Route exact path="/leads" element={<Leads />} />
          <Route exact path="/tickets" element={<Tickets />} />
          <Route exact path="/profile" element={<UserProfile />} />
          <Route exact path="/add-new-customer" element={<AddNewCustomer />} />
          <Route exact path="/editcustomer/:id" element={<EditCustomer />} />
          <Route exact path="/add-new-lead" element={<AddNewLead />} />
          <Route exact path="/editlead/:id" element={<EditLead />} />
          <Route exact path="/add-new-opportunity" element={<AddNewOpportunity />}/>
          <Route exact path="/editopportunity/:id" element={<EditOpportunity />}/>
          <Route exact path="/add-new-sale" element={<AddNewSale />} />
          <Route exact path="/editsale/:id" element={<EditSale />} />
          <Route exact path="/add-new-task" element={<AddNewTask />} />
          <Route exact path="/edittask/:id" element={<EditTask />} />
          <Route exact path="/add-new-ticket" element={<AddNewTicket />} />
          <Route exact path="/editticket/:id" element={<EditTicket />} />
          <Route exact path="/linegraph" element={<LineGraphView />} />
          <Route exact path="/send-email" element={<SendEmail />} />
          
        </Routes>
      </div>
    </div>
  );
};

export default App;
