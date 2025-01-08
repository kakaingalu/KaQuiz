import React, { useState, useEffect, useRef } from 'react';
import './input.css';
import './index.css';





function App() {
  const [timeLeft, setTimeLeft] = useState(30);
  const [isCountdownActive, setIsCountdownActive] = useState(true);


  const videoRef = useRef(null);

useEffect(() => {
  if (videoRef.current) {
    videoRef.current.play().catch(error => {
      console.error('Autoplay failed:', error);
    });
  }
}, []);

  useEffect(() => {
    let interval = null;

    if (isCountdownActive) {
      interval = setInterval(() => {
        if (timeLeft > 0) {
          setTimeLeft(timeLeft - 1);
        } else {
          setIsCountdownActive(false);
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isCountdownActive]);

  const handleCountdownToggle = () => {
    setIsCountdownActive(!isCountdownActive);
  };

  return (
    <div className="bg-[#000000] min-h-screen flex flex-col items-center justify-center">
      <p className="text-2xl font-bold text-white fixed top-0 left-0 mb-4 ml-4">KaQuiz</p>
      <div className="flex flex-row w-full max-w-7xl">

      <div className='h-1/2 p-1'>
      <video loop autoPlay muted playsInline preload="auto" className="w-auto h-auto max-h-100 object-cover">
        <source src="/assets/ComingSoon.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      </div>

        {isCountdownActive ? (
          <div className='h-1/2 pt-2' >
            <p className='text-base text-white max-w-62 mb-4 mt-48'>
              It's not here yet, but we'll let you in on a secret. It's coming really, 
              really soon. So sit tight and check back in on July 31. You just might 
              see something that will blow your socks off!
            </p>

            <p className='text-sm text-white max-w-62 mt-4'>
              Really excited to get in touch with us?
              Send us an email at <a href="mailto:kochellanetwork@gmail.com" className='hover:underline'>kochellanetwork@gmail.com</a>.
            </p>
          </div>
        ) : (
          <div className="h-1/2 p-2">
            <h3 className="text-xl font-bold text-white mb-4">Countdown Complete!</h3>
            <p className='text-lg text-white'>
              Thank you for waiting! We'll see you soon.
            </p>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default App;