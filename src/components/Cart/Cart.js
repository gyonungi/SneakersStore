import { useContext, useState } from "react";
import "./Cart.scss";
import AppContext from "../../context";
import Info from "../Info/Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";

const Cart = ({ onRemove, onCloseCart }) => {
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [orders, setOrders] = useState([]);
  const { cartItems, setCartItems, totalPrice } = useCart();
  const handleClickOrder = async () => {
    try {
      const { data } = await axios.post(
        `https://649404120da866a9536700c1.mockapi.io/orders`,
        cartItems
      );
      setOrders(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch {
      console.log("не удалось создать заказ");
    }
  };
  return (
    <div className="overlay">
      <div className="drawer">
        <h2>
          Корзина
          <img
            onClick={onCloseCart}
            className="cross"
            src="/img/crossSquad.svg"
            alt="cross"
          />
        </h2>
        {cartItems.length > 0 ? (
          <>
            <div className="carts">
              {cartItems.map((item) => (
                <div key={item.id} className="cart">
                  <img className="sneak" src={item?.image} alt="" />
                  <div className="cartInfo">
                    <p>{item?.name}</p>
                    <b>{item?.price} руб.</b>
                  </div>
                  <button className="remove">
                    <img
                      onClick={() => onRemove(item.id)}
                      className="cross"
                      src="/img/cross.svg"
                      alt="cross"
                    />
                  </button>
                </div>
              ))}
            </div>
            <div className="item">
              <ul className="itemInfo">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб. </b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{(totalPrice / 100) * 5} руб. </b>
                </li>
              </ul>
              <button onClick={handleClickOrder}>
                Оформить заказ
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </>
        ) : (
          <Info
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина Пустая"}
            description={
              isOrderComplete
                ? `Ваш заказ #${orders} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."
            }
            image={isOrderComplete ? "/img/offer.jpg" : "/img/cart.jpg"}
          />
          /*   <div className="cartEmpty">
            <img src="/img/cart.jpg" alt="cart" />
            <h2>Корзина пустая</h2>
            <p>Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.</p>
            <button onClick={onCloseCart} className="greenBtn">
              <img src="/img/backarrow.svg" alt="arrow" />
              Вернуться назад
            </button>
          </div> */
        )}
      </div>
    </div>
  );
};

export default Cart;
