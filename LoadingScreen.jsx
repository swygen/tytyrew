import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

const LoadingScreen = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/signup'); // 6 সেকেন্ড পর সাইন-আপ পেজে যাবে
    }, 6000); // 6 সেকেন্ড পর সাইন-আপ পেজে রিডাইরেক্ট
  }, [history]);

  return (
    <div>
      {/* লোডিং এনিমেশন */}
      <dotlottie-player
        src="https://lottie.host/450021ff-184d-47b0-b237-f9712c4b5f4c/D2p1qapwAF.lottie"
        background="transparent"
        speed="1"
        loop
        autoplay
        style={{ width: '300px', height: '300px', marginBottom: '20px' }}
      ></dotlottie-player>

      <div className="roulette-spinner">
        <div className="spinner-circle"></div>
        <div className="glow-ring"></div>
      </div>

      <div className="loading-text">B2-WIN Casino...</div>
    </div>
  );
};

export default LoadingScreen;
