
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface PhotographyIconProps {
  containerRef: React.RefObject<HTMLDivElement>;
}

export const PhotographyIcon: React.FC<PhotographyIconProps> = ({ containerRef }) => {
  useEffect(() => {
    if (containerRef.current) {
      const paths = containerRef.current?.querySelectorAll('.icon-path-1');
      const circles = containerRef.current?.querySelectorAll('.icon-circle-1, .icon-circle-2');
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
    <svg width="40" height="40" viewBox="0 0 40 40" className="text-soft-blue-300">
      <defs>
        <linearGradient id="photoGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" />
          <stop offset="100%" stopColor="#14b8a6" />
        </linearGradient>
      </defs>
      <rect
        ref={el => el && gsap.set(el, { scaleX: 0 })}
        x="5"
        y="12"
        width="30"
        height="20"
        rx="3"
        fill="none"
        stroke="url(#photoGradient2)"
        strokeWidth="2"
        className="icon-rect-1"
      />
      <path
        ref={el => el && gsap.set(el, { drawSVG: "0%" })}
        d="M15 12 L17 8 L23 8 L25 12"
        fill="none"
        stroke="url(#photoGradient2)"
        strokeWidth="2"
        className="icon-path-1"
      />
      <circle
        ref={el => el && gsap.set(el, { scale: 0 })}
        cx="20"
        cy="22"
        r="6"
        fill="none"
        stroke="url(#photoGradient2)"
        strokeWidth="2"
        className="icon-circle-1"
      />
      <circle
        ref={el => el && gsap.set(el, { scale: 0 })}
        cx="30"
        cy="16"
        r="1.5"
        fill="url(#photoGradient2)"
        className="icon-circle-2"
      />
    </svg>
  );
};
