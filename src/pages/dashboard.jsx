import { useContext, useEffect } from "react"
import { UserContexts } from "../contexts/useContext"
import { useNavigate } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { CarritoContext } from "../contexts/carritoContext"

function Dashboard(){

  const { carrito, handleBorrar, agregarProducto, total } = useContext(CarritoContext)
  const { user, isLoggedIn } = useContext(UserContexts) 

  const navigate = useNavigate()

  useEffect(() => {
    if(!isLoggedIn) navigate('/login')
  }, [isLoggedIn, navigate])

 let productos = [
  {Id: uuidv4(), nombre: "Zapatilla", Precio: 5000, imagen: "img/zapatillas.jpg"},
  {Id: uuidv4(), nombre: "Camiseta", Precio: 6000, imagen: "img/camisa.jpg"},
  {Id: uuidv4(), nombre: "Pantalon", Precio: 9000, imagen: "img/jeans.jpg"},
  {Id: uuidv4(), nombre: "Zapatilla N3", Precio: 5000, imagen: "img/zapatillas.jpg"},
  {Id: uuidv4(), nombre: "Camiseta BLUE", Precio: 6000, imagen: "img/camisa.jpg"},
  {Id: uuidv4(), nombre: "Pantalon DOCT", Precio: 9000, imagen: "img/jeans.jpg"}
];
  


  return(
    <div className="dashboard glass-container">
      <h2>Hola, {user?.username || 'invitado'}</h2>

      <div className="cart-summary">
        <p className="cart-count" style={{cursor:"pointer",textDecoration:"underline"}}
           onClick={()=> navigate("/shopmanager")}>
          🛒 {carrito.length} productos
        </p>
        <p className="cart-total">Total: ${total}</p>
      </div>

      <div className="product-list">
        {productos.map(producto => (
          <div key={producto.Id} className="product-item">

            
            <img src={producto.imagen} alt={producto.nombre} className="product-img"/>

            <h2>{producto.nombre}</h2>
            <p>${producto.Precio}</p>

            <button onClick={() => agregarProducto(producto)}>
              🛒 Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Dashboard
