import { useEffect, useState } from 'react';

const useScrollPosition = () => {
  const [scrollPostion, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener('scroll', updatePosition);
    updatePosition();
    return () => window.removeEventListener('scroll', updatePosition);
  });

  return scrollPostion;
};

export { useScrollPosition };
