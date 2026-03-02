function Reaction_Time_Improved() {
  const mouseDownEvent = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        if (mutation.target.classList && mutation.target.classList.contains("view-go")) {
          mutation.target.dispatchEvent(mouseDownEvent);
          console.log("Zero-latency click performed!");
        }
      } else if (mutation.type === 'childList') {
        // Just in case it mounts with view-go already applied
        const goBtn = document.querySelector('.view-go');
        if (goBtn) {
          goBtn.dispatchEvent(mouseDownEvent);
        }
      }
    }
  });

  // Observe the entire body for changes
  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    childList: true,
    attributeFilter: ['class']
  });
  console.log("Reaction bot active! Waiting for green...");
}

// Ensure it only runs once if injected multiple times
if (!window.__reactionBotInjected) {
  window.__reactionBotInjected = true;
  Reaction_Time_Improved();
}