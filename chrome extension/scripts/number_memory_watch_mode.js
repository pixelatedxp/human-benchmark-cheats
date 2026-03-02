(function solveNumberMemoryWithDelay() {
    let savedNumber = "";
    console.log("%c NUMBER MEMORY: WATCH MODE ", "background: #2ecc71; color: black; padding: 5px; font-weight: bold;");
    const solve = async () => {
        const bigNum = document.querySelector('.big-number');
        if (bigNum && bigNum.innerText) {
            savedNumber = bigNum.innerText.trim();
        }
        const input = document.querySelector('input[type="text"]');
        if (input && savedNumber) {
            console.log("Typing: " + savedNumber);
            await new Promise(r => setTimeout(r, 400));
            const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, "value").set;
            setter.call(input, savedNumber);
            input.dispatchEvent(new Event('input', { bubbles: true }));
            await new Promise(r => setTimeout(r, 300));
            const submitBtn = Array.from(document.querySelectorAll('button')).find(b => /submit|next/i.test(b.innerText));
            if (submitBtn) submitBtn.click();
            savedNumber = "";
        }
        const nextBtn = Array.from(document.querySelectorAll('button')).find(b =>
            /next|start/i.test(b.innerText) && !document.querySelector('.big-number')
        );
        if (nextBtn) {
            await new Promise(r => setTimeout(r, 500));
            nextBtn.click();
        }
    };
    setInterval(solve, 100);
})();