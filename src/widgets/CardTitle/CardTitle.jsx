import Style from "./style.module.css";
import PropTypes from "prop-types";

export default function CardTitle({ bulletinSubject }) {
  return (
    <>
      <p className={Style.title}>{bulletinSubject}</p>
    </>
  );
}
CardTitle.propTypes = {
  bulletinSubject: PropTypes.string,
};
