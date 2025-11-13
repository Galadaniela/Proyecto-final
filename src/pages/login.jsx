import React, { use, useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { UserContexts } from "../contexts/useContext";
function Login(){
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");
    const{isLoggedIn,setIsLoggedIn} = useContext(UserContexts)
    const { login } = useContext(UserContexts)

     
    const navigate = useNavigate()
   
    const handelUsername=(e)=>{
       setUsername(e.target.value)
    }

    const handelPassword=(e)=>{
        setPassword(e.target.value)
        
    }
    
   const handleError=(e)=>{
         
   }
    const handelSubmit=(e)=>{
        e.preventDefault()
        if(username === "" || password ===  "" )
            setError("⚠️ Por favor, completá todos los campos.");
            
        // else if(username === "")
        //     setError("⚠️ por favor ,ingrese el nombre de usuario.");
              
        // else if(password === "")
        //     setError("⚠️ Por favor, ingrese contraseña.");
            
        else{
            setError("")
            login({username})
            // setIsLoggedIn(true)
            navigate("/dashboard");
        }     
    }

    return(
        <div className="login glass-container">
            <h1 className="sing-in">Sing In</h1>
    <form onSubmit={handelSubmit}>
      <input type="text" value={username} onChange={handelUsername} placeholder="User Name"/>
      <input type="password" value={password} onChange={handelPassword} placeholder="Password"/>
      <button type="submit">Ingresar</button>
      <p>{error}</p>
    </form>
  </div>
    )
    
}

export default Login