(function solveNumberMemory() {
    let savedNumber = "";
    console.log("%c NUMBER MEMORY: SNIPER ACTIVE (5 MINUTE LIMIT) ", "background: #2980b9; color: white; padding: 5px; font-weight: bold;");
    const observer = new MutationObserver(() => {
        const bigNum = document.querySelector('.big-number');
        if (bigNum && bigNum.innerText) {
            savedNumber = bigNum.innerText.trim();
            console.log("Number Captured: " + savedNumber);
        }
        const input = document.querySelector('input[type="text"]');
        const submitBtn = Array.from(document.querySelectorAll('button')).find(b => /submit|next/i.test(b.innerText));
        if (input && savedNumber) {
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            setter.call(input, savedNumber);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            if (submitBtn) {
                submitBtn.click();
                savedNumber = "";
            }
        }
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b => /next|start/i.test(b.innerText));
        if (nextBtn && !input) {
            nextBtn.click();
        }
    });
    const target = document.querySelector('.number-memory-test') || document.body;
    observer.observe(target, { childList: true, subtree: true });
    const duration = 5 * 60 * 1000;
    setTimeout(() => {
        observer.disconnect();
        console.log("%c TIME EXPIRED: SNIPER DEACTIVATED ", "background: #c0392b; color: white; padding: 5px; font-weight: bold;");
    }, duration);
})();