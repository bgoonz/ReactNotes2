import classes from "./Demo.module.css";
import Header from "./Header";
import Time from "./Time";
import Small from "./Small";
const Demo = () => {
  return (
    <div>
      <Header />
      <h2 className={classes.special}>Demo Component</h2>
      <Time />
      <Small />
    </div>
  );
};
export default Demo;
