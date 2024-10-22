import { BrowserRouter } from "react-router-dom";
import AppRouter from "./router/appRouter";
import CartContextComponent from "./components/context/cartContext";

function App() {
  return (
    <>
      <BrowserRouter>
        <CartContextComponent>
          <AppRouter />
        </CartContextComponent>
      </BrowserRouter>
    </>
  );
}

export default App;
