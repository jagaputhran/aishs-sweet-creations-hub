import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPScrollAnimationsProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slide' | 'scale' | 'stagger';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  stagger?: number;
}

const GSAPScrollAnimations = ({ 
  children, 
  animation = 'fade',
  direction = 'up',
  delay = 0,
  stagger = 0.1
}: GSAPScrollAnimationsProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    const element = elementRef.current;
    let animationProps: gsap.TweenVars = { opacity: 0 };

    // Set initial state based on animation type
    switch (animation) {
      case 'slide':
        switch (direction) {
          case 'up':
            animationProps.y = 50;
            break;
          case 'down':
            animationProps.y = -50;
            break;
          case 'left':
            animationProps.x = 50;
            break;
          case 'right':
            animationProps.x = -50;
            break;
        }
        break;
      case 'scale':
        animationProps.scale = 0.8;
        break;
      case 'stagger':
        animationProps.y = 30;
        break;
    }

    gsap.set(element, animationProps);

    // Create scroll trigger animation
    const ctx = gsap.context(() => {
      if (animation === 'stagger') {
        // For stagger animation, target children
        const children = element.children;
        gsap.from(children, {
          ...animationProps,
          opacity: 1,
          y: 0,
          scale: 1,
          stagger: stagger,
          duration: 0.8,
          ease: 'power3.out',
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      } else {
        gsap.to(element, {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          delay: delay,
          scrollTrigger: {
            trigger: element,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        });
      }
    }, element);

    return () => ctx.revert();
  }, [animation, direction, delay, stagger]);

  return (
    <div ref={elementRef}>
      {children}
    </div>
  );
};

export default GSAPScrollAnimations;
