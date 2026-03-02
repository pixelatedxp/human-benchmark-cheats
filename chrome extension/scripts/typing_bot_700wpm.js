(async function solveTypingUniversal() {
    console.log("%c TYPING BOT: RECOVERING... ", "background: #e67e22; color: white; padding: 5px; font-weight: bold;");
    const allSpans = Array.from(document.querySelectorAll('span'));
    const letters = allSpans.filter(s => s.innerText.length === 1 && s.parentElement.childElementCount > 20);
    if (letters.length === 0) {
        console.error("STILL NO TEXT. Please right-click the text, click 'Inspect', and tell me the class name.");
        return;
    }
    const fullText = letters.map(l => l.innerText).join('');
    console.log("Text Recovered: " + fullText.substring(0, 30) + "...");
    const container = letters[0].parentElement;
    container.click();
    const typeChar = (char) => {
        const eventData = {
            key: char,
            keyCode: char.charCodeAt(0),
            which: char.charCodeAt(0),
            bubbles: true,
            cancelable: true
        };
        container.dispatchEvent(new KeyboardEvent('keydown', eventData));
        container.dispatchEvent(new KeyboardEvent('keypress', eventData));
        window.dispatchEvent(new KeyboardEvent('keydown', eventData));
    };
    for (let char of fullText) {
        typeChar(char);
        await new Promise(r => setTimeout(r, 15));
    }
    console.log("%c DONE! ", "color: #2ecc71; font-weight: bold;");
})();