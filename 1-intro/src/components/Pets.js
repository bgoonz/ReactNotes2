import React, { useState } from "react";
import PetForm from "./PetForm";
import classes from "./Demo.module.css";
import initialPets from "../data/pets";
const Pets = (props) => {
  const [pets, setPets] = useState([...initialPets]);

  const handleAddPet = (newPet) => {
    setPets([...pets, newPet]);
  };

  return (
    <div className={classes.petContainer}>
      <h1>Pets</h1>
      {pets.map((pet) => (
        <div className={classes.container} key={pet.id}>
          <h3 className={classes.pet}>Name: {pet.name}</h3>
          <p className={classes.pet}>Species: {pet.species}</p>
          <p className={classes.pet}>Age: {pet.age}</p>
          <p className={classes.pet}>{pet.owner}</p>
        </div>
      ))}
      <PetForm onAddPet={handleAddPet} />
    </div>
  );
};

export default Pets;
