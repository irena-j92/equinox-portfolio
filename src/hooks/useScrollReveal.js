import { useEffect } from "react";
import gsap from "gsap";

// Shared pacing. Motion-disabled renders never conceal narrative content.
export function useScrollReveal(root, motion, page) {
  useEffect(() => {
    if (!root.current || !motion) return;
    const elements = [...root.current.querySelectorAll("[data-reveal]")];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          gsap.to(entry.target, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            clearProps: "opacity,transform",
          });
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12 },
    );
    elements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.94)
        return;
      gsap.set(element, { opacity: 0, y: 24 });
      observer.observe(element);
    });
    return () => {
      observer.disconnect();
      elements.forEach((element) => {
        gsap.killTweensOf(element);
        gsap.set(element, { clearProps: "opacity,transform" });
      });
    };
  }, [root, motion, page]);
}
