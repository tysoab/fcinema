import classes from './Container.module.css';

export default function Container({children, className}){

  return <div className={`${classes.container} ${className}`}>
    {children}
  </div>
}