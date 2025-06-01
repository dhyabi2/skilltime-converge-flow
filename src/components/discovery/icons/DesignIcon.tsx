
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface DesignIconProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DesignIcon: React.FC<DesignIconProps> = ({ containerRef }) => {
  useEffect(() => {
    if (containerRef.current) {
      const paths = containerRef.current?.querySelectorAll('.icon-path-1, .icon-path-2');
      const circles = containerRef.current?.querySelectorAll('.icon-circle-1');

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
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-soft-blue-500">
      <defs>
        <linearGradient id="designGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M20 5 L35 15 L35 25 L20 35 L5 25 L5 15 Z"
        fill="none"
        stroke="url(#designGradient)"
        strokeWidth="2"
        className="icon-path-1"
      />
      <circle
        ref={el => el && gsap.set(el, { scale: 0 })}
        cx="20"
        cy="20"
        r="8"
        fill="url(#designGradient)"
        className="icon-circle-1"
      />
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M15 15 L25 25 M25 15 L15 25"
        stroke="white"
        strokeWidth="2"
        className="icon-path-2"
      />
    </svg>
  );
};
