import classes from "./Demo.module.css";
import { useState } from "react";
import initialPets from "../data/pets";
const PetForm = (props) => {
  const [pets, setPets] = useState(initialPets);

  function generateRandomId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  const addPetHandler = (event) => {
    event.preventDefault();
    const newPet = {
      name: event.target[0].value,
      species: event.target[1].value,
      age: event.target[2].value,
      owner: event.target[3].value,
      id: generateRandomId(),
    };
      setPets( [ ...pets, newPet ] );
      console.log(pets)
  };
  return (
    <div className={classes.PetForm}>
      <form onSubmit={addPetHandler}>
        <fieldset className={classes.fieldset}>Add a new pet</fieldset>
        <input placeholder="name" className={classes.inputElement}></input>
        <input placeholder="species" className={classes.inputElement}></input>
        <input placeholder="age" className={classes.inputElement}></input>
        <input placeholder="owner" className={classes.inputElement}></input>
        <button>Add Pet</button>
      </form>
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
};

export default PetForm;
