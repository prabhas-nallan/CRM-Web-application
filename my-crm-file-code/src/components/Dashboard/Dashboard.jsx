import React from "react";
import { useNavigate } from "react-router-dom";
import {BiMailSend} from 'react-icons/bi'
import './Dashboard.css';
import Footer from "../Footer/Footer";
import TicketPieChart from './TicketPieChart';
import { Chart, ArcElement } from 'chart.js';
import './EmailAndSmsAnalytics.css';
import LineGraph from "./LineGraph";
import EmailAndSmsAnalytics from "./EmailAndSmsAnalytics";
import OpportunityPieChart from "./OpportunityPieChart";



Chart.register(ArcElement);
const Dashboard = () => {
  const navigate = useNavigate();

  const handleLineGraph = () => {
    navigate("/linegraph");
  };

  const handleSendEmail = () => {
    navigate("/send-email");
  };

 



  return (
    <div className="sample" >
      <nav className="welcome-nav-bar">
        <p>Welcome Back!</p>
        <h1>🎉 Customer Relationship Management 🎉</h1>
      </nav>
       <div className="external" >
            <div className="internal">
                  <div className="line-graph" onClick={handleLineGraph}>
                    <LineGraph/>
                  </div>
                  <div className="line-graph">
                  <h3>Ticket Status</h3><br/>
                  <TicketPieChart/>
                  </div>
                  
            </div>
            <div className="internal">
                <div className="line-graph">
                  <h3>Opportunity Status</h3><br/>
                  <OpportunityPieChart/>
                  </div>
                  <div className="line-graph1">
                    <div>
                      <EmailAndSmsAnalytics/>
                    </div>
                    <div>
                      <button className="send-email-btn" onClick={handleSendEmail}><BiMailSend fontSize="1.6rem" /> Send Email</button>
                    </div>
                  </div>
                
            </div>
        </div>
      <div className="dashboard-footer">
        <Footer/>
      </div>
    </div>
  );
      
                
};

export default Dashboard;