/* eslint-disable @eslint-react/no-children-to-array */
import { Children, memo, useCallback, useEffect, useRef } from 'react';
import useCarousel from './hooks/useCarousel';
import { useGestures } from '@providers/GestureProvider';
import { ChevronLeft, ChevronRight } from '@mui/icons-material';

interface CarouselProps {
  children: React.ReactNode;
}

const Carousel = ({ children }: CarouselProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { onSwipeLeft, onSwipeRight } = useGestures(ref);
  const { next, prev, orderedList } = useCarousel({ items: Children.toArray(children) });

  const handleNext = useCallback(() => {
    next();
  }, [next]);

  const handlePrev = useCallback(() => {
    prev();
  }, [prev]);

  useEffect(() => {
    const unsubscribeLeft = onSwipeLeft(handleNext);
    const unsubscribeRight = onSwipeRight(handlePrev);
    return () => {
      unsubscribeLeft();
      unsubscribeRight();
    };
  }, [handleNext, handlePrev, onSwipeLeft, onSwipeRight]);

  return (
    <div ref={ref} className="overflow-hidden space-x-4 w-full py-4 relative ">
      <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2">
        <div
          className="w-10 h-24 bg-gray-300 rounded-md flex items-center justify-center opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
          onClick={handlePrev}
        >
          <ChevronLeft className="text-black" height={48} />
        </div>
      </div>
      <div className="flex items-center space-x-4 justify-center w-full">
        <div className="flex space-x-4">
          {orderedList.map((child, index) => (
            <div key={index} className="opacity-50 hover:opacity-75 transition-opacity">
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2">
        <div
          className="w-10 h-24 bg-gray-300 rounded-md flex items-center justify-center opacity-50 hover:opacity-75 transition-opacity cursor-pointer"
          onClick={handleNext}
        >
          <ChevronRight className="text-black w-12" height={48} />
        </div>
      </div>
    </div>
  );
};

export default memo(Carousel);
