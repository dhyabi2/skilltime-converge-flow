
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MarketingIconProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const MarketingIcon: React.FC<MarketingIconProps> = ({ containerRef }) => {
  useEffect(() => {
    if (containerRef.current) {
      const paths = containerRef.current?.querySelectorAll('.icon-path-1');
      const circles = containerRef.current?.querySelectorAll('.icon-circle-1, .icon-circle-2, .icon-circle-3');

      const tl = gsap.timeline({ delay: 0.5 });

      if (paths) {
        tl.to(paths, {
          drawSVG: "100%",
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.2
        });
      }

      if (circles) {
        tl.to(circles, {
          scale: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
          stagger: 0.1
        }, "-=0.4");
      }
    }
  }, [containerRef]);

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-mint-500">
      <defs>
        <linearGradient id="marketingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14b8a6" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M5 30 L15 20 L25 25 L35 10"
        fill="none"
        stroke="url(#marketingGradient)"
        strokeWidth="3"
        className="icon-path-1"
      />
      <circle
        ref={el => el && gsap.set(el, { scale: 0 })}
        cx="15"
        cy="20"
        r="3"
        fill="url(#marketingGradient)"
        className="icon-circle-1"
      />
      <circle
        ref={el => el && gsap.set(el, { scale: 0 })}
        cx="25"
        cy="25"
        r="3"
        fill="url(#marketingGradient)"
        className="icon-circle-2"
      />
      <circle
        ref={el => el && gsap.set(el, { scale: 0 })}
        cx="35"
        cy="10"
        r="3"
        fill="url(#marketingGradient)"
        className="icon-circle-3"
      />
    </svg>
  );
};
