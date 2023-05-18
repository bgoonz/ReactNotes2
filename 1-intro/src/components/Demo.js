import classes from "./Demo.module.css";
import Header from "./Header";
import Time from "./Time";
import Small from "./Small";
import Pets from "./Pets";
import pets from "../data/pets";
import LikeButton from "./LikeButton";

const Demo = (props) => {
  return (
    <div>
      <Header />
      <div className={classes.center}>
        <LikeButton />
      </div>
      <h2 className={classes.special}>Demo Component</h2>
          <Pets pets={ pets } />
   
      <Time />
      <Small />
    </div>
  );
};
export default Demo;
