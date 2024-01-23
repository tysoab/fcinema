import classes from './Header.module.css';

export default function Header({onClickLink}){

  return <header className={classes.header}>
    <h1>F-cinema</h1>

    <nav>
      <li onClick={()=> onClickLink('booksit')}>
        Book Now
      </li>
      <li onClick={()=> onClickLink('booked')}>
        Check booked
      </li>
    </nav>
  </header>
};