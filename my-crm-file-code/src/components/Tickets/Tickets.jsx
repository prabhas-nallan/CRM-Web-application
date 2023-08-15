import React, { useEffect, useState } from "react";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import { AiOutlineUserAdd } from "react-icons/ai";
import { TiTicket } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import "../../styles/Customers.css"
import Footer from "../Footer/Footer";
import "../Customer/Delete.css";


const Tickets = ({tickets}) => {
  const [alltickets, setAlltickets] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const navigate = useNavigate();
  
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    loadTicket();
  }, []);

  const loadTicket = async () => {
      await axios.get("http://localhost:8091/ticket").then((response)=>{
        if(response.data){
          setAlltickets(response.data)
        }
      }).catch((error)=>{
        Swal.fire(
          'Something went wrong!',
          'warning'
        )
      })
  };

 

  const moveToAddNewTicketPage = () => {
    navigate("/add-new-ticket");
  };

  const handleEdit = (id) => {
    navigate(`/editticket/${id}`);
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(`http://localhost:8091/ticket/${id}`);
          setAlltickets((prevTickets) =>
            prevTickets.filter((ticket) => ticket.id !== id)
          );
  
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          );
        }
      });
    } catch (error) {
      console.error(error);
      Swal.fire(
        'Something went wrong!',
        'warning'
      )
    }
  };
   
  
 const handleRaiseTicket = async(cust_id,subject,body)=>{
  try{
    console.log(cust_id,subject,body);
      toast.success('Ticket has been raised successfully!🎟️', {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    await axios.post(`http://localhost:8091/raise/${cust_id}/ticket/${subject}/${body}`).then((response)=>{
      console.log(response,"Ticket raised");
    })
  }catch(error){
    console.log(error);
    Swal.fire(
      'Something went wrong!',
      'warning'
    )
  }
 }

  return(
    <div className="customers-page">
      <div className="header-section">
        <div className="search-bar">
          <CgSearch fontSize="1.6rem" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchInputChange}
          />
        </div>
        <button className="add-customer-btn" onClick={moveToAddNewTicketPage}>
          <AiOutlineUserAdd fontSize="1.6rem" />
          <p>Add a new Ticket</p>
        </button>
      </div>
      <div className="customer-table">
        <table>
          <thead>
            <tr>
              <th>S No.</th>
              <th>Ticket ID</th>
              <th>Customer ID</th>
              <th>Subject</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned_To</th>
              <th>Created_At</th>
              <th>Updated_At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alltickets
            .filter((ticket) => {
              return (
                ticket.status.toLowerCase().includes(searchQuery) ||
                ticket.id.toString().includes(searchQuery)
              );
            })
            .map((eachTicket, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{eachTicket.id}</td>
                <td>{eachTicket.customer_id}</td>
                <td>{eachTicket.subject}</td>
                <td>{eachTicket.description}</td>
                <td>{eachTicket.status}</td>
                <td>{eachTicket.assignedTo}</td>
                <td>{eachTicket.createdAt}</td>
                <td>{eachTicket.updatedAt}</td>
                <td className="action-btns">
                  <div className="action-btn">
                    <LuEdit
                      className="action-btn-component"
                      fontSize="1.6rem"
                      onClick={() => handleEdit(eachTicket.id)}
                    />
                    <RiDeleteBin2Fill
                      className="action-btn-component"
                      fontSize="1.6rem"
                      onClick={() => handleDelete(eachTicket.id)}
                    />
                    <TiTicket className="action-btn-component" fontSize="1.6rem"
                      onClick={() => handleRaiseTicket(eachTicket.customer_id,eachTicket.subject,eachTicket.description)} />
                      <ToastContainer />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {deleteMessage && <p className="delete-message">{deleteMessage}</p>}
      {/* <Footer/> */}
    </div>
  );
};

export default Tickets;
