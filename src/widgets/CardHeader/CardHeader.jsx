import Style from "./style.module.css";
import CardDate from "../CardDate/CardDate";
import CardUser from "../CardUser/CardUser";
import PropTypes from "prop-types";

export default function CardHeader({
  id,
  publishDate,
  publishDateString,
  ownerId,
  ownerLogin,
}) {
  return (
    <>
      <div className={Style.CardHeaderContainer}>
        <CardDate
          id={id}
          publishDate={publishDate}
          publishDateString={publishDateString}
        />
        <CardUser ownerId={ownerId} ownerLogin={ownerLogin} />
      </div>
      <hr className={Style.hrHeader} />
    </>
  );
}

CardHeader.propTypes = {
  id: PropTypes.number,
  publishDate: PropTypes.number,
  publishDateString: PropTypes.string,
  ownerId: PropTypes.number,
  ownerLogin: PropTypes.string,
};
