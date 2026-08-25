import { buatStoreTugas } from "./tugas.js";
import { buatStoreCatatan } from "./catatan.js";
import { ambilKutip, ambilCuaca } from "./api.js";
import { loadTheme, saveTheme } from "./storage.js";

const app = document.getElementById("app");
const storeTugas = buatStoreTugas();
const storeCatatan = buatStoreCatatan();

function validasiInput(nilai) {
    const teks = String(nilai || "").trim();
    if (!teks) { alert("Input tidak boleh kosong!"); return false; }
    if (teks.length > 100) { alert("Input maksimal 100 karakter!"); return false; }
    return true;
}

const judulBaris = document.createElement("div");
judulBaris.className = "dashboard-title-row";
const judul = document.createElement("h2");
judul.className = "dashboard-title";
judul.textContent = "Selamat datang di Dailyboard";
const toggleTema = document.createElement("button");
toggleTema.type = "button";
toggleTema.id = "toggle-tema";
toggleTema.className = "btn btn-theme";
judulBaris.append(judul, toggleTema);
app.appendChild(judulBaris);

const tugas = document.createElement("section");
tugas.className = "panel panel-tugas";
tugas.appendChild(document.createTextNode("Tugas"));
const tombolTambah = document.createElement("button");
tombolTambah.type = "button";
tombolTambah.className = "btn btn-primary";
tombolTambah.textContent = "Tambah";
const inputTugas = document.createElement("input");
inputTugas.className = "task-input";
inputTugas.placeholder = "Tambahkan tugas";
const cariTugas = document.createElement("input");
cariTugas.type = "search";
cariTugas.className = "cari-tugas";
cariTugas.placeholder = "Cari tugas...";
const daftarTugas = document.createElement("ul");
daftarTugas.id = "daftug";
daftarTugas.className = "todo-list";
tugas.append(tombolTambah, inputTugas, cariTugas, daftarTugas);
app.appendChild(tugas);
let filterAktif = "semua";

function renderTugas() {
    const kataKunci = cariTugas.value.trim().toLowerCase();
    daftarTugas.innerHTML = "";
    storeTugas.filter(filterAktif).filter((item) => item.nama.toLowerCase().includes(kataKunci)).forEach((item) => {
        const li = document.createElement("li");
        li.className = `tugas-item ${item.selesai ? "selesai" : ""}`;
        li.style.textDecoration = item.selesai ? "line-through" : "none";
        li.appendChild(document.createTextNode(item.nama));
        const tombolHapus = document.createElement("button");
        tombolHapus.type = "button";
        tombolHapus.className = "btn btn-delete";
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", (event) => {
            event.stopPropagation();
            storeTugas.hapus(item.id);
            renderTugas();
        });
        li.appendChild(tombolHapus);
        li.addEventListener("click", () => { storeTugas.toggleSelesai(item.id); renderTugas(); });
        li.addEventListener("dblclick", () => {
            const namaBaru = prompt("Edit tugas:", item.nama);
            if (namaBaru !== null && validasiInput(namaBaru)) { storeTugas.edit(item.id, namaBaru.trim()); renderTugas(); }
        });
        daftarTugas.appendChild(li);
    });
}

function debounce(fn, delay) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => fn(...args), delay);
    };
}

const cariTugasDebounced = debounce(renderTugas, 300);

tombolTambah.addEventListener("click", () => {
    if (!validasiInput(inputTugas.value)) return;
    storeTugas.tambah(inputTugas.value.trim());
    inputTugas.value = "";
    renderTugas();
});
cariTugas.addEventListener("input", cariTugasDebounced);
[["semua", "all"], ["selesai", "done"], ["belum", "pending"]].forEach(([nama, kelas]) => {
    const tombol = document.createElement("button");
    tombol.type = "button";
    tombol.className = `filter-btn filter-${kelas}`;
    tombol.textContent = nama;
    tombol.addEventListener("click", () => { filterAktif = nama; renderTugas(); });
    tugas.appendChild(tombol);
});
renderTugas();

const catatan = document.createElement("section");
catatan.className = "panel panel-catatan";
catatan.appendChild(document.createTextNode("Catatan cepat"));
const formCatatan = document.createElement("form");
formCatatan.className = "note-form";
const inputCatatan = document.createElement("textarea");
inputCatatan.className = "note-input";
inputCatatan.placeholder = "Tulis catatan";
const tombolSimpanCatatan = document.createElement("button");
tombolSimpanCatatan.type = "submit";
tombolSimpanCatatan.className = "btn btn-note";
tombolSimpanCatatan.textContent = "Simpan";
formCatatan.append(inputCatatan, tombolSimpanCatatan);
const daftarCatatan = document.createElement("div");
daftarCatatan.id = "daftar-catatan";
daftarCatatan.className = "note-list";
catatan.append(formCatatan, daftarCatatan);
app.appendChild(catatan);

