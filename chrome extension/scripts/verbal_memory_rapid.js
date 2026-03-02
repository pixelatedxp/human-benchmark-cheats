(function solveVerbalStable() {
    let seenWords = new Set();
    console.log("%c VERBAL MEMORY: STABLE SONIC ACTIVE ", "background: #2980b9; color: white; padding: 5px; font-weight: bold;");
    const solve = () => {
        const wordElement = document.querySelector('.word');
        if (!wordElement) {
            const startBtn = Array.from(document.querySelectorAll('button')).find(b => /start|play|continue/i.test(b.innerText));
            if (startBtn) startBtn.click();
            return;
        }
        const currentWord = wordElement.innerText.trim();
        const buttons = Array.from(document.querySelectorAll('button'));
        const seenBtn = buttons.find(b => /seen/i.test(b.innerText.toLowerCase()));
        const newBtn = buttons.find(b => /new/i.test(b.innerText.toLowerCase()));
        if (!seenBtn || !newBtn) return;
        if (seenWords.has(currentWord)) {
            seenBtn.click();
        } else {
            seenWords.add(currentWord);
            newBtn.click();
        }
    };
    const speed = 10;
    const gameLoop = setInterval(solve, speed);
    window.stopVerbal = () => clearInterval(gameLoop);
    console.log("Type 'stopVerbal()' to end the bot.");
})();