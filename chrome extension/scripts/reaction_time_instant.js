function Reaction_Time_Improved() {
  const mouseDownEvent = new MouseEvent("mousedown", {
    bubbles: true,
    cancelable: true,
    view: window,
  });

  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
        const target = mutation.target;
        // The green screen specifically has the class "view-go" without "view-splash"
        if (target.classList && target.classList.contains("view-go") && !target.classList.contains("view-splash")) {
          target.dispatchEvent(mouseDownEvent);
          console.log("Zero-latency click performed!");
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