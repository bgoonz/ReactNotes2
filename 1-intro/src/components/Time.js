import { useState, useEffect } from "react";
import { getCurrentDateTime } from "../helpers/date-time";

import classes from "./Demo.module.css";

const Time = () => {
  const [date, setDate] = useState(getCurrentDateTime());
  useEffect(() => {
    setInterval(() => {
      let update = getCurrentDateTime();
      setDate(update);
    }, 1000);
  }, []);
  return (
    <>
      <p className={classes.bold}>
        The current date & time is
        <span className={classes.date}>{date}</span>
      </p>
    </>
  );
};

export default Time;
