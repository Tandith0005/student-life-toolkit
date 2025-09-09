import AnimatedTitles from "../Common/AnimatedTitles";
import { motion } from "framer-motion";
import { useContext } from "react";
import AnimatedCard from "../Common/AnimatedCard";
import { CardsContext } from "../Providers/CardsContext.jsx";

const ExamQuiz = () => {
  const{Cards} = useContext(CardsContext);

  return (
    <div className="p-6">
      {/* Head Text & Sub Head Text */}
      <AnimatedTitles
        title="✨ Exam Q&A Generator ✨"
        subtitle="Practice smarter with quizzes, tailored difficulty and exam-style questions"
      />

      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          {Cards.length === 0 ? (
          <p className="text-center">No streams available.</p>
        ) : (
          <div className="flex flex-wrap justify-evenly my-10">
            {Cards.map((card) => (
              <AnimatedCard key={card._id} card={card} buttonLink={`/examQ&A/${card.stream}`} buttonText={"View Subjects"} />
            ))}
          </div>
        )}
        </div>
      </motion.div>
    </div>
  );
};

export default ExamQuiz;
