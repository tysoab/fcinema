import { useEffect, useState } from "react";
import BookSit from "./components/BookNow/BookSIt";
import Header from "./components/Header/Header";
import { cinemaDate } from "./util/formatDate";
import CheckBooked from "./components/CheckBooked/CheckBooked";

export default function App() {
  const [nav, setNav] = useState("booksit");
  const [selectedCinema, setSelectedCinema] = useState(null);
  const [booked, setBooked] = useState([]);
  const [cinemas, setCinemas] = useState([]);

  useEffect(function () {
    async function fetchCinema() {
      try {
        const response = await fetch(
          "https://www.omdbapi.com/?apikey=e39cb6ca&s=kids"
        );

        if (!response.ok) {
          throw new Error("fetching error");
        }

        const data = await response.json();

        setCinemas((movie) =>
          data.Search.map((cinema) => ({
            id: cinema.imdbID,
            title: cinema.Title,
            image: cinema.Poster,
            date: cinemaDate(Math.floor(Math.random() * 20) + 1),
            releaseDate: cinema.Year,
            type: cinema.Type,
          }))
        );
      } catch (err) {}
    }

    fetchCinema();
  }, []);

  function handleNavLink(nav) {
    setNav(nav);
  }

  function handleSelectedCinema(id) {
    setSelectedCinema((select) => (select === id ? null : id));
  }

  function handleBookCinema(formData) {
    setBooked((booked) => [...booked, formData]);
  }

  return (
    <>
      <Header onClickLink={handleNavLink} />
      {nav === "booked" && <CheckBooked book={booked} />}
      {nav === "booksit" && (
        <BookSit
          key="fcinema"
          cinemas={cinemas}
          selectedCinema={selectedCinema}
          onClickBookSit={handleSelectedCinema}
          onBooked={handleBookCinema}
        />
      )}
    </>
  );
}
