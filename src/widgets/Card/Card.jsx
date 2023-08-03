import React, { useState } from "react";
import CardContent from "../CardContent/CardContent";
import CardHeader from "../CardHeader/CardHeader";
import Style from "./style.module.css";
import PropTypes from "prop-types";
import useKeyPress from "../../hooks/useKeyPress";
import { Input } from "antd";

const { TextArea } = Input;

const Card = React.forwardRef(
  ({ bulletin, focusNextBulletin, callback }, ref) => {
    const [decision, setDecision] = useState(null);
    const [cause, setCause] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleChange = (e) => {
      setCause(e.target.value);
      callback(bulletin.id, cause, "cause");
    };
    const handlePressEnter = () => focusNextBulletin();

    const onKeyPress = (event) => {
      switch (event.key) {
        case " ":
          event.preventDefault();
          if (isFocused) {
            setDecision("Approve");
            callback(bulletin.id, "approve", "decision");
            focusNextBulletin();
          }
          break;
        case "Delete":
          event.preventDefault();
          if (isFocused) {
            setDecision("Decline");
            callback(bulletin.id, "decline", "decision");
          }
          break;
        case "Enter":
          if (event.shiftKey) {
            event.preventDefault();
            if (isFocused) {
              setDecision("Escalate");
              callback(bulletin.id, "escalate", "decision");
            }
          }
          break;
        default:
          console.log("i dont know");
      }
    };
    useKeyPress([" ", "Delete", "Enter"], onKeyPress);

    return (
      <button
        className={`${Style.Card} + ${
          decision === "Approve"
            ? Style.approve
            : decision === "Decline"
            ? Style.decline
            : decision === "Escalate"
            ? Style.escalate
            : ""
        }`}
        ref={ref}
        onFocus={handleFocus}
        onBlur={handleBlur}
      >
        <CardHeader
          id={bulletin.id}
          publishDate={bulletin.publishDate}
          publishDateString={bulletin.publishDateString}
          ownerId={bulletin.ownerId}
          ownerLogin={bulletin.ownerLogin}
        />
        <CardContent
          id={bulletin.id}
          bulletinSubject={bulletin.bulletinSubject}
          bulletinText={bulletin.bulletinText}
          bulletinImagees={bulletin.bulletinImagees}
        />
        {decision === "Decline" || decision === "Escalate" ? (
          <TextArea
            onChange={handleChange}
            onPressEnter={handlePressEnter}
            style={{ height: "96%" }}
            className={Style.text__area}
            rows={4}
            placeholder={`Решение ${decision} пожалуйста опишите проблему`}
            autoFocus
          />
        ) : (
          ""
        )}
      </button>
    );
  }
);
Card.displayName = "Card";

Card.propTypes = {
  bulletin: PropTypes.object,
  focusNextBulletin: PropTypes.func,
  callback: PropTypes.func,
};
export default Card;
