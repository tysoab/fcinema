import classes from './Input.module.css';

export default function Input({input, title, className}){
  return <div className={`${classes.input} ${className}`}>
        <label>{title}:</label>
        <input {...input} />
      </div>
}