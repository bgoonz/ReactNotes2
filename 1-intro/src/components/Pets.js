import classes from "./Demo.module.css";
const Pets = (props) => {
  return (
    <div className={classes.petContainer}>
      <h1>Pets</h1>
      {props.pets.map((pet) => {
        return (
          <div className={classes.container} key={pet.id}>
            <h3 className={classes.pet}>Name: {pet.name}</h3>
            <p className={classes.pet}>Species: {pet.species}</p>
            <p className={classes.pet}>Age: {pet.age}</p>
            <p className={classes.pet}>{pet.owner}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Pets;
