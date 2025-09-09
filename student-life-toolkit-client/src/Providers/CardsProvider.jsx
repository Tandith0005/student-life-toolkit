import React, { useEffect, useState } from 'react';
import Axios from '../Axios/Axios';
import { CardsContext } from './CardsContext';

const CardsProvider = ({children}) => {

    const [Cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async ()=>{
      try {
      const response = await Axios.get("/examQ&A");
      setCards(response.data);
    } catch (error) {
      console.log(error);
    };
    }
    fetchCards();
  }, []);

    return (
        <CardsContext.Provider value={{Cards, setCards}}>{children}</CardsContext.Provider>
    );
};

export default CardsProvider;