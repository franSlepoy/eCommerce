import { createContext, useState } from "react";

export const cartContext = createContext();

const CartContextComponent = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    let existe = cart.some((e) => e.id === product.id);
    if (existe) {
      // si ya existe, cambiar cantidades de producto
      let newArr = cart.map((elemento) => {
        if (elemento.id === product.id) {
          // lo modifico y lo agrego al nuevo arreglo
          return { ...elemento, quantity: product.quantity };
        } else {
          elemento;
        }
      });
      setCart(newArr);
    } else {
      setCart([...cart, product]);
    }
  };

 const getQuantityById = (id)=> {
   let product = cart.find( (elemento) => elemento.id === id)
   return product?.quantity
 }

 const clearCart = () => {
    setCart([])
 }

 const deleteById = (id) => {
    let newArr = cart.filter((elemento) => elemento.id !== id);
    localStorage.setItem("cart", JSON.stringify(newArr));
    setCart(newArr);
  };

  const getTotalPrice = () => {
    let total = cart.reduce((acc, elemento) => {
      return acc + elemento.unit_price * elemento.quantity;
    }, 0);
    return total;
  };

  let data = {
    cart,
    addToCart,
    getQuantityById,
    clearCart,
    deleteById, 
    getTotalPrice
  };
  return <cartContext.Provider value={data}>{children}</cartContext.Provider>;
};

export default CartContextComponent;
