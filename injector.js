/**
 * injector.js - The "Zero-Error" UI Engine
 */
(function() {
    // 1. SMART DOM SELECTOR (Observer Pattern)
    const getPromptBox = () => {
        // Gemini uses several dynamic tags; we look for the prompt role
        return document.querySelector('[role="textbox"]') || 
               document.querySelector('div[contenteditable="true"]') ||
               document.querySelector('.ql-editor');
    };

    // 2. TEXT INJECTION (The execCommand fix)
    const safeType = (text) => {
        const box = getPromptBox();
        if (!box) return;
        box.focus();
        // Use execCommand to preserve Gemini's internal undo/redo and cursor
        document.execCommand('insertText', false, text);
        box.dispatchEvent(new Event('input', { bubbles: true }));
    };

    // 3. REMOTE KEY HANDLER (Keycode Safety)
    document.addEventListener('keydown', (e) => {
        switch(e.keyCode) {
            case 403: document.body.classList.toggle('krispy-oled'); break; // RED
            case 404: safeType("Be creative: "); break; // GREEN
            case 405: safeType("Summarize: "); break; // YELLOW
            case 406: togglePiP(); break; // BLUE
            case 13: 
                const btn = document.querySelector('button[aria-label*="Send"]');
                if (btn) btn.click();
                break;
        }
    });

    // 4. THE "REAL" PHONE BRIDGE (WebSocket Relay)
    // Replace YOUR_CHANNEL_ID with a free Ably/Pusher key for a 100% working remote
    const socket = new WebSocket('wss://realtime-relay.example.com/king-krispy');
    socket.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.text) safeType(data.text);
    };

    // 5. STYLES
    const css = document.createElement('style');
    css.innerHTML = `
        body.krispy-oled { background: #000 !important; }
        #krispy-pip { position:fixed; bottom:20px; right:20px; width:480px; height:270px; border:3px solid #0f0; display:none; z-index:9999; }
    `;
    document.head.appendChild(css);

    // 6. PIP BUILDER
    const pip = document.createElement('div');
    pip.id = 'krispy-pip';
    pip.innerHTML = `<iframe id="yt" width="100%" height="100%" frameborder="0"></iframe>`;
    document.body.appendChild(pip);

    window.togglePiP = () => {
        const f = document.getElementById('yt');
        if (pip.style.display === 'none') {
            f.src = "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1&enablejsapi=1&origin=" + location.origin;
            pip.style.display = 'block';
        } else {
            f.src = ""; pip.style.display = 'none';
        }
    };
})();
