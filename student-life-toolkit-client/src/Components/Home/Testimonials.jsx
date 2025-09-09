import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Testimonials = () => {
  // Testimonial data
  const testimonials = [
    {
      quote: "This app keeps me organized and motivated!",
      author: "Jane, Sophomore",
    },
    {
      quote: "The budget tracker saved me from overspending.",
      author: "Alex, Junior",
    },
    {
      quote: "The Study Buddy feature is a game-changer!",
      author: "Sam, Freshman",
    },
    {
      quote: "Scheduling classes has never been easier!",
      author: "Emily, Senior",
    },
    {
      quote: "The exam prep tools boosted my grades!",
      author: "Michael, Sophomore",
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];


  const controls = useAnimation();
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  // Start animation when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      {
        root: null, 
        threshold: 0.1, // Trigger when 10%  visible
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible]);

  useEffect(() => {
    if (isVisible && containerRef.current) {
      const containerWidth = containerRef.current.scrollWidth / 2;
      const duration = containerWidth / 50;

      controls.start({
        x: -containerWidth,
        transition: {
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: duration,
            ease: "linear",
          },
        },
      });
    }
  }, [isVisible, controls]);

  return (
    <div className="bg-gray-200 py-16 min-h-[500px]">
      <section className="text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-25"><span className="text-rose-500">-----</span> What Student's Say <span className="text-rose-500">-----</span></h2>
        <div className="overflow-hidden">
          <motion.div
            ref={containerRef}
            className="flex gap-8 px-4 md:px-8"
            animate={controls}
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <motion.div
                key={`${testimonial.author}-${index}`}
                variants={cardVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
                custom={index % testimonials.length}
                className="bg-white p-6 rounded-lg shadow-lg min-w-[280px] group hover:shadow-xl transition-shadow duration-300"
              >
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                <p className="mt-4 font-semibold">{testimonial.author}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;