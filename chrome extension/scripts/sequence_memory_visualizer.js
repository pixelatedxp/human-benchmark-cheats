(function () {
    let sequence = [];
    let isRecording = true;
    let lastLevelCount = 0;
    console.log("Waiting for game grid... Click Start!");
    alert("Cheat activated! Please open the Developer Console (F12) to view the recorded pattern.");
    const findSquares = () => {
        const allDivs = document.querySelectorAll('div');
        return Array.from(allDivs).filter(el => {
            return el.offsetWidth === el.offsetHeight && el.offsetWidth > 50 && el.offsetWidth < 200;
        });
    };
    const setupObserver = () => {
        const squares = findSquares();
        if (squares.length < 9) {
            setTimeout(setupObserver, 500);
            return;
        }
        squares.forEach((sq, i) => {
            sq.style.position = "relative";
            sq.innerHTML = `<div style="display:flex;justify-content:center;align-items:center;height:100%;font-size:40px;color:rgba(255,255,255,0.8);font-weight:bold;pointer-events:none;text-shadow:2px 2px 4px #000;">${i + 1}</div>`;
        });
        console.log("Visual Guide Active!");
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.target.classList.contains('active')) {
                    const boxIndex = squares.indexOf(mutation.target) + 1;
                    if (!isRecording) {
                        sequence = [];
                        isRecording = true;
                        console.clear();
                    }
                    if (sequence[sequence.length - 1] !== boxIndex) {
                        sequence.push(boxIndex);
                        console.clear();
                        console.log("%c LEVEL PATTERN:", "background: #c0392b; color: white; font-size: 20px; padding: 5px;");
                        console.log(`%c ${sequence.join("    ")}`, "font-size: 45px; font-weight: bold; color: #f1c40f; font-family: monospace;");
                        console.log("\n%c Click the boxes in order, then wait for the next level.", "color: #888; font-style: italic;");
                    }
                }
            });
        });
        squares.forEach(s => observer.observe(s, { attributes: true, attributeFilter: ['class'] }));

        // Listen for the user's clicks to know when their turn is happening
        // and safely clear the board for the NEXT level's pattern.
        window.addEventListener('mousedown', (e) => {
            // If they clicked a square
            if (squares.includes(e.target) || squares.includes(e.target.parentElement)) {
                if (isRecording && sequence.length > 0) {
                    isRecording = false;
                }
            }
        });
    };
    setupObserver();
})();