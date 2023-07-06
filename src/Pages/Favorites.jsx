import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import "../index.scss";
import { useContext } from "react";
import AppContext from "../context";

function Favorites({ addFavorites, addCart }) {
  const { favorites } = useContext(AppContext);
  return (
    <div className="content">
      <div className="mainFav">
        <h1>
          <Link to="/">
            <img src="/img/back.svg" alt="" />
          </Link>
          Мои Закладки
        </h1>
      </div>
      <div className="cardCont">
        {favorites?.map((item, index) => (
          <Card
            key={index}
            {...item}
            onFavorite={addFavorites}
            onPlus={() => addCart(item)}
            favorited={true}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
