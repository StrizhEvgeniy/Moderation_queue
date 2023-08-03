import PropTypes from "prop-types";
import Style from "./style.module.css";

export default function CardImages({ bulletinImagees }) {
  return (
    <div className={Style.CardImageContainer}>
      {bulletinImagees.slice(0, 2).map((link, i) => (
        <img className={Style.CardImg} src={link} key={i}></img>
      ))}
    </div>
  );
}

CardImages.propTypes = {
  bulletinImagees: PropTypes.array,
};
