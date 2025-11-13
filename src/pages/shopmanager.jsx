import React  from "react"
import { useContext } from "react"
import { useNavigate } from "react-router-dom"
import  {CarritoContext} from "../contexts/carritoContext"

function Shomanager(){
    const {carrito , handleBorrar,total} = useContext(CarritoContext)
     const navigate = useNavigate()
    return(
         <div className="shopmanager glass-container">
          <button onClick={() => navigate("/dashboard")} style={{marginTop: "20px", padding: "10px 15px", background: "#007bff", color: "#ffffff", border: "none", borderRadius: "5px", cursor: "pointer"}}>
                Volver al Dashboard
          </button>
             <div className="cart-summary">
               <p className="cart-count">Carrito: {carrito.length} productos</p>
               <p className="cart-total">Total: ${total}</p>
            </div>

    <section>
      {carrito.map(item => (
        <div key={item.Id} className="cart-item">
          <p>{item.nombre}</p>
          <p>{item.Precio}</p>
          <button onClick={()=>handleBorrar(item)}>X</button>
        </div>
      ))}
    </section>
  </div>
    )
}
export default Shomanager