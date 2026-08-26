import { loadData, saveData } from "./storage.js";

export function buatStoreCatatan() {
    let daftar = loadData("daftar-catatan", []);

    function simpan() {
        saveData("daftar-catatan", daftar);
    }

    return {
        semua: () => [...daftar],
        tambah(isi) {
            daftar.push({
                id: Date.now(),
                isi,
                tanggal: new Date().toLocaleDateString()
            });
            simpan();
        },
        hapus(id) {
            daftar = daftar.filter((catatan) => catatan.id !== id);
            simpan();
        },
        edit(id, isi) {
            daftar = daftar.map((catatan) =>
                catatan.id === id ? { ...catatan, isi } : catatan
            );
            simpan();
        }
    };
}
