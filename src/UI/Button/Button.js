import classes from './Button.module.css';

export default function Button({title, button, className}){

  return <button {...button} className={`${classes.button} ${className}`}>
    {title}
  </button>
}