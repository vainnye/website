/*
  Adapted from https://codepen.io/Valgo/pen/PowZaNY

  the author's explanation:
	This pen cleverly utilizes SVG filters to create a "Morphing Text" effect. Essentially, it layers 2 text elements on top of each other, and blurs them depending on which text element should be more visible. Once the blurring is applied, both texts are fed through a threshold filter together, which produces the "gooey" effect. Check the CSS - Comment the #container rule's filter out to see how the blurring works!
*/

import { useEffect, useRef } from "react";
import "./MorphText.css";

// --- TYPES ---

type MorphTextProps = {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  loop?: boolean;
  onFinish: () => void;
  className?: string;
};

interface AnimationState {
  textIndex: number;
  morphAccumulator: number;
  cooldownRemaining: number;
  lastFrameTime: number;
}

// --- PURE HELPER FUNCTIONS ---

const calculateBlur = (fraction: number): number => {
  const safeFraction = Math.max(0.00001, fraction);
  return Math.min(8 / safeFraction - 8, 100);
};

const calculateOpacity = (fraction: number): number => {
  const safeFraction = Math.max(0.00001, fraction);
  return Math.pow(safeFraction, 0.4) * 100;
};

const getLongestText = (texts: string[]): string => {
  return texts.reduce(
    (longest, current) =>
      current.length >= longest.length ? current : longest,
    "",
  );
};

// --- COMPONENT ---

export default function MorphText({
  texts,
  morphTime = 1,
  cooldownTime = 2,
  loop = false,
  onFinish,
  className,
}: MorphTextProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const outgoingRef = useRef<HTMLHeadingElement | null>(null);
  const incomingRef = useRef<HTMLHeadingElement | null>(null);

  const onFinishRef = useRef(onFinish);

  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  const longestText = getLongestText(texts);

  useEffect(() => {
    const outgoingEl = outgoingRef.current;
    const incomingEl = incomingRef.current;

    if (!outgoingEl || !incomingEl) return;

    // État initial
    const state: AnimationState = {
      textIndex: texts.length - 1,
      morphAccumulator: 0,
      cooldownRemaining: cooldownTime,
      lastFrameTime: performance.now() / 1000,
    };

    let rafId: number = 0;

    // --- DOM UPDATES ---

    const updateTextContent = () => {
      const currentIndex = state.textIndex % texts.length;
      const nextIndex = (state.textIndex + 1) % texts.length;

      outgoingEl.textContent = texts[currentIndex];
      incomingEl.textContent = texts[nextIndex];
    };

    const applyMorphStyles = (fraction: number) => {
      incomingEl.style.filter = `blur(${calculateBlur(fraction)}px)`;
      incomingEl.style.opacity = `${calculateOpacity(fraction)}%`;

      const inverseFraction = 1 - fraction;
      outgoingEl.style.filter = `blur(${calculateBlur(inverseFraction)}px)`;
      outgoingEl.style.opacity = `${calculateOpacity(inverseFraction)}%`;
    };

    const resetStyles = () => {
      incomingEl.style.filter = "";
      incomingEl.style.opacity = "100%";
      outgoingEl.style.filter = "";
      outgoingEl.style.opacity = "0%";
    };

    // --- ANIMATION PHASES ---

    const processCooldownPhase = () => {
      state.morphAccumulator = 0;
      resetStyles();
    };

    // Retourne 'true' si l'animation doit s'arrêter complètement
    const processMorphPhase = (): boolean => {
      state.morphAccumulator -= state.cooldownRemaining;
      state.cooldownRemaining = 0;

      let fraction = state.morphAccumulator / morphTime;

      // Si le morphing est terminé (fraction >= 1)
      if (fraction >= 1) {
        fraction = 1;

        // CHECK DE FIN : Est-ce le dernier slide et ne bouclons-nous pas ?
        // On vérifie si l'index courant (qui vient d'être affiché) est le dernier
        const currentDisplayedIndex = (state.textIndex + 1) % texts.length;
        const isLastSlide = currentDisplayedIndex === texts.length - 1;

        if (!loop && isLastSlide) {
          // 1. Appliquer le style final pour être sûr que le texte est net
          applyMorphStyles(1);
          // 2. Signaler l'arrêt immédiat pour skipper le cooldown
          return true;
        }

        // Sinon, on prépare le prochain cooldown
        state.cooldownRemaining = cooldownTime;
      }

      applyMorphStyles(fraction);
      return false; // Continuer l'animation
    };

    // Initial Setup
    updateTextContent();

    // --- MAIN LOOP ---

    const animate = () => {
      rafId = requestAnimationFrame(animate);

      const currentTime = performance.now() / 1000;
      const deltaTime = currentTime - state.lastFrameTime;
      state.lastFrameTime = currentTime;

      const wasInCooldown = state.cooldownRemaining > 0;
      state.cooldownRemaining -= deltaTime;

      // PHASE 1: Cooldown (Attente statique)
      if (state.cooldownRemaining > 0) {
        processCooldownPhase();
        return;
      }

      // PHASE 2: Transition (Déclenchement du morphing)
      if (wasInCooldown) {
        state.textIndex++;
        updateTextContent();
      }

      // PHASE 3: Morphing (Animation active)
      const shouldStop = processMorphPhase();

      if (shouldStop) {
        cancelAnimationFrame(rafId);
        onFinishRef.current();
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [texts, morphTime, cooldownTime, loop]);

  return (
    <div id="anim-morph-container" className={className} ref={containerRef}>
      <h1 className="invisible" aria-hidden="true">
        {longestText}
      </h1>
      <h1 id="anim-morph-text1" ref={outgoingRef} />
      <h1 id="anim-morph-text2" ref={incomingRef} />
    </div>
  );
}
