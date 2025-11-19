import { createContext, useEffect, useState } from "react";
import { RouterProvider } from "react-router-dom";

const CarritoContext = createContext()

function CarritoProvider({children}){
     

     const [carrito,setCarrito] = useState(()=>{
       const guardar = JSON.parse(localStorage.getItem("carrito"))
       return guardar || []
     })

     useEffect(()=>{
    localStorage.setItem("carrito",JSON.stringify(carrito))
   },[carrito])
   
   

      function agregarProducto(producto){
     const nuevosProductos = ([...carrito,producto])
     setCarrito(nuevosProductos)
   }
  function handleBorrar(borrarItem){
     const borrarProducto = carrito.filter(item => item.Id !== borrarItem.Id)
     setCarrito(borrarProducto)
  }
  let total = carrito.reduce((acumulador,item) => acumulador + item.Precio,0)
 
    return(
        <CarritoContext.Provider value={{carrito,agregarProducto,handleBorrar,total}} >
          {children}
        </CarritoContext.Provider>
    )

}
export{ CarritoContext, CarritoProvider}
