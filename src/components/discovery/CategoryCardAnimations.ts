
import { gsap } from 'gsap';

export const setupCardAnimations = (
  cardRef: React.RefObject<HTMLDivElement>,
  iconContainerRef: React.RefObject<HTMLDivElement>
) => {
  if (!cardRef.current || !iconContainerRef.current) return;

  // Initial card animation
  gsap.fromTo(cardRef.current,
    { scale: 0.8, opacity: 0, rotateY: -15 },
    {
      scale: 1,
      opacity: 1,
      rotateY: 0,
      duration: 0.8,
      ease: "back.out(1.7)",
      delay: Math.random() * 0.3
    }
  );

  // Hover animations
  const handleMouseEnter = () => {
    gsap.to(iconContainerRef.current, {
      scale: 1.1,
      rotation: 5,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(cardRef.current, {
      y: -5,
      boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    gsap.to(iconContainerRef.current, {
      scale: 1,
      rotation: 0,
      duration: 0.3,
      ease: "power2.out"
    });
    
    gsap.to(cardRef.current, {
      y: 0,
      boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  const card = cardRef.current;
  card.addEventListener('mouseenter', handleMouseEnter);
  card.addEventListener('mouseleave', handleMouseLeave);

  return () => {
    card.removeEventListener('mouseenter', handleMouseEnter);
    card.removeEventListener('mouseleave', handleMouseLeave);
  };
};

export const setupClickAnimation = (
  cardRef: React.RefObject<HTMLDivElement>,
  iconContainerRef: React.RefObject<HTMLDivElement>,
  onClick: () => void
) => {
  if (!cardRef.current || !iconContainerRef.current) return;

  // Click animation sequence
  const clickTl = gsap.timeline();
  
  clickTl.to(cardRef.current, {
    scale: 0.95,
    duration: 0.1,
    ease: "power2.inOut"
  })
  .to(iconContainerRef.current, {
    scale: 1.3,
    rotation: 360,
    duration: 0.4,
    ease: "back.out(1.7)"
  }, "-=0.1")
  .to(cardRef.current, {
    scale: 1,
    duration: 0.2,
    ease: "back.out(1.7)"
  })
  .to(iconContainerRef.current, {
    scale: 1,
    rotation: 0,
    duration: 0.3,
    ease: "elastic.out(1, 0.3)"
  }, "-=0.1");
  
  setTimeout(onClick, 500);
};
