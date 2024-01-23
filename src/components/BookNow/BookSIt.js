import { useState } from "react";
import Container from "../../UI/Container/Container";
import FormSearch from "../FormSearch/FormSearch";
import classes from './Booksit.module.css';
import Cinema from "./Cinema";

export default function BookSit({cinemas, onClickBookSit, selectedCinema, onBooked}){

  const [searchTerm, setSearchTerm] = useState(null);
  const filteredCinema = searchTerm ? cinemas.slice().filter(cinema => 
    cinema.title.toLowerCase().includes(searchTerm.toLowerCase())) : cinemas;

  function handleSearchTerm(searchTerm){
    setSearchTerm(searchTerm);
  }

  return <Container className={classes['book-sit']}>

    <FormSearch onSearch={handleSearchTerm} />

    <h2>Coming cinema:</h2>

    <ul>
      {filteredCinema.length > 0 ?
        filteredCinema.map(cinema => (
          <Cinema cinema={cinema}
          showButton={true}
          selectedCinema={selectedCinema}
          onClickBookSit={onClickBookSit}
          onBooked={onBooked}
          key={cinema.id} />
        ))
        : <p>Result not found, try again</p>
      }
    </ul>
  </Container>
}