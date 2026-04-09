import { ReactNode, useCallback, useState } from 'react';

interface UseCarouselProps {
  items: ReactNode[];
}

const useCarousel = ({ items }: UseCarouselProps) => {
  const [current, setCurrent] = useState(0);
  const total = items.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(index % total);
    },
    [total],
  );

  const orderedList = items.slice(current).concat(items.slice(0, current));

  return { current, next, prev, goTo, orderedList };
};

export default useCarousel;
