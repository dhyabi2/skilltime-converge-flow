
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface DevelopmentIconProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const DevelopmentIcon: React.FC<DevelopmentIconProps> = ({ containerRef }) => {
  useEffect(() => {
    if (containerRef.current) {
      const paths = containerRef.current?.querySelectorAll('.icon-path-1');
      const lines = containerRef.current?.querySelectorAll('.icon-line-1');
      const rects = containerRef.current?.querySelectorAll('.icon-rect-1');

      const tl = gsap.timeline({ delay: 0.5 });

      if (rects) {
        tl.to(rects, {
          scaleX: 1,
          duration: 0.6,
          ease: "back.out(1.7)",
          stagger: 0.1
        });
      }

      if (paths) {
        tl.to(paths, {
          drawSVG: "100%",
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.2
        }, "-=0.3");
      }

      if (lines) {
        tl.to(lines, {
          drawSVG: "100%",
          duration: 0.8,
          ease: "power2.inOut",
          stagger: 0.1
        }, "-=0.5");
      }
    }
  }, [containerRef]);

  return (
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-soft-blue-600">
      <defs>
        <linearGradient id="devGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0d9488" />
        </linearGradient>
      </defs>
      <rect
        ref={el => el && gsap.set(el, { scaleX: 0 })}
        x="5"
        y="10"
        width="30"
        height="20"
        rx="2"
        fill="none"
        stroke="url(#devGradient)"
        strokeWidth="2"
        className="icon-rect-1"
      />
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M12 18 L16 22 L12 26"
        fill="none"
        stroke="url(#devGradient)"
        strokeWidth="2"
        className="icon-path-1"
      />
      <line
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        x1="20"
        y1="24"
        x2="28"
        y2="24"
        stroke="url(#devGradient)"
        strokeWidth="2"
        className="icon-line-1"
      />
    </svg>
  );
};
