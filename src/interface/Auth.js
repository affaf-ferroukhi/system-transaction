import React, { useState } from 'react';
import './Auth.css';
import logo from '../assets/cpa-logo1.png';
import backg from '../assets/123.jpg';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBIcon,
  MDBRow,
  MDBCol,
  MDBCheckbox,
  MDBAlert
}
from 'mdb-react-ui-kit';

function Auth() {
  /*const [user= {
    username: "agent",
    role: "agent",
    token: "exampleToken123",
  }, setUser] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();*/

  /*const handleLogin = (e) => {
    e.preventDefault();
    // Remplacez par une logique d'authentification avec une API
    console.log('User:', user);
    console.log('Password:', password);
  };*/

  /*const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user, password }),
    });
    const data = await response.json();
    console.log(data);
  };*/

  

/*app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});*/


  /*const handleLogin = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:3000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user, password }),
    });
    const data = await response.json();
    localStorage.setItem("user", JSON.stringify(user));
  
    if (user.role === "agent" && password === "password") {
      console.log("Connexion réussie !");
      navigate("/AgentSession");
    } else {
      navigate("/dashboard");
    }
    };*/

    /*const handleLogin = (role) => {
      localStorage.setItem("auth", "true");
      localStorage.setItem("role", role); // Stocker le rôle
      if (role === "admin") {
        navigate("/dashboard");
      } else if (role === "agent") {
        navigate("/AgentSession");
      }*/

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        setSuccess('');

        try {
            const response = await axios.post("http://localhost:3000/api/auth/login", {
                username,
                password,
            });

            const { role, token } = response.data;

            localStorage.setItem("auth", "true");
            localStorage.setItem("role", role);
            localStorage.setItem("token", token);

            if (role === "Agent") {
                navigate("/agentsession");
                setSuccess('Connexion réussie !');
            } else if (role === "Admin") {
                navigate("/admin");
                setSuccess('Connexion réussie !');
            } else if (role === "TCC") {
                navigate("/dashboard");
                setSuccess('Connexion réussie !');
            } else {
                setError("Rôle inconnu");
            }
        } catch (err) {
            console.error(err);
            setError("Erreur de connexion");
        }
      
     
        console.log("Bouton Login cliqué !");
    };
  
  /*return (
    <div className="auth-container">
      <div className="card p-4" style={{ width: '400px' }}>
      <div className="text-center">
         <img src={logo} alt="Logo" style={{ width: '200px' }} />
        </div>
        
        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label htmlFor="user" className="form-label"> User </label>
            <input
              type="user"
              className="form-control"
              id="user"
              placeholder="Enter user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" variant="contained" className="btn btn-primary w-100">Login</button>
        </form>
        
      </div>
    </div>
  );*/
  return (
    <MDBContainer fluid className='my-5'>
      <MDBRow className='g-0 align-items-center'>
        <MDBCol col='6'>

          <MDBCard className='my-5 cascading-right' style={{background: 'hsla(0, 0%, 100%, 0.55)',  backdropFilter: 'blur(30px)'}}>
            <MDBCardBody className='p-5 shadow-5 text-center'   >

            <img src={logo} alt="Logo" style={{ width: '300px' }} /> 
                 <h6></h6>
                 {error && 
                 <div className="alert alert-danger mb-4" role="alert">{error}
                 </div>}
                 {success && 
                 <div className="alert alert-success mb-4" role="alert">{success}
                 </div>}
                 <form onSubmit={handleLogin}>

              <MDBInput wrapperClass='mb-3' id='user' type='user' value={username}  placeholder="Enter Username "  onChange={(e) => setUsername(e.target.value)}
              required/>
              
              <MDBInput wrapperClass='mb-3' id='password' type='password' value={password}  placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)}
              required/>

              <MDBBtn  className="mb-4 w-100"  type="submit" variant="contained" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
              </MDBBtn>
              </form>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>

        <MDBCol col='6'>
          <img src={backg} class="w-100 rounded-4 shadow-4"
            alt="Background" fluid  style={{ height: '100%', objectFit: 'cover' }}/>
        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default Auth;
