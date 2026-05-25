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
  const childrenArray = Children.toArray(children);
  const { next, prev, orderedList } = useCarousel({ items: childrenArray });
  const showArrows = childrenArray.length > 3;

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
    <div
      ref={ref}
      className={`overflow-hidden space-x-4 w-full py-4 relative group ${showArrows ? 'px-12' : 'px-4'}`}
    >
      {showArrows && (
        <div className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 z-10">
          <button
            type="button"
            aria-label="Previous slide"
            className="w-10 h-24 bg-gray-300 rounded-md flex items-center justify-center opacity-50 hover:opacity-75 transition-opacity cursor-pointer border-none"
            onClick={handlePrev}
          >
            <ChevronLeft className="text-white w-12" height={48} />
          </button>
        </div>
      )}
      <div className="flex items-center space-x-4 justify-center w-full">
        <div className="flex space-x-4">
          {orderedList.map((child, index) => {
            const childKey = (child as React.ReactElement)?.key ?? index;
            return (
              <div
                key={childKey}
                className="opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
              >
                {child}
              </div>
            );
          })}
        </div>
      </div>
      {showArrows && (
        <div className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 z-10">
          <button
            type="button"
            aria-label="Next slide"
            className="w-10 h-24 bg-gray-300 rounded-md flex items-center justify-center opacity-50 hover:opacity-75 transition-opacity cursor-pointer border-none"
            onClick={handleNext}
          >
            <ChevronRight className="text-white w-12" height={48} />
          </button>
        </div>
      )}
    </div>
  );
};

export default memo(Carousel);
