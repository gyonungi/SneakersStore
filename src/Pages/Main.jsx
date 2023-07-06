import { useContext } from "react";
import Card from "../components/Card/Card";
import "../index.scss";
import AppContext from "../context";
function Main({ searchValue, handleInput, addCart, addFavorites, isLoading }) {
  const { items, cartItems } = useContext(AppContext);
  const renderItems = () => {
    const filterItems = items?.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (isLoading ? [...Array(12)] : filterItems)?.map((item, index) => (
      <Card
      key={index}
       {...item}
        onFavorite={() => addFavorites(item)}
        onPlus={() => addCart(item)}
        added={cartItems.some((obj) => Number(obj?.id) === Number(item?.id))}
        loading={isLoading}
      />
    ));
  };
  return (
    <div className="content">
      <div className="main">
        <h1>
          {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}
        </h1>
        <div className="search">
          <img src="/img/search.svg" alt="" />
          <input
            type="text"
            placeholder="Поиск..."
            value={searchValue}
            onChange={(e) => handleInput(e)}
          />
        </div>
      </div>
      <div className="cardCont">{renderItems()}</div>
    </div>
  );
}

export default Main;
