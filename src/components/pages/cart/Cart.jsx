import { Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { cartContext } from "../../context/cartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, clearCart, deleteById, getTotalPrice } =
    useContext(cartContext);
  const total = getTotalPrice();
  return (
    <>
      <Box>
        <Typography>Carrito de compras</Typography>
        {cart.length > 0 && <Link to={"/checkout"}> Finalizar compra </Link>}

        {/* <Button variant="contained" onClick={clearCart}> Limpiar carrito </Button> */}
      </Box>
      <Box>
        {cart.map((product) => {
          return (
            <Box key={product.id}>
              <Typography>{product.title}</Typography>
              <Typography>{product.unit_price}</Typography>
              <Typography>{product.quantity}</Typography>
              <Button
                variant="contained"
                onClick={() => deleteById(product.id)}
              >
                {" "}
                Eliminar{" "}
              </Button>
            </Box>
          );
        })}
      </Box>

      <Box>
        <Typography>Total: {total}</Typography>
      </Box>
    </>
  );
};

export default Cart;
