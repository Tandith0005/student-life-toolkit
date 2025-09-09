import React from 'react';
import { Link } from 'react-router';

const AnimatedCard = ({card, buttonLink, buttonText}) => {
    return (
        <div
              key={card._id}
              className="card bg-gradient-to-r from-rose-400 via-rose-500 to-rose-600 text-white w-80 md:h-[450px] h-100 m-4 rounded-lg shadow-lg transform transition-transform hover:scale-105"
            >
              <figure className="px-5 pt-6">
                <img
                  src={card.imgSrc}
                  alt={card.title}
                  className="rounded-lg shadow-md h-42 w-full object-cover"
                />
              </figure>
              <div className="card-body text-center flex flex-col">
                <h2 className="card-title text-[30px] justify-center font-bold">
                  {card.title}
                </h2>
                <p className="text-sm">{card.desc}</p>

                <div className="card-actions justify-center mt-4">
                  <Link to={buttonLink}>
                    <button className="btn btn-outline btn-light">
                    {buttonText}
                  </button>
                  </Link>
                </div>
              </div>
            </div>
    );
};

export default AnimatedCard;