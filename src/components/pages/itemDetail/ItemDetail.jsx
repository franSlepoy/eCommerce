import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { Box, Typography, CircularProgress, Button } from "@mui/material";
import { cartContext } from "../../context/cartContext";

const ItemDetail = () => {
  const { id } = useParams();
  const { addToCart, getQuantityById,} = useContext(cartContext);
  let quantity = getQuantityById(id);

  const [product, setProduct] = useState(null); // Inicializamos con null en lugar de un objeto vacío
  const [loading, setLoading] = useState(true); // Añadimos un estado de loading
  const [counter, setCounter] = useState(quantity || 1);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const refDoc = doc(db, "Productos", id); // Ya no necesitas `collection` aquí, `doc` recibe directamente la referencia
        const res = await getDoc(refDoc);

        if (res.exists()) {
          setProduct({ ...res.data(), id: res.id });
        } else {
          console.log("El producto no existe");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); // Terminamos la carga
      }
    };

    getProduct();
  }, [id]);

  if (loading) {
    return <CircularProgress />; // Muestra un loader mientras el producto está cargando
  }

  if (!product) {
    return <Typography>Producto no encontrado</Typography>; // Muestra un mensaje si no hay producto
  }

  //sumar
  const addOne = () => {
    if (counter < product.stock) {
      setCounter(counter + 1);
    } else {
      alert("stock maximo");
    }
  };
  //restar
  const subOne = () => {
    if (counter > 1) {
      setCounter(counter - 1);
    } else {
      alert("no podes agregar menos de un elemento al carrito");
    }
  };

  //agregar al carrito
  const onAdd = () => {
    {
      let obj = {
        ...product,
        quantity: counter,
      };
      console.log(obj);
      addToCart(obj);
    }
  };

  return (
    <>
      <Box>
        <Typography variant="h4">{product.title}</Typography>
        <Typography variant="body1">{product.descripcion}</Typography>
        <Typography variant="h6">${product.unit_price}</Typography>
        <img width={"400px"} src={product.imagen} alt={product.titulo} />
      </Box>

      {
        quantity && <Typography> ya tienes {quantity} en el carrito</Typography>
      }
      <Box
        sx={{
          display: "flex",

          width: "100%",
          height: "48px",
          gap: "20px",
        }}
      >
        <Button onClick={subOne} variant="contained">
          -
        </Button>
        <Typography variant="h5" color={"primary"}>
          {counter}
        </Typography>
        <Button onClick={addOne} variant="contained">
          +
        </Button>
      </Box>

      <Box mt={2}>
        <Button onClick={onAdd} variant="contained">
          Agregar
          {/*  {initial ? "Modificar" : "Agregar"} */}
        </Button>
      </Box>
    </>
  );
};

export default ItemDetail;
