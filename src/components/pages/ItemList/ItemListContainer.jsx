import { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let refCollection = collection(db, "Productos");

    getDocs(refCollection)
      .then((res) => {
        let newArray = res.docs.map((product) => {
          return { ...product.data(), id: product.id };
        });

        setProducts(newArray);
      })
      .catch((err) => console.log(err));
  }, []);

  console.log(products);

  return (
    <>
      <Typography variant="h4" mb={8}>
        Shop
      </Typography>
      {products.map((product) => (
        <Box
          component={Link}
          to={`/itemDetail/${product.id}`}
          key={product.id}
          mb={2}
        >
          <Typography variant="h6">{product.title}</Typography>
          <Typography>{product.descripcion}</Typography>
          <Typography>${product.unit_price}</Typography>
          <img
            width={"300px"}
            height={"250px"}
            src={product.imagen}
            alt={product.titulo}
          />
        </Box>
      ))}
    </>
  );
};

export default ItemListContainer;
