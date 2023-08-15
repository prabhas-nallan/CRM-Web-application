import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
const AddOpportunity = () => {
    const navigate = useNavigate();
  
    function gotoOpportunityPage() {
      navigate("/opportunities");
    }
    const [formData, setFormData] = useState({
        name: "",
        status: "",
        value: "",
        closeDate: "",
        notes:"",
      });

    const [custid,setCustid]=useState();  

      function onChangeData(e) {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      }

      const onChangeCustomerData = (e) =>{

        setCustid( e.target.value)
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        console.log(custid,"custid");
        try{
          await axios.post(`http://localhost:8091/customer/${custid}/opportunity`,formData);
          // navigate("/opportunities")
          toast.success('Opportunity has been added successfully!🚪', {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
           // Navigate to 'tickets' page after a delay of 3 seconds (3000 milliseconds)
          setTimeout(() => {
            window.location.href = '/opportunities';
          }, 3000);
        }
        catch(error){
          // window.alert('Failed to create Opportunity');
          Swal.fire(
            'Failed to create opportunity',
            'Check with the fields once.(Ex:CustomerId)',
            'warning'
          )
        }
      }

      return (
        <div className="add-customer-page">
          <div className="page-header">
            <h2>Add a new Opportunity</h2>
            <Link to="/opportunities" className="close-btn">
              <RxCrossCircled fontSize="2rem" />
            </Link>
          </div>
          <form className="customer-form" onSubmit={handleSubmit}>
            <ToastContainer/>
          <div className="form-field">
              <label htmlFor="customer_id">Customer ID</label>
              <input
                type="number"
                id="customer_id"
                name="customer_id"
                value={custid}
                placeholder="Ex : 1,2,3..etc;"
                onChange={onChangeCustomerData}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                placeholder="Ex : Opportunity Name"
                onChange={onChangeData}
                required
              />
            </div>
           
            <div className="form-field select-field">
              <select type="text" value={formData.status} onChange={onChangeData}
              name="status"
              id="status" 
              required>
                <option value="">Status</option>
                <option value="Open">Open</option>
                <option value="Proposal">Proposal</option>
                <option value="Closed Win">Closed Win</option>
                <option value="Closed Loss">Closed Loss</option>  
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="value">Value</label>
              <input
                type="number"
                id="value"
                name="value"
                value={formData.value}
                placeholder="Ex : 5000"
                onChange={onChangeData}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="closeDate">CloseDate</label>
              <input
                type="date"
                id="closeDate"
                name="closeDate"
                placeholder="Ex : 02/07/2023"
                value={formData.closeDate}
                onChange={onChangeData}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="notes">Notes</label>
              <input
                type="text"
                id="notes"
                name="notes"
                value={formData.notes}
                placeholder="Ex : Describe about the opportunity here!"
                onChange={onChangeData}
                required
              />
            </div>
            
            <div className="action-btns">
              <button onClick={gotoOpportunityPage} className="cancel">
                Cancel
              </button>
              <button className="add">Add Opportunity</button>
            </div>
          </form>
        </div>
      );
    };
    
    export default AddOpportunity;