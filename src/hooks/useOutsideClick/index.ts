import { useEffect, useRef } from 'react';

const useOutsideClick = <T extends HTMLElement> (onClick = () => {}) => {
  const ref = useRef<T | null>(null);

  const handleClick = (e: MouseEvent) => {
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      onClick();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  });

  return ref;
};

export default useOutsideClick;
