(function() {
    let sequence = [];
    let isRecording = true;
    let lastFlashTime = Date.now();
    let solverInterval;
    const getSquares = () => {
        return Array.from(document.querySelectorAll('div')).filter(el => {
            return el.offsetWidth === el.offsetHeight && el.offsetWidth > 50 && el.offsetWidth < 200;
        });
    };
    const tick = () => {
        const squares = getSquares();
        if (squares.length === 0) return;
        squares.forEach((sq, index) => {
            if (sq.classList.contains('active')) {
                const boxNum = index + 1;
                if (sequence[sequence.length - 1] !== sq) {
                    sequence.push(sq);
                    lastFlashTime = Date.now();
                    isRecording = true;
                    console.log("Captured:", sequence.length);
                }
            }
        });
        if (isRecording && sequence.length > 0 && (Date.now() - lastFlashTime > 1200)) {
            isRecording = false;
            autoSolve();
        }
    };
    const autoSolve = () => {
        console.log("Auto-solving level...");
        sequence.forEach((square, index) => {
            setTimeout(() => {
                const key = Object.keys(square).find(k => k.startsWith("__reactProps") || k.startsWith("__reactEventHandlers"));
                const opts = { bubbles: true, cancelable: true, view: window };
                if (square[key] && square[key].onMouseDown) {
                    square[key].onMouseDown({ target: square, buttons: 1, ...opts });
                } else {
                    square.dispatchEvent(new MouseEvent('mousedown', opts));
                    square.dispatchEvent(new MouseEvent('mouseup', opts));
                    square.dispatchEvent(new MouseEvent('click', opts));
                }
                if (index === sequence.length - 1) {
                    sequence = [];
                    console.log("Waiting for next level...");
                }
            }, index * 300);
        });
    };
    setInterval(tick, 50);
    console.log("Auto-Solver Engaged. Click Start to begin.");
})();