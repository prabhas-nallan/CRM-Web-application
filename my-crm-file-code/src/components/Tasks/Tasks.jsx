import React, { useEffect, useState } from "react";
import { LuEdit } from "react-icons/lu";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { CgSearch } from "react-icons/cg";
import { AiOutlineUserAdd } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "../../styles/Customers.css"
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";
import Footer from "../Footer/Footer";
import "../Customer/Delete.css";

const Tasks = ({ tasks }) => {

  const [alltasks, setAlltasks] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");

  const [deleteMessage, setDeleteMessage] = useState("");

  const navigate = useNavigate();

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };


  useEffect(()=>{
    loadTask();
  } , [])

  const loadTask = async () => {
    try{
      const response = await axios.get("http://localhost:8091/task");
    const data = response.data; 

    setAlltasks(data);
    console.log(alltasks);
    }catch(err){
      console.log(err);
      Swal.fire(
        'Something went wrong!',
        'warning'
      )
    }
  };
  

  const moveToAddNewTaskPage = () => {
    navigate("/add-new-task");
  };

  const handleEdit = (id) =>{
    navigate(`/edittask/${id}`)
  }

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
            await axios.delete(`http://localhost:8091/task/${id}`);
            setAlltasks((prevTasks) =>
            prevTasks.filter((task) => task.id !== id)
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
  
  return (
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
        <button className="add-customer-btn" onClick={moveToAddNewTaskPage}>
          <AiOutlineUserAdd fontSize="1.6rem" />
          <p>Add Task</p>
        </button>
      </div>
      <div className="customer-table">
        <table>
          <thead>
            <tr>
              <th>S No.</th>
              <th>TaskId</th>
              <th>Name</th>
              <th>Email</th>
              <th>Description</th>
              <th>Assigned to</th>
              <th>Due date</th>
              <th>Created at</th>
              <th>Completed at</th>
              <th>Updated at</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {alltasks
            .filter((task) => {
              return (
                task.name.toLowerCase().includes(searchQuery) ||
                task.id.toString().includes(searchQuery)
              );
            })
            .map((eachTask, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{eachTask.id}</td>
                  <td>{eachTask.name}</td>
                  <td>{eachTask.email}</td>
                  <td>{eachTask.description}</td>
                  <td>{eachTask.assignedto}</td>
                  <td>{eachTask.duedate}</td>
                  <td>{eachTask.createdat}</td>
                  <td>{eachTask.completedat}</td>
                  <td>{eachTask.updatedat}</td>
                  <td className="action-btns">
                    <div className="action-btn">
                      <LuEdit className="action-btn-component" fontSize="1.6rem" onClick={()=>handleEdit(eachTask.id)}/>
                      <RiDeleteBin2Fill className="action-btn-component" fontSize="1.6rem" onClick={()=>handleDelete(eachTask.id)}/>
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

export default Tasks;
