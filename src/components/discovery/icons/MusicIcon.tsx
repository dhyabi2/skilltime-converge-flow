
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface MusicIconProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const MusicIcon: React.FC<MusicIconProps> = ({ containerRef }) => {
  useEffect(() => {
    if (containerRef.current) {
      const paths = containerRef.current?.querySelectorAll('.icon-path-1, .icon-path-2, .icon-path-3');
      const circles = containerRef.current?.querySelectorAll('.icon-circle-1, .icon-circle-2');

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
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-mint-400">
      <defs>
        <linearGradient id="musicGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#5eead4" />
          <stop offset="100%" stopColor="#7dd3fc" />
        </linearGradient>
      </defs>
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M15 8 L15 28"
        stroke="url(#musicGradient)"
        strokeWidth="3"
        className="icon-path-1"
      />
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M25 5 L25 25"
        stroke="url(#musicGradient)"
        strokeWidth="3"
        className="icon-path-2"
      />
      <circle
        ref={el => el && gsap.set(el, { scale: 0 })}
        cx="15"
        cy="30"
        r="4"
        fill="url(#musicGradient)"
        className="icon-circle-1"
      />
      <circle
        ref={el => el && gsap.set(el, { scale: 0 })}
        cx="25"
        cy="27"
        r="4"
        fill="url(#musicGradient)"
        className="icon-circle-2"
      />
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M15 8 Q25 5 25 8"
        fill="none"
        stroke="url(#musicGradient)"
        strokeWidth="2"
        className="icon-path-3"
      />
    </svg>
  );
};
