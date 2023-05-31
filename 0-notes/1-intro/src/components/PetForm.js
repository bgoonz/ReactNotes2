import React, { useState } from "react";
import classes from "./Demo.module.css";

const PetForm = (props) => {
  const [name, setName] = useState("");
  const [species, setSpecies] = useState("");
  const [age, setAge] = useState("");
  const [owner, setOwner] = useState("");

  function generateRandomId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  const addPetHandler = (event) => {
    event.preventDefault();
    const newPet = {
      name,
      species,
      age,
      owner,
      id: generateRandomId(),
    };
    props.onAddPet(newPet);
    setName("");
    setSpecies("");
    setAge("");
    setOwner("");
  };

  return (
    <div className={classes.PetForm}>
      <form onSubmit={addPetHandler}>
        <fieldset className={classes.fieldset}>Add a new pet</fieldset>
        <input
          placeholder="name"
          className={classes.inputElement}
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          placeholder="species"
          className={classes.inputElement}
          value={species}
          onChange={(event) => setSpecies(event.target.value)}
        />
        <input
          placeholder="age"
          className={classes.inputElement}
          value={age}
          onChange={(event) => setAge(event.target.value)}
        />
        <input
          placeholder="owner"
          className={classes.inputElement}
          value={owner}
          onChange={(event) => setOwner(event.target.value)}
        />
        <button type="submit">Add Pet</button>
      </form>
      <br></br>
    </div>
  );
};

export default PetForm;
