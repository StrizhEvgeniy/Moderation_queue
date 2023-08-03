import Style from "./style.module.css";
import PropTypes from "prop-types";

export default function CardUser({ ownerLogin }) {
  return (
    <>
      <a className={Style.userLogin}>{ownerLogin}</a>
    </>
  );
}
CardUser.propTypes = {
  ownerLogin: PropTypes.string,
};
