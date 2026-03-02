document.addEventListener('DOMContentLoaded', async () => {
    const statusBadge = document.getElementById('status-badge');
    const views = document.querySelectorAll('.view');

    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

        // Hide all views first
        views.forEach(v => v.classList.remove('active'));

        if (!tab.url.includes('humanbenchmark.com')) {
            document.getElementById('view-unsupported').classList.add('active');
            statusBadge.textContent = 'Standby';
            return;
        }

        const url = tab.url.toLowerCase();
        let detected = false;

        if (url.includes('/tests/chimp')) {
            document.getElementById('view-chimp').classList.add('active');
            statusBadge.textContent = 'Chimp Test';
            statusBadge.classList.add('active-game');
            detected = true;
        }
        else if (url.includes('/tests/number-memory')) {
            document.getElementById('view-number').classList.add('active');
            statusBadge.textContent = 'Number Memory';
            statusBadge.classList.add('active-game');
            detected = true;
        }
        else if (url.includes('/tests/sequence')) {
            document.getElementById('view-sequence').classList.add('active');
            statusBadge.textContent = 'Sequence Memory';
            statusBadge.classList.add('active-game');
            detected = true;
        }
        else if (url.includes('/tests/typing')) {
            document.getElementById('view-typing').classList.add('active');
            statusBadge.textContent = 'Typing Test';
            statusBadge.classList.add('active-game');
            detected = true;
        }
        else if (url.includes('/tests/verbal-memory')) {
            document.getElementById('view-verbal').classList.add('active');
            statusBadge.textContent = 'Verbal Memory';
            statusBadge.classList.add('active-game');
            detected = true;
        }
        else if (url.includes('/tests/reactiontime')) {
            document.getElementById('view-reaction').classList.add('active');
            statusBadge.textContent = 'Reaction Time';
            statusBadge.classList.add('active-game');
            detected = true;
        }
        else if (url.includes('/tests/aim')) {
            document.getElementById('view-aim').classList.add('active');
            statusBadge.textContent = 'Aim Trainer';
            statusBadge.classList.add('active-game');
            detected = true;
        }
        else if (url.includes('/tests/memory')) {
            document.getElementById('view-memory').classList.add('active');
            statusBadge.textContent = 'Visual Memory';
            statusBadge.classList.add('active-game');
            detected = true;
        }

        if (!detected) {
            document.getElementById('view-unsupported').classList.add('active');
            statusBadge.textContent = 'Idle on Site';
        }

        const buttons = document.querySelectorAll('.run-script');
        buttons.forEach(btn => {
            btn.addEventListener('click', async () => {
                const scriptFile = btn.getAttribute('data-script');
                if (!scriptFile) return;

                const ogHTML = btn.innerHTML;
                btn.innerHTML = ' Injecting... ';
                btn.style.opacity = '0.7';
                btn.style.pointerEvents = 'none';

                try {
                    await chrome.tabs.reload(tab.id);

                    chrome.tabs.onUpdated.addListener(function listener(tabId, info) {
                        if (tabId === tab.id && info.status === 'complete') {
                            chrome.tabs.onUpdated.removeListener(listener);

                            chrome.scripting.executeScript({
                                target: { tabId: tab.id },
                                files: [`scripts/${scriptFile}`],
                                world: "MAIN"
                            });
                        }
                    });

                    setTimeout(() => {
                        btn.innerHTML = ' <span class="icon">✔️</span> Injected ';
                        btn.style.opacity = '1';
                        setTimeout(() => {
                            btn.innerHTML = ogHTML;
                            btn.style.pointerEvents = 'all';
                        }, 2000);
                    }, 300);

                } catch (err) {
                    console.error("Failed to inject script:", err);
                    btn.innerHTML = ' <span class="icon">❌</span> Error ';
                    setTimeout(() => {
                        btn.innerHTML = ogHTML;
                        btn.style.pointerEvents = 'all';
                        btn.style.opacity = '1';
                    }, 2000);
                }
            });
        });

    } catch (e) {
        console.error("Initialization error:", e);
    }
});
