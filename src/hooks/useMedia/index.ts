import { useEffect, useState } from 'react';

const useMedia = (media: string): boolean => {
  const [matches, setMatches] = useState(false);

  const handleChangeMedia = (media: MediaQueryList | MediaQueryListEvent) => {
    setMatches(media.matches);
  };

  useEffect(() => {
    const matchMedia = typeof window.matchMedia === 'function' ? window.matchMedia(media) : null;

    if (matchMedia) {
      handleChangeMedia(matchMedia);

      matchMedia.addEventListener('change', handleChangeMedia);

      return () => {
        matchMedia.removeEventListener('change', handleChangeMedia);
      };
    }
  }, []);

  return matches;
};

export default useMedia;
