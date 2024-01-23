import Button from "../../UI/Button/Button";
import FormBookSit from "../FormBookSit/FormBookSit";
import classes from "./Cinema.module.css";
import logo from "../../assests/dubai.png";

export default function Cinema({
  cinema,
  onClickBookSit,
  selectedCinema,
  onBooked,
  showButton,
}) {
  // const artise = cinema.artise.split(' ').join(', ');
  const isSelected = selectedCinema === cinema.id;

  return (
    <li className={classes.list}>
      <div className={classes.cinema}>
        <div className={classes.details}>
          <img src={cinema.image} alt={cinema.title} />

          <div>
            <h4 className={isSelected ? classes.selectTextColor : null}>
              <span>Title: </span>
              <span>{cinema.title}</span>
            </h4>
            {/* <p>
              <span>Artise:</span>
              <span>{artise}</span>
            </p> */}
          </div>
        </div>

        <div className={classes.date}>
          <h3 className={isSelected ? classes.selectTextColor : null}>Date:</h3>
          <h4>{cinema.date}</h4>
        </div>
      </div>

      {isSelected && (
        <FormBookSit
          cinema={cinema}
          onBooked={onBooked}
          onClickBookSit={onClickBookSit}
        />
      )}

      {showButton && (
        <div className={classes["control-action"]}>
          <Button
            title={isSelected ? "Cancel" : "Book sit"}
            className={isSelected ? classes.isSelected : null}
            button={{
              type: "button",
              onClick: () => onClickBookSit(cinema.id),
            }}
          />
        </div>
      )}
    </li>
  );
}
