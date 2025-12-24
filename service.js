/**
 * service.js - Background Logic for King Krispy
 */
(function() {
    const chromeUA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36";

    // 1. IDENTITY SPOOFING
    try {
        if (tizen.websetting) {
            tizen.websetting.setUserAgentString(chromeUA, () => {
                console.log("UA Spoof Active");
            });
        }
    } catch (e) { console.log("UA Error: " + e.message); }

    // 2. REGISTER PHYSICAL KEYS
    const keys = ["ColorF0Red", "ColorF1Green", "ColorF2Yellow", "ColorF3Blue", "MediaPlayPause"];
    keys.forEach(k => {
        try { tizen.tvinputdevice.registerKey(k); } catch(e) {}
    });

    // 3. FORCE SCREEN ON
    try { tizen.power.request("SCREEN", "SCREEN_NORMAL"); } catch(e) {}
})();
