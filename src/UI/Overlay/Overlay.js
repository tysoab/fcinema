import classes from './Overlay.module.css';

export default function Overlay({children}){

  return <div className={classes.overlay}>
    {children}
  </div>
}