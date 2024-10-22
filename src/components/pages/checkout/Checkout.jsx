import { useContext, useState } from "react";
import axios from "axios";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
import { cartContext } from "../../context/cartContext";
import { Button } from "@mui/material";

const Checkout = () => {
  const { cart } = useContext(cartContext);
  const [preferenceId, setPreferenceId] = useState(null);
  initMercadoPago("APP_USR-264f255c-1659-42f3-85de-cc0272dbdb3e", {
    locale: "es-AR",
  });

  const createPreference = async () => {
    const newArray = cart.map((product) => {
      return {
        title: product.title,
        unit_price: Number(product.unit_price), // Asegúrate de que unit_price sea un número
      quantity: Number(product.quantity) // Asegúrate de que quantity sea un número
      };
    });
    try {
      let response = await axios.post(
        "http://localhost:8080/create_preference",
        {
          items: newArray,
          shipment_cost: 10 /* shipmentCost */,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.log(error);
    }
  };

  const handleBuy = async () => {
    /* let order = {
      cp: userData.cp,
      phone: userData.phone,
      items: cart,
      total: total + shipmentCost ,
      email: user.email,
    };
    localStorage.setItem("order", JSON.stringify(order)); */
    const id = await createPreference();
    if (id) {
      setPreferenceId(id);
    }
  };

  return (
    <>
      <Button onClick={handleBuy}>Seleccione metodo de pago</Button>
      {preferenceId && (
        <Wallet initialization={{ preferenceId, redirectMode: "self" }} />
      )}
    </>
  );
};

export default Checkout;
