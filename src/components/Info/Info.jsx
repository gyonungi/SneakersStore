import { useContext } from "react";
import AppContext from "../../context";

function Info({image, title, description }) {
  const { setIsCart } = useContext(AppContext);
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Корзина
          <img
            onClick={() => setIsCart(false)}
            className="cross"
            src="/img/crossSquad.svg"
            alt="cross"
          />
        </h2>
        <div className="cartEmpty">
          <img src={image} alt="offer" />
          <h2>{title}</h2>
          <p>{description}</p>
          <button onClick={() => setIsCart(false)} className="greenBtn">
            <img src="/img/backarrow.svg" alt="arrow" />
            Вернуться назад
          </button>
        </div>
      </div>
    </div>
  );
}

export default Info;
