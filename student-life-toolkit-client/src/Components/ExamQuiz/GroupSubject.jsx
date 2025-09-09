import React, { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router";
import { CardsContext } from "../../Providers/CardsContext";
import AnimatedCard from "../../Common/AnimatedCard";

const GroupSubject = () => {
  const params = useParams();
  const { Cards } = useContext(CardsContext);
  
  const Subjects =Cards.find((card) => card.stream === params.stream)?.subjects || [];

  return (
    <motion.div
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {Subjects.length === 0 ? (
        <p className="text-center">No subjects available.</p>
      ) : (
        <div className="flex flex-wrap justify-evenly my-10">
          {Subjects.map((card) => (
            <AnimatedCard key={card.title} card={card} buttonLink={`/examQ&A/${params.stream}/${card.title}`} buttonText="Start Quiz"/>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default GroupSubject;
