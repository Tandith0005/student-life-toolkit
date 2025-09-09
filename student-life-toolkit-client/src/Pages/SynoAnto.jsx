import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaChevronUp, FaLightbulb, FaBook, FaBrain, FaPenFancy, FaGamepad } from "react-icons/fa";
import AnimatedTitles from "../Common/AnimatedTitles";

const SynoAnto = () => {
  const [word, setWord] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  const fetchSynonymsAntonyms = async () => {
    if (!word.trim()) {
      toast.error("Please type a word!");
      return;
    }

    try {
      const response = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      if (!response.ok) {
        toast.error("Word not found!");
        setSynonyms([]);
        setAntonyms([]);
        return;
      }

      const data = await response.json();

      let syns = [];
      let ants = [];

      data.forEach((entry) => {
        entry.meanings.forEach((meaning) => {
          meaning.definitions.forEach((def) => {
            if (def.synonyms) syns.push(...def.synonyms);
            if (def.antonyms) ants.push(...def.antonyms);
          });
        });
      });

      setSynonyms([...new Set(syns)]);
      setAntonyms([...new Set(ants)]);
    } catch (err) {
      toast.error("Something went wrong!");
      console.log(err);
    }
  };

  // Accordion data
  const tips = [
    {
      title: "💡 General Tips for Learning",
      icon: <FaLightbulb className="text-yellow-500" />,
      content: [
        "Connect new words with familiar ones (e.g. good → excellent).",
        "Think of synonyms/antonyms as families of words, not isolated terms.",
        "Group words by categories: emotions, actions, qualities, etc."
      ]
    },
    {
      title: "📚 Reading & Context",
      icon: <FaBook className="text-rose-500" />,
      content: [
        "Read novels, articles, and blogs — pay attention to how synonyms are used.",
        "Underline unknown words and immediately look up synonyms & antonyms.",
        "Context builds deeper memory than rote memorization."
      ]
    },
    {
      title: "🧠 Memory Tricks",
      icon: <FaBrain className="text-green-500" />,
      content: [
        "Use flashcards or spaced-repetition apps (like Anki or Quizlet).",
        "Visualize scenarios: imagine 'happy' in a party vs. 'sad' in rain.",
        "Practice the 'link method': connect a synonym to a story in your mind."
      ]
    },
    {
      title: "✍️ Practice & Games",
      icon: <FaGamepad className="text-purple-500" />,
      content: [
        "Play word games (crosswords, Scrabble, word puzzles).",
        "Write small stories replacing common words with synonyms.",
        "Practice conversations: swap simple words with richer synonyms."
      ]
    }
  ];

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-10">
      <AnimatedTitles
        title="Synonyms & Antonyms"
        subtitle="Get synonyms and antonyms of a word"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.7 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Input + Output */}
        <div className="flex md:flex-row flex-col gap-4 md:mt-30 mt-15">
          {/* Input Section */}
          <div className="border-2 border-dotted border-[#f43f5e] w-full md:w-1/2 rounded p-10">
            <h1 className="mb-10 text-4xl text-center">Word</h1>
            <div className="flex gap-2">
              <input
                onChange={(e) => setWord(e.target.value)}
                type="text"
                className="input input-lg w-full"
                placeholder="Type a word here: e.g. enemy, day"
                value={word}
              />
              <button
                onClick={fetchSynonymsAntonyms}
                className="bg-rose-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-rose-600 transition"
              >
                Go
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="border-2 border-dotted border-[#f43f5e] w-full md:w-1/2 rounded p-10">
            <h1 className="mb-6 text-4xl text-center">Synonyms</h1>
            <div className="flex flex-wrap gap-2 items-start">
              {synonyms.length > 0 ? (
                synonyms.map((syn, index) => (
                  <span
                    key={index}
                    className="bg-green-200 px-3 py-1 rounded-full text-sm"
                  >
                    {syn}
                  </span>
                ))
              ) : (
                <span>No synonyms found</span>
              )}
            </div>

            <h1 className="mt-6 mb-4 text-2xl text-center">Antonyms</h1>
            <div className="flex flex-wrap gap-2 items-start">
              {antonyms.length > 0 ? (
                antonyms.map((ant, index) => (
                  <span
                    key={index}
                    className="bg-red-200 px-3 py-1 rounded-full text-sm"
                  >
                    {ant}
                  </span>
                ))
              ) : (
                <span>No antonyms found</span>
              )}
            </div>
          </div>
        </div>

        {/* Multiple Accordions */}
<div className="mt-24">
  <h2 className="md:text-4xl text-3xl font-bold text-center mb-15">
    Tips & Tricks to Master Synonyms & Antonyms
  </h2>
  <div className="space-y-4">
    {tips.map((tip, index) => (
      <div
        key={index}
        className="border border-dotted border-[#f43f5e] rounded-lg overflow-hidden"
      >
        <button
          onClick={() => toggleAccordion(index)}
          className="w-full flex justify-between items-center px-6 py-4 text-left font-semibold text-gray-800 bg-gray-100 hover:bg-gray-200 transition"
        >
          <span className="flex items-center gap-2">
            {tip.icon}
            {tip.title}
          </span>
          {openIndex === index ? (
            <FaChevronUp className="text-gray-600" />
          ) : (
            <FaChevronDown className="text-gray-600" />
          )}
        </button>

        <AnimatePresence>
          {openIndex === index && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="px-6 py-4 bg-white text-gray-700"
            >
              <ul className="list-disc pl-6 space-y-2">
                {tip.content.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    ))}
  </div>
</div>

      </motion.div>
    </div>
  );
};

export default SynoAnto;
