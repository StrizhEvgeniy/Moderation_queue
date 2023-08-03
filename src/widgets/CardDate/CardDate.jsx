import Style from "./style.module.css";
import PropTypes from "prop-types";

export default function CardDate({ id, publishDateString }) {
  return (
    <div>
      <a className={Style.postId}>{id}</a>
      <span className={Style.linethrow}> — </span>
      <span className={Style.postDate}>{publishDateString}</span>
    </div>
  );
}

CardDate.propTypes = {
  id: PropTypes.number,
  publishDateString: PropTypes.string,
};
