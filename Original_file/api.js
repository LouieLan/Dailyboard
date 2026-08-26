export async function ambilKutip() {
    const response = await fetch("https://api.adviceslip.com/advice");
    if (!response.ok) throw new Error("Kutipan tidak tersedia");
    const data = await response.json();
    return data.slip.advice;
}

export async function ambilCuaca(kota, apiKey) {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(kota)}&appid=${apiKey}`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("Kota tidak ditemukan!");
    const data = await response.json();
    return data;
}
