export function loadData(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
}

export function saveData(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

export function loadTheme() {
    return localStorage.getItem("tema") === "Tema Gelap";
}

export function saveTheme(isDark) {
    localStorage.setItem("tema", isDark ? "Tema Gelap" : "Terang");
}
