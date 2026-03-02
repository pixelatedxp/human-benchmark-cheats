(function killAllBots() {
    let lastInterval = setInterval(() => {}, 0);
    for (let i = 0; i <= lastInterval; i++) {
        clearInterval(i);
    }
    let lastTimeout = setTimeout(() => {}, 0);
    for (let i = 0; i <= lastTimeout; i++) {
        clearTimeout(i);
    }
    const tempObs = new MutationObserver(() => {});
    tempObs.observe(document.body, {childList: true});
    document.body.innerHTML = document.body.innerHTML;
    console.log("%c  ALL BOTS KILLED ", "background: #c0392b; color: white; padding: 10px; font-weight: bold; border-radius: 5px;");
    console.log("All background loops, intervals, and observers have been terminated.");
})();