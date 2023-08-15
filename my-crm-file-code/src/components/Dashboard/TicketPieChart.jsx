import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { FaCircle } from 'react-icons/fa';
import { Pie } from "react-chartjs-2";
import './Dashboard.css';



const TicketPieChart = () => {
    
    const [openTickets, setOpenTickets] = useState(0);
    const [assignedTickets, setAssignedTickets] = useState(0);
    const [pendingTickets, setPendingTickets] = useState(0);
    const [resolvedTickets, setResolvedTickets] = useState(0);
  
    useEffect(() => {
      axios.get("http://localhost:8091/ticket")
        .then((response) => {
          setTickets(response.data);
          setLoadingTickets(false);
          
          // Calculate the count for each ticket status category
          const statusCounts = response.data.reduce((counts, ticket) => {
            counts[ticket.status] = (counts[ticket.status] || 0) + 1;
            return counts;
          }, {});
          
          
          setOpenTickets(statusCounts["Open tickets"] || 0);
          setAssignedTickets(statusCounts["Assigned tickets"] || 0);
          setPendingTickets(statusCounts["Pending tickets"] || 0);
          setResolvedTickets(statusCounts["Resolved tickets"] || 0);
        })
        .catch((error) => {
          console.error("Error fetching ticket data:", error);
          setLoadingTickets(false);
        });
    }, []);
  
  const [tickets, setTickets] = useState([]);
  const [chartData, setChartData] = useState({});
  const [loadingTickets, setLoadingTickets] = useState(true);
  
  useEffect(() => {
    axios.get("http://localhost:8091/ticket")
      .then((response) => {
        setTickets(response.data);
        setLoadingTickets(false);
      })
      .catch((error) => {
        console.error("Error fetching ticket data:", error);
        setLoadingTickets(false);
      });
  }, []);
  
  useEffect(() => {
    if (tickets.length > 0) {
      const statusCounts = tickets.reduce((counts, ticket) => {
        counts[ticket.status] = (counts[ticket.status] || 0) + 1;
        return counts;
      }, {});
  
      const statusLabels = Object.keys(statusCounts);
      const statusPercentages = statusLabels.map((status) => {
        return ((statusCounts[status] / tickets.length) * 100).toFixed(2);
      });
  
      setChartData({
        labels: statusLabels,
        datasets: [
          {
            data: statusPercentages,
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"], // Customize colors as needed
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50"],
          },
        ],
      });
    }
  }, [tickets]);
    
  // Check if data is still loading
  if (loadingTickets) {
    return <div>Loading...</div>;
  }
  
  // Check if chartData is empty (not initialized yet)
  if (Object.keys(chartData).length === 0) {
    return <div>No data available for the chart.</div>;
  }
    
  // ...............................................................to
  
  const renderChart = () => {
   
    if (loadingTickets) {
      return <div>Loading...</div>;
    }
  
    if (Object.keys(chartData).length === 0) {
      return <div>No data available for the chart.</div>;
    }
    return <div className="ticket-analytics">{renderChart()}</div>;
  }

  return (          
          <div className="chart-container">
            
            <div className='graph-size'>
            
             <Pie data={chartData} />
            </div>
            
              <div className='graph-side-content'>
                <p>Total Tickets: {openTickets+assignedTickets+pendingTickets+resolvedTickets}</p><br/>
                <p><FaCircle style={{ color: "#FF6384" }} />Open Tickets: {openTickets}</p><br/>
                <p><FaCircle style={{ color: "#36A2EB" }} />Assigned Tickets: {assignedTickets}</p><br/>
                <p><FaCircle style={{ color: "#FFCE56" }} />Pending Tickets: {pendingTickets}</p><br/>
                <p><FaCircle style={{ color: "#4CAF50" }} />Resolved Tickets: {resolvedTickets}</p>
              </div> 
          </div>
  )
  
}

export default TicketPieChart;