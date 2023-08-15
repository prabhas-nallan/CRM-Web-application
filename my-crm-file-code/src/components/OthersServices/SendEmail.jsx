// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import { RxCrossCircled } from "react-icons/rx";
// import { BiPaperclip } from "react-icons/bi";
// import { toast } from "react-hot-toast";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Swal from "sweetalert2";
// import "../../styles/SendEmail.css";

// const SendEmail = () => {
//   const navigate = useNavigate();

//   function gotoDashboard() {
//     navigate("/dashboard");
//   }

//   const [formData, setFormData] = useState({
//     subject: "",
//     body: "",
//     to:"",
//     cc:"",
//     file: null, // Modified to match backend parameter name
//   });
//   const [emails,setEmails]=useState([])
//   const fetchEmails=async ()=>{
//     await axios.get("http://localhost:8091/getemails")
//     .then((response)=>{
//       if(response.data.length!==0){
//         setEmails(response.data);
//       }
//     })
//   }
//   useEffect(() => {
//     fetchEmails();
//   }, [])
  
//   function onChangeData(e) {
//     setFormData((prevData) => ({
//       ...prevData,
//       [e.target.name]: e.target.value,
//     }));
//   }

//   function onFileChange(e) {
//     const file = e.target.files[0];
//     setFormData((prevData) => ({
//       ...prevData,
//       file: file,
//     }));
//   }

//    const sendEmailHandler=async(e)=> {
//     e.preventDefault();

//     const { subject, body, file} = formData;
//         console.log(formData.to)
//         const formDataToSend = new FormData();
//         formDataToSend.append("subject", subject);
//         formDataToSend.append("body", body);
//         formDataToSend.append("file", file);
//         formDataToSend.append("to",emails);
//         formDataToSend.append("cc","crmsendfrom@google.com")
//         console.log(formDataToSend);
//         try {
//           await axios.post("http://localhost:8091/send", formDataToSend);
//           toast.success('Emails has been sent successfully!📨', {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "dark",
//             });
//           // navigate("/dashboard");
//           setTimeout(() => {
//             window.location.href = '/dashboard';
//           }, 3000);
//         } catch (error) {
//           console.error("Failed to send email:", error);
//           Swal.fire(
//             'Failed to send mails',
//             'warning'
//           )
//         }
//       // })
//     }


//   return (
//     <div className="send-email-main">
//       <div className="page-header">
//         <h2>Send a New Email</h2>
//         <Link to="/dashboard" className="close-btn">
//           <RxCrossCircled fontSize="2rem" />
//         </Link>
//       </div>
//       <form className="customer-form" onSubmit={sendEmailHandler}>
//         <ToastContainer/>
//         <div className="form-field">
//           <label htmlFor="subject">Subject</label>
//           <input
//             type="text"
//             id="subject"
//             name="subject"
//             value={formData.subject}
//             onChange={onChangeData}
//             required
//           />
//           <label htmlFor="bodyContent">Body</label>
//           <textarea
//             type="text"
//             id="body"
//             name="body"
//             value={formData.body}
//             onChange={onChangeData}
//             rows={8}
//             required
//           ></textarea>
//           <div className="uploading-files">
//             <input
//               type="file"
//               id="fileInput"
//               onChange={onFileChange}
//               style={{ display: "flex" }}
//             />
//           </div>
//         </div>
//         <div className="action-btns">
//           <button onClick={gotoDashboard} className="cancel">
//             Cancel
//           </button>
//           <button type="submit" className="add">
//             Send Email
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default SendEmail;



import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { RxCrossCircled } from "react-icons/rx";

import "../../styles/SendEmail.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Swal from "sweetalert2";

const SendEmail = () => {
  const navigate = useNavigate();

  function gotoDashboard() {
    navigate("/dashboard");
  }

  const [formData, setFormData] = useState({
    subject: "",
    body: "",
    to: "",
    cc: "",
    files: [], // Modified to store an array of selected files
  });

  const [emails, setEmails] = useState([]);

  const fetchEmails = async () => {
    await axios
      .get("http://localhost:8091/getemails")
      .then((response) => {
        if (response.data.length !== 0) {
          setEmails(response.data);
        }
      });
  };

  useEffect(() => {
    fetchEmails();
  }, []);

  function onChangeData(e) {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  }

  function onFileChange(e) {
    const filesArray = Array.from(e.target.files); // Convert FileList to an array
    setFormData((prevData) => ({
      ...prevData,
      files: filesArray,
    }));
  }


  function removeFile(index) {
    const filesArray = [...formData.files];
    filesArray.splice(index, 1);
    setFormData((prevData) => ({
      ...prevData,
      files: filesArray,
    }));
  }

  async function sendEmailHandler(e) {
    e.preventDefault();

    const { subject, body, files } = formData;

    const formDataToSend = new FormData();
    formDataToSend.append("subject", subject);
    formDataToSend.append("body", body);

    files.forEach((file) => {
      formDataToSend.append("file", file);
    });

    formDataToSend.append("to", emails);
    formDataToSend.append("cc", "crmsendfrom@google.com");

    try {
      await axios.post("http://localhost:8091/send", formDataToSend);
    //   toast.success("Email sent successfully!", { position: "left" });
    //   alert("emails sent successfully");
    //   navigate("/dashboard");
    // } catch (error) {
    //   console.error("Failed to send email:", error);
    //   toast.error("Failed to send email.", { position: "left" });
    // }
    toast.success('Emails has been sent successfully!📨', {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                  });
                // navigate("/dashboard");
                setTimeout(() => {
                  window.location.href = '/dashboard';
                }, 2500);
              } catch (error) {
                console.error("Failed to send email:", error);
                Swal.fire(
                  'Failed to send mails',
                  'warning'
                )
              }
  }

  return (
    <div className="send-email-main">
      <div className="page-header">
        <h2>Send a New Email</h2>
        <Link to="/dashboard" className="close-btn">
          <RxCrossCircled fontSize="2rem" />
        </Link>
      </div>
      <form className="customer-form" onSubmit={sendEmailHandler}>
        <ToastContainer/>
        <div className="form-field">
          <label htmlFor="subject">Subject</label>
          <input
            type="text"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={onChangeData}
            required
          />
          <label htmlFor="bodyContent">Body</label>
          <textarea
            type="text"
            id="body"
            name="body"
            value={formData.body}
            onChange={onChangeData}
            rows={8}
            required
          ></textarea>
          <div className="uploading-files">
          <label className="choose-files-btn" htmlFor="fileInput">
            Choose Files
          </label>
          <input
            type="file"
            id="fileInput"
            multiple // Allow selecting multiple files
            onChange={onFileChange}
            style={{ display: "none" }}
          />
            <div className="file-list">
              {formData.files.map((file, index) => (
                <div className="file-item" key={index}>
                  <span>{file.name}</span>
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => removeFile(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="action-btns">
          <button onClick={gotoDashboard} className="cancel" >
            Cancel
          </button>
          <button type="submit" className="add">
            Send Email
          </button>
        </div>
      </form>
    </div>
  );
};

export default SendEmail;