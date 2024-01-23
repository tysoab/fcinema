import { useState } from "react";
import Button from "../../UI/Button/Button";
import Container from "../../UI/Container/Container";
import classes from "./CheckBooked.module.css";

export default function CheckBooked({ book }) {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [userInput, setUserInput] = useState({
    id: "",
    name: "",
  });

  const isClick = userInput.id !== "" || userInput.name !== "";

  function handleUserInput(identifier, value) {
    if (identifier === "id") {
      setUserInput((input) => ({ ...input, id: value }));
    }
    if (identifier === "name") {
      setUserInput((input) => ({ ...input, name: value }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const data = book.filter(
      (user) =>
        user.name.toLowerCase() === userInput.name.toLocaleLowerCase() &&
        user.id === userInput.id
    );
    if (data.length === 0) {
      setCurrentAccount(null);
      return;
    }

    setCurrentAccount(data[0]);
    setUserInput({
      id: "",
      name: "",
    });
  }

  return (
    <Container className={classes.booked}>
      <h2>Check your ticket Status</h2>
      <p>Enter your ID and your fullname in other to view Ticket</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="id"
          placeholder="Enter ID here..."
          value={userInput.id}
          onChange={(event) => handleUserInput("id", event.target.value)}
        />
        <input
          type="text"
          name="fullname"
          placeholder="Enter Fullname here..."
          value={userInput.name}
          onChange={(event) => handleUserInput("name", event.target.value)}
        />
        <Button title="Check" />
      </form>

      {currentAccount ? (
        <div className={classes.bookedDetails}>
          <h3>Ticket details</h3>
          <h4>
            <span>Ticket:</span>
            <span>{currentAccount.ticket.toUpperCase()}</span>
          </h4>
          <h4>
            <span>Ticket ID:</span>
            <span>{currentAccount.id}</span>
          </h4>
          <h4>
            <span>People:</span>
            <span>{currentAccount.numOfPeople}</span>
          </h4>
          <h4>
            <span>price per sit:</span>
            <span>{currentAccount.price / currentAccount.numOfPeople}</span>
          </h4>
          <h4>
            <span>Name:</span>
            <span>{currentAccount.name}</span>
          </h4>
          <h4>
            <span>Film Name:</span>
            <span>{currentAccount.cinema.title}</span>
          </h4>
          <h4>
            <span>View Date:</span>
            <span>{currentAccount.cinema.date}</span>
          </h4>
          <h4 className="status">
            <span>Ticket status:</span>
            <span>Pending</span>
          </h4>
        </div>
      ) : !isClick ? null : (
        <p>No record found!</p>
      )}
    </Container>
  );
}
