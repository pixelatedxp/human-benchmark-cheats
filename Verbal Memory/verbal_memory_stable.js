(function() {
    let seenWords = new Set();
    console.log("%c VERBAL MEMORY BOT: ONLINE ", "background: #2ecc71; color: white; padding: 5px;");
    const solve = () => {
        const wordElement = document.querySelector('.word');
        if (!wordElement) return;
        const currentWord = wordElement.innerText;
        const buttons = Array.from(document.querySelectorAll('button'));
        const seenBtn = buttons.find(b => b.innerText === "SEEN");
        const newBtn = buttons.find(b => b.innerText === "NEW");
        if (!seenBtn || !newBtn) return;
        if (seenWords.has(currentWord)) {
            seenBtn.click();
        } else {
            seenWords.add(currentWord);
            newBtn.click();
        }
    };
    setInterval(solve, 100);
})();