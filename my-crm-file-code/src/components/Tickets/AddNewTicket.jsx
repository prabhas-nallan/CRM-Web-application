import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import '../../components/Sales/SelectCategory.css';

const AddTicket = () => {
    const navigate = useNavigate();
    function gotoTicketPage() {
        navigate("/tickets");
      }
      const [formData, setFormData] = useState({
        subject: "",
        description: "",
        status: "",
        assignedTo: "",
        createdAt:"",
        updatedAt:"",
        customer_id:""
        
      });

    function onChangeData(e) {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        try{
          await axios.post(`http://localhost:8091/customer/${formData.customer_id}/ticket`,formData);
          // navigate("/tickets");
          toast.success('Ticket has been added successfully!🔖', {
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
            window.location.href = '/tickets';
          }, 3000);
        }catch(error){
          Swal.fire(
            'Failed to create Ticket',
            'Check with the fields once.(Ex:CustomerId)',
            'warning'
          )
        } 
      }
      return (
        <div className="add-customer-page">
          <div className="page-header">
            <h2>Add a new Ticket</h2>
            <Link to="/tickets" className="close-btn">
              <RxCrossCircled fontSize="2rem" />
            </Link>
          </div>
          <form className="customer-form" onSubmit={handleSubmit}>
          <ToastContainer />
          <div className="form-field">
              <label htmlFor="customer_id">Customer ID</label>
              <input
                type="number"
                id="customer_id"
                name="customer_id"
                value={formData.customer_id}
                placeholder="Ex : 1,2,3..etc;"
                onChange={onChangeData}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                placeholder="Ex : Regarding Sales Update"
                onChange={onChangeData}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                id="description"
                name="description"
                value={formData.description}
                placeholder="Ex : Your content goes here..!"
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
                <option value="Open tickets">Open tickets</option>
                <option value="Assigned tickets">Assigned tickets</option>
                <option value="Pending tickets">Pending tickets</option>
                <option value="Resolved tickets">Resolved tickets</option>  
              </select>
            </div>
            <div className="form-field">
              <label htmlFor="assignedTo">Assigned_To</label>
              <input
                type="text"
                id="assignedTo"
                name="assignedTo"
                placeholder="Ex : Sales Team"
                value={formData.assignedTo}
                onChange={onChangeData}
                required
              />
            </div>
            <div className="form-field">
              <label htmlFor="createdAt">Created_At</label>
              <input
                type="datetime-local"
                id="createdAt"
                name="createdAt"
                value={formData.createdAt}
                onChange={onChangeData}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="updatedAt">Updated_At</label>
              <input
                type="datetime-local"
                id="updatedAt"
                name="updatedAt"
                value={formData.updatedAt}
                onChange={onChangeData}
                required
              />
            </div>
            
            <div className="action-btns">
              <button onClick={gotoTicketPage} className="cancel">
                Cancel
              </button>
              <button className="add">Add Ticket</button>
            </div>
          </form>
        </div>
      );
    };
    
    export default AddTicket;


