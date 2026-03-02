// Aim Trainer Auto-Clicker (JavaScript)
function AimBot_JS() {
    console.log("AimBot Injecting... Waiting for targets.");

    const pointerDownEvent = new PointerEvent("pointerdown", {
        bubbles: true,
        cancelable: true,
        view: window,
    });

    // The target usually has a specific inline style or SVG structure in Human Benchmark.
    // Instead of guessing class names on minified React, we can observe nodes that look like a target.
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // ELEMENT_NODE
                    // The Aim targets on Human Benchmark are typically divs with background images of a target
                    // OR they contain a specific SVG.

                    // Strategy 1: Check if the element or its children has a specific target attribute
                    const isTarget = node.hasAttribute('data-aim-target') ||
                        (node.style && node.style.backgroundImage && node.style.backgroundImage.includes('target'));

                    // Strategy 2: Relying on DOM structure (Assuming targets are injected directly into a test area container)
                    // If a node is added to the active test area, it's highly likely the target.
                    if (mutation.target.getAttribute('data-test') === 'true' || mutation.target.classList.contains('css-1k4dpjt') || mutation.target.querySelector('svg')) {
                        // Click it immediately
                        node.dispatchEvent(pointerDownEvent);
                        // Also try basic mousedown just in case
                        node.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
                    }
                }
            });
        }
    });

    // A more aggressive polling approach if MutationObserver misses the deeply nested target
    let active = true;
    const clickInterval = setInterval(() => {
        if (!active) return;

        // Find the target by its unique properties.
        // It's the only element on the screen with a specific background or SVG that we need to click.
        const possibleTargets = document.querySelectorAll('div[style*="background-image"], svg, .css-1k4dpjt > div');

        possibleTargets.forEach(el => {
            // We need to filter out non-targets (like the UI/header).
            // Targets usually have a distinct width/height or are positioned absolutely.
            const rect = el.getBoundingClientRect();
            if (rect.width > 20 && rect.height > 20 && rect.width < 200 && el.style.top && el.style.left) {
                // Click it
                el.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true }));
                el.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, cancelable: true }));
            }
        });
    }, 10); // Check every 10ms for blistering speed

    console.log("AimBot JS Running!");
}

if (!window.__aimBotInjected) {
    window.__aimBotInjected = true;
    AimBot_JS();
}
