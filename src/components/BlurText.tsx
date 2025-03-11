import React, { useState, useEffect } from 'react';

interface BlurTextProps {
  text: string;
  delay?: number;
  animateBy?: 'characters' | 'words';
  direction?: 'top' | 'bottom' | 'left' | 'right';
  onAnimationComplete?: () => void;
  className?: string;
}

const BlurText: React.FC<BlurTextProps> = ({
  text,
  delay = 100,
  animateBy = 'characters',
  direction = 'bottom',
  onAnimationComplete,
  className = '',
}) => {
  const [elements, setElements] = useState<string[]>([]);
  const [animatedElements, setAnimatedElements] = useState<boolean[]>([]);

  useEffect(() => {
    // Split text based on animation type
    const textElements = animateBy === 'characters' 
      ? text.split('') 
      : text.split(' ');
    
    setElements(textElements);
    setAnimatedElements(new Array(textElements.length).fill(false));
  }, [text, animateBy]);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    // Animate each element with a delay
    animatedElements.forEach((animated, index) => {
      if (!animated) {
        const timeout = setTimeout(() => {
          setAnimatedElements(prev => {
            const newAnimated = [...prev];
            newAnimated[index] = true;
            
            // Check if all elements are animated
            if (newAnimated.every(item => item === true) && onAnimationComplete) {
              onAnimationComplete();
            }
            
            return newAnimated;
          });
        }, delay * index);
        
        timeouts.push(timeout);
      }
    });
    
    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [elements, animatedElements, delay, onAnimationComplete]);

  // Get animation class based on direction
  const getAnimationClass = (animated: boolean) => {
    if (!animated) {
      switch (direction) {
        case 'top':
          return 'blur-text-top';
        case 'bottom':
          return 'blur-text-bottom';
        case 'left':
          return 'blur-text-left';
        case 'right':
          return 'blur-text-right';
        default:
          return 'blur-text-bottom';
      }
    }
    return '';
  };

  return (
    <span className={className}>
      {elements.map((element, index) => (
        <span
          key={index}
          className={`blur-text-element ${getAnimationClass(!animatedElements[index])}`}
          style={{ 
            display: animateBy === 'characters' ? 'inline-block' : 'inline',
            opacity: animatedElements[index] ? 1 : 0,
            transform: animatedElements[index] ? 'translateY(0)' : '',
            transition: `opacity 0.5s ease, transform 0.5s ease`
          }}
        >
          {element}
          {animateBy === 'words' && index < elements.length - 1 ? ' ' : ''}
        </span>
      ))}
    </span>
  );
};

export default BlurText;