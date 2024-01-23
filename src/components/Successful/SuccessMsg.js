import { useEffect } from "react";
import Overlay from "../../UI/Overlay/Overlay";
import classes from "./SuccessMsg.module.css";
import { useState } from "react";
import Button from "../../UI/Button/Button";
import { cinemaDate } from "../../util/formatDate";

export default function SuccessMsg({ message, onBooked, onClickBookSit }) {
  const [content, setContent] = useState(null);

  useEffect(() => {
    setContent(<p>Submitting...</p>);
    let timeoutId;
    timeoutId = setTimeout(() => {
      setContent(<p>Successful</p>);

      setTimeout(() => {
        setContent(
          <>
            <div className={classes.bookedDetails}>
              <h3>Booked details</h3>
              <h4>
                <span>Ticket:</span>
                <span>{message.ticket.toUpperCase()}</span>
              </h4>
              <h4>
                <span>Ticket ID:</span>
                <span>{message.id}</span>
              </h4>
              <h4>
                <span>Peope:</span>
                <span>{message.numOfPeople}</span>
              </h4>
              <h4>
                <span>price per sit:</span>
                <span>{message.price / message.numOfPeople}</span>
              </h4>
              <h4>
                <span>Name:</span>
                <span>{message.name}</span>
              </h4>
              <h4>
                <span>Film Name:</span>
                <span>{message.cinema.title}</span>
              </h4>
              <h4>
                <span>View Date:</span>
                <span>{message.cinema.date}</span>
              </h4>
            </div>

            <div>
              <h4>
                You're to pay a sum of #{message.price} to the Account below on
                or before {cinemaDate(3)}
              </h4>
              <h4>
                Failure to do so, your ticket will be canceled automatically!
              </h4>
              <div className={classes.bankDetails}>
                <span>Wema Bank</span>
                <h5>3029837654</h5>
                <p>Fcinema</p>
                <p>Use your ticket ID to fill transaction details</p>
              </div>
            </div>

            <div className={classes.actions}>
              <Button
                title="Close"
                button={{
                  type: "button",
                  onClick: () => onClickBookSit(message.cinema.id),
                }}
              />
            </div>
          </>
        );

        onBooked(message);
      }, 2500);
    }, 2000);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [message]);

  return (
    <Overlay>
      <div className={classes.successMsg}>{content}</div>
    </Overlay>
  );
}
