(function chimpBotInstant() {
    console.log("%c CHIMP TEST: INSTANT MODE ", "background: #16a085; color: white; padding: 5px; font-weight: bold;");
    const triggerClick = (el) => {
        const key = Object.keys(el).find(k => k.startsWith("__reactProps") || k.startsWith("__reactEventHandlers"));
        const opts = { bubbles: true, cancelable: true, view: window, buttons: 1 };
        if (el[key] && el[key].onMouseDown) {
            el[key].onMouseDown({ target: el, ...opts });
        } else {
            el.dispatchEvent(new MouseEvent('mousedown', opts));
            el.dispatchEvent(new MouseEvent('mouseup', opts));
            el.dispatchEvent(new MouseEvent('click', opts));
        }
    };
    const solveRound = () => {
        const squares = Array.from(document.querySelectorAll('div')).filter(el => {
            const hasNum = el.hasAttribute('data-cell-number') || /^\d+$/.test(el.innerText.trim());
            const isSquare = el.offsetWidth > 30;
            return isSquare && hasNum;
        });
        if (squares.length === 0) return false;
        const sequence = squares.map(el => ({
            num: parseInt(el.getAttribute('data-cell-number') || el.innerText.trim()),
            el: el
        })).sort((a, b) => a.num - b.num);
        console.log(`%c Instant solve: ${sequence.length} numbers `, "color: #f1c40f;");
        sequence.forEach(item => {
            triggerClick(item.el);
        });
        return true;
    };
    const checkButtons = () => {
        const btn = Array.from(document.querySelectorAll('button, .css-de9bgv'))
            .find(b => /Continue|Start|Next/i.test(b.innerText));
        if (btn) {
            btn.click();
            return true;
        }
        return false;
    };
    setInterval(() => {
        if (!checkButtons()) {
            solveRound();
        }
    }, 400);
})();