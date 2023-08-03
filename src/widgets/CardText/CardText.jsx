import Style from "./style.module.css";
import PropTypes from "prop-types";

export default function CardText({ bulletinText }) {
  return (
    <>
      <div className={Style.text}>
        {bulletinText.split("\n").map((str, i) => (
          <p key={i}>{str}</p>
        ))}
      </div>
    </>
  );
}

CardText.propTypes = {
  bulletinText: PropTypes.string,
};
