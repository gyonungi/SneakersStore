import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import axios from "axios";
import "./index.scss";
import Cart from "./components/Cart/Cart";
import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Main from "./Pages/Main";
import Favorites from "./Pages/Favorites";
import Orders from "./Pages/Order";
import AppContext from "./context";

function App() {
  const [isCart, setIsCart] = useState(false);
  const [items, setItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [order, setOrders] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const itemsResponce = await axios.get(
        "https://6492991a428c3d2035d05130.mockapi.io/items"
      );
      const cartResponce = await axios.get(
        "https://6492991a428c3d2035d05130.mockapi.io/cart"
      );

      const favoritResponce = await axios.get(
        "https://649404120da866a9536700c1.mockapi.io/favorites"
      );

      setIsLoading(false);
      setItems(itemsResponce.data);
      setCartItems(cartResponce.data);
      setFavorites(favoritResponce.data);
    }
    fetchData();
  }, []);

  const addCart = (obj) => {
    console.log(obj);
    if (cartItems.find((item) => Number(item?.id) === Number(obj?.id))) {
      setCartItems((prev) =>
        prev.filter((item) => Number(item?.id) !== Number(obj?.id))
      );
    } else {
      /* axios.post("https://6492991a428c3d2035d05130.mockapi.io/cart", obj); */
      setCartItems((prev) => [...prev, obj]);
    }
  };
  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };
  const RemoveCart = (id) => {
    axios.delete(`https://6492991a428c3d2035d05130.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const addFavorites = (obj) => {
    try {
      if (favorites.find((obj) => obj.id === obj.id)) {
        axios.delete(
          `https://649404120da866a9536700c1.mockapi.io/favorites/${obj.id}`
        );
        setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
      } else {
        axios.post(
          `https://649404120da866a9536700c1.mockapi.io/favorites`,
          obj
        );
        setFavorites((prev) => [...prev, obj]);
      }
    } catch (error) {
      console.log("Не удалось добавить");
    }
  };
  return (
    <AppContext.Provider
      value={{ items, cartItems, favorites, setIsCart, setCartItems }}
    >
      <div className="wrapper">
        {isCart && (
          <Cart onRemove={RemoveCart} onCloseCart={() => setIsCart(false)} />
        )}
        <Header onClickCart={() => setIsCart(true)} />
        <Routes>
          <Route
            path="/"
            element={
              <Main
                searchValue={searchValue}
                handleInput={handleInput}
                addCart={addCart}
                addFavorites={addFavorites}
                isLoading={isLoading}
              />
            }
          />
          <Route
            path="/favorites"
            element={
              <Favorites addCart={addCart} addFavorites={addFavorites} />
            }
          />
          <Route path="/orders" element={<Orders items={Orders} />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
