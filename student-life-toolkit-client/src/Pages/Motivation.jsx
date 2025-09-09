import React, { useEffect, useState } from "react";
import AnimatedTitles from "../Common/AnimatedTitles";
import Axios from "../Axios/Axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const Motivation = () => {
  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await Axios.get("/quotes/random");
        const quotesData = response.data;
        setRandomQuote(quotesData[0]);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch motivational quotes. Try again later.");
      }
    };
    fetchQuotes();
  }, []);

  const handleClick = () => {
    const fetchQuotes = async () => {
      try {
        const response = await Axios.get("/quotes/random");
        const quotesData = response.data;
        setRandomQuote(quotesData[0]);
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch motivational quotes. Try again later.");
      }
    };
    fetchQuotes();
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <AnimatedTitles
        title="✨ Motivation ✨"
        subtitle="Get motivated by motivational quotes."
      />

      {randomQuote && (
        <div className="flex flex-col border-2 border-dotted border-[#f43f5e] rounded-lg p-4 items-center mt-18 m-10 h-[400px]">
          <motion.div
            key={randomQuote.content}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-600 md:text-4xl lg:text-5xl text-2xl md:mt-10 mt-10 font-semibold text-center">
              {randomQuote.content}
            </p>
          </motion.div>
          <motion.div
            key={randomQuote.author}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="italic text-[#f43f5e] font-semibold flex justify-center text-center">
              <p className="text-[#ab54f3] md:mt-15 mt-10 font-semibold md:text-2xl text-[20px] text-center italic">
                - {randomQuote.author}
              </p>
            </div>
          </motion.div>

          <button
            onClick={handleClick}
            className="btn bg-green-400 mt-auto mb-10 text-[#F5FEFD] border-transparent hover:bg-green-600 transition duration-300 ease-in-out"
          >
            New Quote
          </button>
        </div>
      )}
    </div>
  );
};

export default Motivation;
