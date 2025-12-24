/**
 * injector.js - King Krispy Ultra Edition Frontend
 */
(function() {
    // 1. CREATE BOOT SCREEN & DEBUG CONSOLE (Requirement D & A)
    const splash = document.createElement('div');
    splash.id = 'krispy-loader';
    splash.style = "position:fixed;top:0;left:0;width:100%;height:100%;background:#000;z-index:999999;display:flex;flex-direction:column;justify-content:center;align-items:center;color:#0f0;font-family:sans-serif;";
    splash.innerHTML = `
        <h1 style="font-size:80px;margin-bottom:20px;">GEMINI ULTRA</h1>
        <p style="font-size:30px;color:#fff;">Welcome, King Krispy</p>
        <div id="debug-log" style="margin-top:40px;font-family:monospace;font-size:18px;color:#888;">Initializing system...</div>
    `;
    document.body.appendChild(splash);

    const logger = (msg) => {
        const logBox = document.getElementById('debug-log');
        if(logBox) logBox.innerText = `> ${msg}`;
        console.log(`[KRISPY-DEBUG] ${msg}`);
    };

    // 2. UI STYLING
    const style = document.createElement('style');
    style.innerHTML = `
        body { padding: 4% !important; background: #000 !important; }
        p, span, .message-content { font-size: 28px !important; line-height: 1.6 !important; }
        #krispy-pip { position:fixed; bottom:20px; right:20px; width:480px; height:270px; border:3px solid #0f0; display:none; z-index:9999; background:#000; overflow:hidden; border-radius:10px; }
    `;
    document.head.appendChild(style);

    // 3. SMART SELECTOR & TYPE LOGIC (Requirement B)
    const safeType = (text) => {
        const box = document.querySelector('[role="textbox"]') || document.querySelector('div[contenteditable="true"]');
        if (!box) return logger("Search for Input box...");
        box.focus();
        document.execCommand('insertText', false, text);
        box.dispatchEvent(new Event('input', { bubbles: true }));
        logger("Text Injected Successfully");
    };

    // 4. PIP WINDOW BUILDER
    const pip = document.createElement('div');
    pip.id = 'krispy-pip';
    pip.innerHTML = `<iframe id="yt-f" width="100%" height="100%" frameborder="0" allow="autoplay"></iframe>`;
    document.body.appendChild(pip);

    // 5. REMOTE KEYS
    document.addEventListener('keydown', (e) => {
        switch(e.keyCode) {
            case 403: document.body.style.filter = document.body.style.filter ? '' : 'contrast(1.5) brightness(0.8)'; break; // RED
            case 404: safeType("Be creative: "); break; // GREEN
            case 405: safeType("Summarize this: "); break; // YELLOW
            case 406: // BLUE
                const p = document.getElementById('krispy-pip');
                const f = document.getElementById('yt-f');
                if(p.style.display === 'none') {
                    f.src = "https://www.youtube.com/embed/jfKfPfyJRdk?autoplay=1";
                    p.style.display = 'block';
                } else {
                    f.src = ""; p.style.display = 'none';
                }
                break;
            case 13: // OK
                const btn = document.querySelector('button[aria-label*="Send"]');
                if (btn) btn.click();
                break;
        }
    });

    // 6. BOOT SEQUENCE
    logger("Waiting for Gemini DOM...");
    window.addEventListener('load', () => {
        logger("Gemini Loaded. Ready for King Krispy.");
        setTimeout(() => {
            splash.style.transition = "opacity 1s";
            splash.style.opacity = "0";
            setTimeout(() => splash.remove(), 1000);
        }, 3000);
    });

    logger("Core Shell Injected.");
})();
