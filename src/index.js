const BS = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
};

document.addEventListener("DOMContentLoaded", () => {
  const mediaQuery = window.matchMedia(`(max-width: ${BS.sm}px)`);

  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const updateBackground = (e) => {
    if ((e && e.matches) || (!e && mediaQuery.matches)) {
      navbar.classList.add("fixed-bottom");
    } else {
      navbar.classList.remove("fixed-bottom");
    }
  };

  updateBackground();
  mediaQuery.addEventListener("change", updateBackground);

  const ogText = "Vianney";
  const text = ["pronounced V-N-A", "it's like DNA with a V"];
  const elem = document.getElementById("myname");

  let current = 0;
  let morphing = false;
  let morphInterval = null;
  let animating = false;

  // Helper: create a span for each letter
  function splitTextToSpans(text) {
    return text
      .split("")
      .map(
        (char, i) =>
          `<span class="morph-letter" data-idx="${i}">${char === " " ? "&nbsp;" : char}</span>`,
      )
      .join("");
  }

  // Magical blur ray transition with mask and letter morph
  function blurTransition(newText, duration = 1200) {
    if (!elem) return;
    if (animating) return;
    animating = true;

    // Prepare: split current and new text into spans
    const oldText = elem.textContent;
    const maxLen = Math.max(oldText.length, newText.length);

    // Pad both texts to same length
    const paddedOld = oldText.padEnd(maxLen, " ");
    const paddedNew = newText.padEnd(maxLen, " ");

    // Build spans for both
    elem.innerHTML = splitTextToSpans(paddedOld);

    // Create a blur ray overlay
    let blurRay = document.createElement("div");
    blurRay.className = "blur-ray-mask";
    blurRay.style.position = "absolute";
    blurRay.style.left = "0";
    blurRay.style.top = "0";
    blurRay.style.width = "100%";
    blurRay.style.height = "100%";
    blurRay.style.pointerEvents = "none";
    blurRay.style.zIndex = "2";
    blurRay.style.maskImage =
      "linear-gradient(90deg, transparent 0%, black 30%, black 70%, transparent 100%)";
    blurRay.style.webkitMaskImage =
      "linear-gradient(90deg, transparent 0%, black 30%, black 70%, transparent 100%)";
    blurRay.style.transition = `transform ${duration}ms linear`;

    // Style the container for relative positioning
    elem.style.position = "relative";
    elem.style.display = "inline-block";
    elem.style.overflow = "visible";

    // Add blur effect to the text
    elem.style.filter = "none";

    // Remove any previous blur-ray
    let prevRay = elem.querySelector(".blur-ray-mask");
    if (prevRay) prevRay.remove();

    // Insert the blur ray
    elem.appendChild(blurRay);

    // Animate the blur ray from left to right
    blurRay.style.transform = "translateX(-100%)";
    setTimeout(() => {
      blurRay.style.transform = "translateX(0%)";
    }, 10);

    // Animate letter morphing as the blur ray passes
    const letters = Array.from(elem.querySelectorAll(".morph-letter"));
    const startTime = performance.now();

    function animate(now) {
      let elapsed = now - startTime;
      let progress = Math.min(elapsed / duration, 1);

      // The blur ray's "head" position (0 to 1)
      let rayPos = progress;

      // For each letter, if the ray has passed, morph it
      letters.forEach((span, i) => {
        let letterPos = i / maxLen;
        if (letterPos < rayPos) {
          // Morph to new letter
          span.innerHTML = paddedNew[i] === " " ? "&nbsp;" : paddedNew[i];
          span.style.filter = "blur(0px)";
        } else if (letterPos < rayPos + 0.15) {
          // In the blur zone
          span.style.filter = "blur(4px)";
        } else {
          // Not yet morphed
          span.innerHTML = paddedOld[i] === " " ? "&nbsp;" : paddedOld[i];
          span.style.filter = "blur(0px)";
        }
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Clean up: set final text, remove spans and blur ray
        elem.innerHTML = newText.replace(/ /g, "&nbsp;");
        elem.style.filter = "";
        if (blurRay.parentNode) blurRay.parentNode.removeChild(blurRay);
        animating = false;
      }
    }

    requestAnimationFrame(animate);
  }

  function showNextText() {
    blurTransition(text[current]);
    current = (current + 1) % text.length;
  }

  function startMorphing() {
    if (morphing) return;
    morphing = true;
    current = 0;
    blurTransition(text[current]);
    current = (current + 1) % text.length;
    morphInterval = setInterval(showNextText, 3000);
  }

  function stopMorphing() {
    morphing = false;
    clearInterval(morphInterval);
    blurTransition(ogText);
  }

  if (elem) {
    elem.style.transition = ""; // Ensure no leftover transitions
    elem.addEventListener("mouseenter", startMorphing);
    elem.addEventListener("mouseleave", stopMorphing);
  }

  // Add CSS for blur-ray-mask if not present
  if (!document.getElementById("blur-ray-style")) {
    const style = document.createElement("style");
    style.id = "blur-ray-style";
    style.textContent = `
      #myname {
        position: relative;
        display: inline-block;
        overflow: visible;
      }
      #myname .blur-ray-mask {
        pointer-events: none;
        position: absolute;
        left: 0; top: 0; width: 100%; height: 100%;
        z-index: 2;
        background: transparent;
        mask-image: linear-gradient(90deg, transparent 0%, black 30%, black 70%, transparent 100%);
        -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 30%, black 70%, transparent 100%);
        mask-size: 100% 100%;
        -webkit-mask-size: 100% 100%;
        mask-repeat: no-repeat;
        -webkit-mask-repeat: no-repeat;
        transition: transform 0.8s linear;
      }
      #myname .morph-letter {
        display: inline-block;
        transition: filter 0.2s;
        will-change: filter;
      }
    `;
    document.head.appendChild(style);
  }
});
