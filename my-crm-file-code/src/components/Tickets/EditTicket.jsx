import React, { useState,useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../../styles/AddNewCustomer.css";
import { RxCrossCircled } from "react-icons/rx";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const EditTicket = () => {
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
        updatedAt:""
        
      });

      const {id} = useParams();
 

    function onChangeData(e) {
        setFormData((prevData) => ({
          ...prevData,
          [e.target.name]: e.target.value,
        }));
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          Swal.fire({
            title: 'Do you want to save changes?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!'
          }).then(async (result)=>{
            if(result.isConfirmed){
              await axios.put(`http://localhost:8091/ticket/${id}`, formData);
              navigate("/tickets");

              Swal.fire(
                'Changes saved!',
                'Your changes has been saved.',
                'success'
              );
            }
          });
        } catch (error) {
          Swal.fire(
            'Something went wrong!',
            'warning'
          )
          console.error(error);
        }
      };

      useEffect(() => {
        loadTicket();
      }, []);
    
      const loadTicket = async () => {
        try {
          const response = await axios.get(`http://localhost:8091/ticket/${id}`);
          const data = response.data;
          setFormData(data);
        } catch (error) {
          Swal.fire(
            'Something went wrong!',
            'warning'
          )
          console.error(error);
        }
      };
      return (
        <div className="add-customer-page">
          <div className="page-header">
            <h2>Edit Ticket</h2>
            <Link to="/ticket" className="close-btn">
              <RxCrossCircled fontSize="2rem" />
            </Link>
          </div>
          <form className="customer-form" onSubmit={handleSubmit}>
          {/* <div className="form-field">
              <label htmlFor="customer_id">Customer ID</label>
              <input
                type="text"
                id="customer_id"
                name="customer_id"
                value={formData.customer_id}
                onChange={onChangeData}
                required
              />
            </div> */}
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
              <button className="add">Save</button>
            </div>
          </form>
        </div>
      );
    };
    
    export default EditTicket;