import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const revealSelector = [
  ".section",
  ".home-section",
  ".southtrails-hero",
  ".destination-card",
  ".state-card",
  ".state-home-card",
  ".home-state-card",
  ".home-destination-card",
  ".home-category-card",
  ".home-package-card",
  ".home-review-card",
  ".state-culture-card",
  ".state-experience-card",
  ".state-review-card",
  ".package-card",
  ".package-browse-card",
  ".glass-card",
  ".testimonial-card",
  ".feature-card",
  ".trending-card",
  ".ecosystem-card",
  ".booking-success-panel",
].join(",");

const gestureSelector = [
  "a",
  "button",
  ".button",
  ".state-card",
  ".state-home-card",
  ".home-state-card",
  ".home-destination-card",
  ".home-category-card",
  ".home-package-card",
  ".state-culture-card",
  ".state-experience-card",
  ".state-review-card",
  ".destination-card",
  ".package-card",
  ".package-browse-card",
  ".glass-card",
  ".testimonial-card",
  ".feature-card",
  ".trending-card",
  ".ecosystem-card",
].join(",");

const cardSelector = [
  ".state-card",
  ".state-home-card",
  ".home-state-card",
  ".home-destination-card",
  ".home-category-card",
  ".home-package-card",
  ".state-culture-card",
  ".state-experience-card",
  ".state-review-card",
  ".destination-card",
  ".package-card",
  ".package-browse-card",
  ".glass-card",
  ".testimonial-card",
  ".feature-card",
  ".trending-card",
  ".ecosystem-card",
].join(",");

const LuxuryExperienceLayer = () => {
  const location = useLocation();

  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return undefined;

    const targets = Array.from(document.querySelectorAll(revealSelector));
    targets.forEach((node) => node.classList.add("luxury-reveal"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("luxury-reveal--visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );

    targets.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [location.pathname]);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const handlePointerMove = (event) => {
      if (!finePointer || reduceMotion) return;
      const card = event.target.closest(cardSelector);
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty("--gesture-tilt-x", `${(-y * 4).toFixed(2)}deg`);
      card.style.setProperty("--gesture-tilt-y", `${(x * 4).toFixed(2)}deg`);
      card.style.setProperty("--gesture-glow-x", `${event.clientX - rect.left}px`);
      card.style.setProperty("--gesture-glow-y", `${event.clientY - rect.top}px`);
      card.classList.add("luxury-gesture-tilt");
    };

    const handlePointerLeave = (event) => {
      const card = event.target.closest?.(cardSelector);
      if (!card) return;
      card.classList.remove("luxury-gesture-tilt", "luxury-gesture-press");
      card.style.removeProperty("--gesture-tilt-x");
      card.style.removeProperty("--gesture-tilt-y");
    };

    const handlePointerDown = (event) => {
      const target = event.target.closest(gestureSelector);
      if (target) target.classList.add("luxury-gesture-press");
    };

    const handlePointerUp = (event) => {
      const target = event.target.closest(gestureSelector);
      if (target) target.classList.remove("luxury-gesture-press");
    };

    document.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave, true);
    document.addEventListener("pointerdown", handlePointerDown, { passive: true });
    document.addEventListener("pointerup", handlePointerUp, { passive: true });
    document.addEventListener("pointercancel", handlePointerUp, { passive: true });

    return () => {
      document.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave, true);
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("pointerup", handlePointerUp);
      document.removeEventListener("pointercancel", handlePointerUp);
    };
  }, []);

  return null;
};

export default LuxuryExperienceLayer;
