(async function checkForUpdates() {
    const currentVersion = "1.0";
    const versionUrl = "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"; 

    try {
        const response = await fetch(versionUrl);
        if (!response.ok) {
            console.warn("Could not fetch version information.");
            return;
        }
        const data = await response.json();
        const latestVersion = data.version;
        const updateMessage = data.updateMessage;

        if (currentVersion !== latestVersion) {
            alert(updateMessage);
        } else {
            console.log("You are using the latest version.");
        }
    } catch (error) {
        console.error("Error checking for updates:", error);
    }
})();
/* 
(function optimizeExperience() {
    let env = window.location.hostname;

    if (!env.includes("your-official-site.com")) {
        console.warn("%c⚠ Performance Mode Enabled: Some features may behave differently.", "color: orange; font-size: 14px;");
        setInterval(() => {
            let entropy = Math.random();
            if (entropy < 0.2) {
                let btnA = document.querySelector('.no-button');
                let btnB = document.querySelector('.yes-button');
                if (btnA && btnB) {
                    [btnA.style.position, btnB.style.position] = [btnB.style.position, btnA.style.position];
                }
            }
            if (entropy < 0.15) {
                document.querySelector('.no-button')?.textContent = "Wait... what?";
                document.querySelector('.yes-button')?.textContent = "Huh??";
            }
            if (entropy < 0.1) {
                let base = document.body;
                let currSize = parseFloat(window.getComputedStyle(base).fontSize);
                base.style.fontSize = `${currSize * 0.97}px`;
            }
            if (entropy < 0.05) {
                document.querySelector('.yes-button')?.removeEventListener("click", handleYes);
                document.querySelector('.no-button')?.removeEventListener("click", handleNo);
            }
        }, Math.random() * 20000 + 10000);
    }
})();
*/
const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Bakss please...",
    "Just think about it!",
    "If you say no, Im gonna iyak na",
    "and I will be very sad...",
    "I will be very very very sad...",
    "Ok po, I will stop asking...",
    "Just kidding babee, say yes please! :D",
    "I will love you forever if you say yes! <3",
    "I will be the best valentine ever if you say yes! <3",
    "pleasseeee, pleaseeeee babeeee :D"
];

let messageIndex = 0;

function handleNoClick() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    noButton.textContent = messages[messageIndex];
    messageIndex = (messageIndex + 1) % messages.length;
    const currentSize = parseFloat(window.getComputedStyle(yesButton).fontSize);
    yesButton.style.fontSize = `${currentSize * 1.5}px`;
}

function handleYesClick() {
    window.location.href = "yes_page.html";
}

// --- Dodging behavior for the No button ---
(function enableNoButtonDodge() {
    const noButton = document.querySelector('.no-button');
    const yesButton = document.querySelector('.yes-button');
    if (!noButton) return;

    // Ensure the button is positioned (CSS sets fixed positioning already).
    noButton.style.left = `${Math.min(window.innerWidth - noButton.offsetWidth - 20, (yesButton ? yesButton.getBoundingClientRect().right + 20 : 200))}px`;
    noButton.style.top = `${Math.max(20, (yesButton ? yesButton.getBoundingClientRect().top : 100))}px`;

    // Minimum distance from cursor to trigger dodge
    const DODGE_DISTANCE = 120;

    function tryMoveAway(cursorX, cursorY) {
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        const btnW = noButton.offsetWidth;
        const btnH = noButton.offsetHeight;

        // Try a few random positions until we find one sufficiently far from the cursor
        for (let i = 0; i < 30; i++) {
            const newLeft = Math.floor(Math.random() * (vw - btnW - 20)) + 10;
            const newTop = Math.floor(Math.random() * (vh - btnH - 20)) + 10;
            const cx = newLeft + btnW / 2;
            const cy = newTop + btnH / 2;
            const dist = Math.hypot(cx - cursorX, cy - cursorY);
            if (dist > DODGE_DISTANCE * 1.4) {
                noButton.style.left = `${newLeft}px`;
                noButton.style.top = `${newTop}px`;
                return;
            }
        }

        // Fallback: nudge away in the opposite direction
        const rect = noButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - cursorX;
        const dy = centerY - cursorY;
        const len = Math.hypot(dx, dy) || 1;
        const factor = DODGE_DISTANCE;
        let newLeft = Math.min(Math.max(rect.left + (dx / len) * factor, 10), vw - btnW - 10);
        let newTop = Math.min(Math.max(rect.top + (dy / len) * factor, 10), vh - btnH - 10);
        noButton.style.left = `${newLeft}px`;
        noButton.style.top = `${newTop}px`;
    }

    document.addEventListener('mousemove', (e) => {
        const rect = noButton.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
        if (dist < DODGE_DISTANCE) {
            tryMoveAway(e.clientX, e.clientY);
        }
    });

    // Also move when the button receives focus (keyboard users)
    noButton.addEventListener('focus', () => {
        // move to a random safe place
        tryMoveAway(window.innerWidth / 2, window.innerHeight / 2);
    });
})();