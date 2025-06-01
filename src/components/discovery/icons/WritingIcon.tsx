
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface WritingIconProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const WritingIcon: React.FC<WritingIconProps> = ({ containerRef }) => {
  useEffect(() => {
    if (containerRef.current) {
      const paths = containerRef.current?.querySelectorAll('.icon-path-1, .icon-path-2');
      const lines = containerRef.current?.querySelectorAll('.icon-line-1');

      const tl = gsap.timeline({ delay: 0.5 });

      if (paths) {
        tl.to(paths, {
          drawSVG: "100%",
          duration: 1,
          ease: "power2.inOut",
          stagger: 0.2
        });
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
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-soft-blue-400">
      <defs>
        <linearGradient id="writingGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#2dd4bf" />
        </linearGradient>
      </defs>
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M8 32 L32 8 L35 11 L11 35 Z"
        fill="none"
        stroke="url(#writingGradient)"
        strokeWidth="2"
        className="icon-path-1"
      />
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M28 12 L32 8 L35 11 L31 15"
        fill="url(#writingGradient)"
        className="icon-path-2"
      />
      <line
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        x1="8"
        y1="32"
        x2="12"
        y2="28"
        stroke="url(#writingGradient)"
        strokeWidth="2"
        className="icon-line-1"
      />
    </svg>
  );
};