function renderCatatan() {
    daftarCatatan.innerHTML = "";
    storeCatatan.semua().forEach((item) => {
        const kartu = document.createElement("div");
        kartu.className = "catatan-item note-kartu";
        const tulisan = document.createElement("p");
        tulisan.textContent = item.isi;
        const tanggal = document.createElement("small");
        tanggal.textContent = item.tanggal;
        const tombolHapus = document.createElement("button");
        tombolHapus.type = "button";
        tombolHapus.className = "btn btn-delete";
        tombolHapus.textContent = "Hapus";
        tombolHapus.addEventListener("click", (event) => { event.stopPropagation(); storeCatatan.hapus(item.id); renderCatatan(); });
        kartu.append(tulisan, tanggal, tombolHapus);
        kartu.addEventListener("dblclick", () => {
            const isiBaru = prompt("Edit catatan:", item.isi);
            if (isiBaru !== null && validasiInput(isiBaru)) { storeCatatan.edit(item.id, isiBaru.trim()); renderCatatan(); }
        });
        daftarCatatan.appendChild(kartu);
    });
}
formCatatan.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!validasiInput(inputCatatan.value)) return;
    storeCatatan.tambah(inputCatatan.value.trim());
    inputCatatan.value = "";
    renderCatatan();
});
renderCatatan();

const cuaca = document.createElement("section");
cuaca.className = "panel panel-cuaca";
cuaca.appendChild(document.createTextNode("Cuaca"));
const formCuaca = document.createElement("form");
formCuaca.className = "form-cuaca";
const inputKota = document.createElement("input");
inputKota.className = "kota-input";
inputKota.placeholder = "Masukkan nama kota...";
inputKota.required = true;
const tombolCuaca = document.createElement("button");
tombolCuaca.type = "submit";
tombolCuaca.className = "btn btn-cuaca";
tombolCuaca.textContent = "Cek Cuaca";
const hasilCuaca = document.createElement("div");
hasilCuaca.className = "cuaca-hasil";
formCuaca.append(inputKota, tombolCuaca);
cuaca.append(formCuaca, hasilCuaca);
app.appendChild(cuaca);
formCuaca.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!validasiInput(inputKota.value)) return;
    hasilCuaca.textContent = "Memuat data cuaca...";
    try {
        const data = await ambilCuaca(inputKota.value.trim(), "3dcd75f92eb1bb27e7d2c952c3b9fd6b");
        hasilCuaca.innerHTML = `<p>Sekarang ${data.main.temp}°F di ${data.name}</p><p>Keterangan: ${data.weather[0].description}</p>`;
    } catch (error) { hasilCuaca.textContent = error.message; }
});

const kutipan = document.createElement("section");
kutipan.className = "panel panel-kutip";
const judulKutip = document.createElement("h3");
judulKutip.textContent = "Kutipan hari ini";
const teksKutip = document.createElement("blockquote");
const tombolRefreshKutip = document.createElement("button");
tombolRefreshKutip.type = "button";
tombolRefreshKutip.className = "btn btn-refresh-kutip";
tombolRefreshKutip.textContent = "Refresh kutipan";
kutipan.append(judulKutip, teksKutip, tombolRefreshKutip);
app.appendChild(kutipan);
async function tampilkanKutip() {
    teksKutip.textContent = "Memuat kutipan...";
    try { teksKutip.textContent = await ambilKutip(); }
    catch { teksKutip.textContent = "Kutipan tidak tersedia saat ini"; }
}
tombolRefreshKutip.addEventListener("click", tampilkanKutip);

const infoStatus = document.createElement("div");
infoStatus.className = "info-status";
infoStatus.textContent = "Memuat data...";
app.insertBefore(infoStatus, tugas);
const temaGelap = loadTheme();
document.body.classList.toggle("dark-mode", temaGelap);
toggleTema.textContent = temaGelap ? "Tema terang" : "Tema gelap";
toggleTema.addEventListener("click", () => {
    const modeAktif = document.body.classList.toggle("dark-mode");
    toggleTema.textContent = modeAktif ? "Tema terang" : "Tema gelap";
    saveTheme(modeAktif);
});
Promise.all([tampilkanKutip(), ambilCuaca("Bandung", "3dcd75f92eb1bb27e7d2c952c3b9fd6b")])
    .then(() => { infoStatus.textContent = "Data berhasil dimuat"; })
    .catch(() => { infoStatus.textContent = "Data gagal dimuat"; });