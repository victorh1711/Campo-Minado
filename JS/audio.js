export const audioMap = {
    flag: new Audio("/audio/flag.mp3"),
    victory: new Audio("/audio/victory.mp3"),
    lose: new Audio("/audio/lose.mp3")
};

export function playAudio(name) {
    const audio = audioMap[name];
    if (!audio) return;

    const clone = audio.cloneNode();
    clone.play().catch(e => console.log("audio erro:", e));
}