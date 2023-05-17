import classes from "./Demo.module.css";
import { useState, useEffect } from "react";
import { getCurrentDateTime } from "../helpers/date-time";
const Demo = () => {
  const [date, setDate] = useState(getCurrentDateTime());
  useEffect(() => {
    setInterval(() => {
      let update = getCurrentDateTime();
      setDate(update);
    }, 1000);
  }, []);
  return (
    <div>
      <h1 className={classes.special}>Hi, I'm a component</h1>
      <p>
        JSX can only have one top level html element... you can use a fragment
        to wrap otherwise adjacent elements
      </p>
      <p className={classes.bold}>
        The current date & time is <span className={classes.date}>{date}</span>
      </p>
      <small>Copyright Bryan Guner</small>
    </div>
  );
};
export default Demo;
