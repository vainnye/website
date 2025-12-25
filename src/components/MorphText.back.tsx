import React, { useEffect, useRef } from "react";
import "@/ext/morph/morph.css";

type Props = {
  texts: string[];
  morphTime?: number; // seconds
  cooldownTime?: number; // seconds
  loop?: boolean;
  onFinish: () => void;
  className?: string;
};

export default function MorphText({
  texts,
  morphTime = 1,
  cooldownTime = 2,
  loop = false,
  onFinish,
  className,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const text1Ref = useRef<HTMLHeadingElement | null>(null);
  const text2Ref = useRef<HTMLHeadingElement | null>(null);

  const onFinishRef = useRef(onFinish);

  // compute longest text (for padding) once from props
  const longestText = texts.reduce(
    (a, b) => (a.length >= b.length ? a : b),
    "",
  );

  useEffect(() => {
    const el1 = text1Ref.current!;
    const el2 = text2Ref.current!;
    if (!el1 || !el2) return;

    let textIndex = texts.length - 1;
    let time = performance.now() / 1000; // seconds
    let morph = 0;
    let cooldown = cooldownTime;

    el1.textContent = texts[textIndex % texts.length];
    el2.textContent = texts[(textIndex + 1) % texts.length];

    function setMorph(fraction: number) {
      // guard to avoid divide-by-zero when fraction is 0
      const safeFraction = Math.max(0.00001, fraction);

      // these match the original math from morph.js
      el2.style.filter = `blur(${Math.min(8 / safeFraction - 8, 100)}px)`;
      el2.style.opacity = `${Math.pow(safeFraction, 0.4) * 100}%`;

      const inv = 1 - fraction;
      const safeInv = Math.max(0.00001, inv);
      el1.style.filter = `blur(${Math.min(8 / safeInv - 8, 100)}px)`;
      el1.style.opacity = `${Math.pow(safeInv, 0.4) * 100}%`;

      el1.textContent = texts[textIndex % texts.length];
      el2.textContent = texts[(textIndex + 1) % texts.length];
    }

    function doMorph() {
      morph -= cooldown;
      cooldown = 0;

      let fraction = morph / morphTime;
      if (fraction > 1) {
        cooldown = cooldownTime;
        fraction = 1;
      }
      setMorph(fraction);
    }

    function doCooldown() {
      morph = 0;

      el2.style.filter = "";
      el2.style.opacity = "100%";

      el1.style.filter = "";
      el1.style.opacity = "0%";
    }

    let rafId = 0;
    let started = false; // updated in animate()
    function animate() {
      rafId = requestAnimationFrame(animate);
      const newTime = performance.now() / 1000;
      const shouldIncrementIndex = cooldown > 0;
      const dt = newTime - time;
      time = newTime;

      cooldown -= dt;

      if (cooldown <= 0) {
        if (shouldIncrementIndex) {
          textIndex++;
          if (!loop && (textIndex + 1) % texts.length === 0) {
            cleanup();
            onFinishRef.current();
          }
        }
        doMorph();
      } else {
        doCooldown();
      }

      started = true;
    }

    // start
    rafId = requestAnimationFrame(animate);

    const cleanup = () => {
      console.log("cleanup called");
      cancelAnimationFrame(rafId);
    };

    return cleanup;
  }, [texts, morphTime, cooldownTime, loop]);

  return (
    <div id="anim-morph-container" className={className} ref={containerRef}>
      <h1 className="invisible">{longestText}</h1>
      <h1 id="anim-morph-text1" ref={text1Ref} />
      <h1 id="anim-morph-text2" ref={text2Ref} />
    </div>
  );
}
