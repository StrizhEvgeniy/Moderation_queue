import CardTitle from "../CardTitle/CardTitle";
import CardText from "../CardText/CardText";
import Style from "./style.module.css";
import CardImages from "../CardImages/CardImages";
import PropTypes from "prop-types";

export default function CardContent({
  bulletinSubject,
  bulletinText,
  bulletinImagees,
}) {
  return (
    <div className={Style.content}>
      <CardTitle bulletinSubject={bulletinSubject} />
      <div className={Style.flexContainer}>
        <CardText bulletinText={bulletinText} />
        <div className={Style.vertical_line}></div>
        <CardImages bulletinImagees={bulletinImagees} />
      </div>
    </div>
  );
}

CardContent.propTypes = {
  bulletinSubject: PropTypes.string,
  bulletinText: PropTypes.string,
  bulletinImagees: PropTypes.array,
};
