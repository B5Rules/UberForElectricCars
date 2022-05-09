import { useEffect, useState } from 'react';

const useWindowWidth = () => {
  const [windowW, setWindowW] = useState(window.innerWidth);

  const setWindowWidth = () => {
    setWindowW(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener('resize', setWindowWidth);

    return () => {
      window.removeEventListener('resize', setWindowWidth);
    };
  }, []);

  return windowW;
};

export default useWindowWidth;
