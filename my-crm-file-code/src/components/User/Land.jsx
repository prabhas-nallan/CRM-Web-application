// import React from 'react'
// import { useNavigate } from 'react-router-dom';
// import './landpage.css';
// import logoImage from '../../assets/logoCRM.png';

// function Land() {

//   const navigate = useNavigate();

//   const handleLogin = () =>{
    
//     return navigate('/login');
//   }


//   return (
//     <div>
//         <div className='landing-page'>
//             <nav className='navbar'>
//                 <div className='logo'>
//                     <img src={logoImage} alt='Crm'/>
//                     </div>
//                 <div className='nav-links'>
//                 <button onClick={handleLogin}>Log in</button>
//                 </div>
//             </nav>
            
//         </div>
//     </div>
   
//   )
// }

// export default Land

import React from 'react';
import { useNavigate } from 'react-router-dom';
import './landpage.css';
import logoImage from '../../assets/logoCRM.png';

function Land() {
  const navigate = useNavigate();

  const handleLogin = () =>{
    
    return navigate('/login');
  }
  return (
    <div className='landing-page'>
      <nav className='navbar'>
        <div className='logo'>
          <img src={logoImage} alt='Crm' />
        </div>
        <div className='nav-links'>
          
            <button onClick={handleLogin}>Log in</button>
         
        </div>
      </nav>
      
    </div>
  );
}

export default Land;
