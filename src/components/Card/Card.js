import ContentLoader from "react-content-loader";
import "./Card.scss";

import { useState } from "react";
const Card = ({
  id,
  image,
  name,
  price,
  onPlus,
  onFavorite,
  favorited = false,
  added = false,
  loading = false,
}) => {
  const [isAdd, setIsAdd] = useState(added);
  const [isFavorite, setIsFavorite] = useState(favorited);

  const handleFavorite = () => {
    onFavorite({ id, image, name, price });
    setIsFavorite(!isFavorite);
  };
  const handlePlus = () => {
    onPlus({ id, image, name, price });
    setIsAdd(!isAdd);
  };
  return (
    <div className="card">
      {loading ? (
        <ContentLoader
          speed={2}
          width={170}
          height={270}
          viewBox="0 0 170 270"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="94" y="60" rx="0" ry="0" width="2" height="3" />
          <rect x="14" y="8" rx="0" ry="0" width="170" height="91" />
          <rect x="14" y="124" rx="0" ry="0" width="169" height="16" />
          <rect x="15" y="153" rx="0" ry="0" width="93" height="15" />
          <rect x="18" y="196" rx="8" ry="8" width="90" height="24" />
          <rect x="133" y="172" rx="9" ry="9" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className="favorites" onClick={handleFavorite}>
            <img
              src={
                isFavorite === true
                  ? "/img/Ffavorites.svg"
                  : "/img/favorites.svg"
              }
              alt="favorites"
            />
          </div>
          <img className="sneak" src={image} alt="sneakers" />
          <p>{name}</p>
          <div className="card-info">
            <div className="cardPrice">
              <p>Цена:</p>
              <b>{price}</b>
            </div>
            <button className="cardBut" onClick={handlePlus}>
              <img
                className="plus"
                src={isAdd === true ? "/img/check.svg" : "/img/plus.svg"}
                alt="plus"
              />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
