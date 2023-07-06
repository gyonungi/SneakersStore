import { Link } from "react-router-dom";
import Card from "../components/Card/Card";
import "../index.scss"
function Orders() {
  return (
    <div className="content">
      <div className="mainFav">
        <h1>
          <Link to="/">
            <img src="/img/back.svg" alt="" />
          </Link>
          Мои Покупки
        </h1>
      </div>
      {/* <div className="cardCont">
        {items?.map((item, index) => (
          <Card key={index} {...item} favorited={true} />
        ))}
      </div> */}
    </div>
  );
}

export default Orders;
