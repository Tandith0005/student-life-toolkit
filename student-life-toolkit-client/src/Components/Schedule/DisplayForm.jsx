import React from 'react';

const DisplayForm = ({ classes, handleDelete}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {classes.map((cls, index) => (
          
          <div
          key={index}
          className="p-4 text-[#F8F8FF] border-transparent rounded"
          style={{ backgroundColor: cls.color }}
          >
            <p className='text-center text-[30px]'>
              <strong>{cls.stream}</strong> 
            </p>
            <hr className='mb-5'/>
            <p>
              <strong>Subject:</strong> {cls.subject}
            </p>
            <p>
              <strong>Time:</strong> {cls.time}
            </p>
            <p>
              <strong>Day:</strong> {cls.day}
            </p>
            <p>
              <strong>Instructor:</strong> {cls.instructor}
            </p>
            <button
            onClick={() => handleDelete(cls._id)}
              className="mt-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 cursor-pointer"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    );
};

export default DisplayForm;