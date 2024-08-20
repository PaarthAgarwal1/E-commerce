import React, { useContext, useEffect } from 'react';
import { MdDoneOutline, MdOutlineDangerous } from 'react-icons/md';
import { AlertContext } from './App';

function Alert() {
  const { alert, setAlert } = useContext(AlertContext);
  let color = "bg-green-500";
  let Icon = MdDoneOutline;

  useEffect(() => {
    if (alert) {
      const timeout = setTimeout(() => {
        setAlert(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [alert]);

  if (!alert) {
    return null;
  }

  if (alert.type === "error") {
    Icon = MdOutlineDangerous;
    color = "bg-red-500";
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-lg">
      <div className={`flex shadow-lg rounded-lg ${color} text-white h-16`}> 
        <div className={`py-2 px-4 rounded-l-lg flex items-center ${color}`}>
          <Icon className="text-xl" />
        </div>
        <div className="px-4 py-2 bg-white text-black rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
          <div className="text-md">{alert.message}</div>
          <button onClick={() => setAlert(null)} className="text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="fill-current" viewBox="0 0 16 16" width="20" height="20">
              <path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Alert;
