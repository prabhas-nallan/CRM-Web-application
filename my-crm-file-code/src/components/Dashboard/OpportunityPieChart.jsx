import React from 'react'
import { useEffect,useState } from 'react';
import axios from 'axios';
import { Pie } from "react-chartjs-2";
import { FaCircle } from 'react-icons/fa';
import './Dashboard.css';
const OpportunityPieChart = () => {

    const [open, setOpen] = useState(0);
    const [proposal, setProposal] = useState(0);
    const [closedWin, setClosedWin] = useState(0);
    const [closedLoss, setClosedLoss] = useState(0);
    useEffect(() => {
        axios.get("http://localhost:8091/opportunity")
          .then((response) => {
            setOpportunities(response.data);
            setLoadingOpportunities(false);
            
            // Calculate the count for each opportunity status category
            const statusCounts = response.data.reduce((counts, opportunity) => {
              counts[opportunity.status] = (counts[opportunity.status] || 0) + 1;
              return counts;
            }, {});
            
            
            setOpen(statusCounts["Open"] || 0);
            setProposal(statusCounts["Proposal"] || 0);
            setClosedWin(statusCounts["Closed Win"] || 0);
            setClosedLoss(statusCounts["Closed Loss"] || 0);
          })
          .catch((error) => {
            console.error("Error fetching opportunity data:", error);
            setLoadingOpportunities(false);
          });
      }, []);


      const [opportunities, setOpportunities] = useState([]);
        const [chartData, setChartData] = useState({});
        const [loadingOpportunities, setLoadingOpportunities] = useState(true);
        
        useEffect(() => {
            axios.get("http://localhost:8091/opportunity")
            .then((response) => {
                setOpportunities(response.data);
                setLoadingOpportunities(false);
            })
            .catch((error) => {
                console.error("Error fetching opportunity data:", error);
                setLoadingOpportunities(false);
            });
        }, []);


        useEffect(() => {
            if (opportunities.length > 0) {
              const statusCounts = opportunities.reduce((counts, opportunity) => {
                counts[opportunity.status] = (counts[opportunity.status] || 0) + 1;
                return counts;
              }, {});
          
              const statusLabels = Object.keys(statusCounts);
              const statusPercentages = statusLabels.map((status) => {
                return ((statusCounts[status] / opportunities.length) * 100).toFixed(2);
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
          }, [opportunities]);

          // Check if data is still loading
            if (loadingOpportunities) {
                return <div>Loading...</div>;
            }
            
            // Check if chartData is empty (not initialized yet)
            if (Object.keys(chartData).length === 0) {
                return <div>No data available for the chart.</div>;
            }

            const renderChart = () => {
   
                if (loadingOpportunities) {
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
                <p>Total Opportunities: {open+proposal+closedWin+closedLoss}</p><br/>
                <p><FaCircle style={{ color: "#FF6384" }} />Open: {open}</p><br/>
                <p><FaCircle style={{ color: "#36A2EB" }} />Proposal: {proposal}</p><br/>
                <p><FaCircle style={{ color: "#FFCE56" }} />Closed Win: {closedWin}</p><br/>
                <p><FaCircle style={{ color: "#4CAF50" }} />Closed Loss: {closedLoss}</p>
              </div> 
          </div>
  )
}

export default OpportunityPieChart;