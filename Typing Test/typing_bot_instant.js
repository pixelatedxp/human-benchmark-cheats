(function solveTypingInstant() {
    console.log("%c TYPING BOT: MAXIMUM VELOCITY ", "background: #000; color: #ff0000; padding: 5px; font-weight: bold;");
    const allSpans = Array.from(document.querySelectorAll('span'));
    const letters = allSpans.filter(s => s.innerText.length === 1 && s.parentElement.childElementCount > 20);
    if (letters.length === 0) {
        console.error("Text not found!");
        return;
    }
    const fullText = letters.map(l => l.innerText).join('');
    const container = letters[0].parentElement;
    container.focus();
    container.click();
    for (let i = 0; i < fullText.length; i++) {
        const char = fullText[i];
        const eventData = {
            key: char,
            keyCode: char.charCodeAt(0),
            which: char.charCodeAt(0),
            bubbles: true,
            cancelable: true
        };
        container.dispatchEvent(new KeyboardEvent('keydown', eventData));
        container.dispatchEvent(new KeyboardEvent('keypress', eventData));
        container.dispatchEvent(new KeyboardEvent('keyup', eventData));
    }
    console.log("%c SONIC SPEED COMPLETE ", "color: #00ffff; font-weight: bold;");
})();