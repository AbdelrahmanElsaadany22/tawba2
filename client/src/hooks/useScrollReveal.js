import { useEffect, useRef } from 'react';

export const useScrollReveal = () => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    const container = ref.current ?? document;
    const elements = container.querySelectorAll('.reveal');
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return ref;
};

export const useCountUp = (target, duration = 2000) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();

      let start = 0;
      const step = target / (duration / 16);
      const suffix = target === 5 ? '+' : target === 98 ? '%' : '+';
      const tick = () => {
        start = Math.min(start + step, target);
        if (ref.current) ref.current.textContent = Math.floor(start).toLocaleString('ar-SA') + suffix;
        if (start < target) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, { threshold: 0.5 });

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration]);

  return ref;
};
