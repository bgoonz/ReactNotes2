import React, { useState, useEffect } from "react";
import PetForm from "./PetForm";
import classes from "./Demo.module.css";
import initialPets from "../data/pets";
const Pets = (props) => {
  const [pets, setPets] = useState([...initialPets]);

  //only run once the first time this component is rendered

  useEffect(() => {
      const petData = localStorage.getItem( "pets" );
      console.log( petData)
    if (petData) {
      setPets(JSON.parse(petData));
    }
  }, []);

  //run every time our pet state changes
  useEffect(() => {
    localStorage.setItem("pets", JSON.stringify(pets));
  }, [pets]);

  const handleAddPet = (newPet) => {
    setPets([...pets, newPet]);
  };

  const handleDelete = (id) => {
    const updatedPets = pets.filter((pet) => pet.id !== id);
    setPets(updatedPets);
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
          <button className={classes.pet} onClick={() => handleDelete(pet.id)}>
            Delete
          </button>
        </div>
      ))}
      <PetForm onAddPet={handleAddPet} />
    </div>
  );
};

export default Pets;
