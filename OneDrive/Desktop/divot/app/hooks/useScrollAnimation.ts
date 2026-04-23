"use client";

import { useEffect } from 'react';

interface ScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: ScrollAnimationOptions = {}) => {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true
  } = options;

  useEffect(() => {
    // Check if we're on the client side
    if (typeof window === 'undefined') return;

    // Small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(() => {
      const elements = document.querySelectorAll('.scroll-animate');

      // Use a more conservative threshold for mobile
      const isMobile = window.innerWidth < 768;
      const mobileThreshold = isMobile ? 0.05 : threshold;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
              if (triggerOnce) {
                observer.unobserve(entry.target);
              }
            } else if (!triggerOnce) {
              entry.target.classList.remove('visible');
            }
          });
        },
        {
          threshold: mobileThreshold,
          rootMargin,
        }
      );

      elements.forEach((element) => {
        observer.observe(element);
      });

      return () => {
        observer.disconnect();
      };
    }, 100);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [threshold, rootMargin, triggerOnce]);
};
