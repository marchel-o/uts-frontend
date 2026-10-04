const riwayat = [
    {
        waktu: "10:42",
        kode: "BRG-002",
        nama: "Aqua 600ml",
        jumlah: 6,
        keterangan: "Botol bocor, ditemukan di rak B1",
        status: "menunggu",
    },
    {
        waktu: "09:15",
        kode: "BRG-005",
        nama: "Chitato Sapi Panggang",
        jumlah: 3,
        keterangan: "Kemasan sobek, ditemukan di gudang",
        status: "selesai",
    },
    {
        waktu: "08:30",
        kode: "BRG-008",
        nama: "Minyak Goreng Tropical 2L",
        jumlah: 1,
        keterangan: "Kemasan penyok, ditemukan di rak D3",
        status: "selesai",
    },
];

const kolom = ["waktu", "kode", "nama", "jumlah", "keterangan", "status"];
const label = [...document.querySelectorAll("thead th")].map(
    ({ textContent }) => textContent,
);

const form = document.querySelector("form");
const tbody = document.querySelector("tbody");
const info = document.querySelector("#info");

const fieldWajib = (formEl) =>
    [...formEl.elements].filter(
        (el) =>
            el.name &&
            !el.disabled &&
            !["button", "submit", "reset"].includes(el.type),
    );

const validasiForm = (formEl) => {
    const fields = fieldWajib(formEl);
    fields.forEach((el) => el.setCustomValidity(""));

    const kosong = fields.find((el) => !String(el.value).trim());
    if (kosong) {
        kosong.setCustomValidity("Wajib diisi.");
        kosong.reportValidity();
        return false;
    }

    if (!formEl.checkValidity()) {
        formEl.reportValidity();
        return false;
    }

    return true;
};

const waktuSekarang = () =>
    new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
    });

const buatBaris = (item) => {
    const tr = document.createElement("tr");
    tr.dataset.status = item.status;

    tr.append(
        ...kolom.map((key, i) => {
            const td = document.createElement("td");
            td.dataset.label = label[i];
            td.textContent = item[key];
            return td;
        }),
    );

    return tr;
};

const renderRiwayat = () => {
    tbody.replaceChildren(...riwayat.map(buatBaris));
    info.hidden = riwayat.length > 0;
};

form.addEventListener("input", ({ target }) => {
    if (target.name) target.setCustomValidity("");
});

form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validasiForm(form)) return;

    const { kode, jumlah, nama, keterangan } = Object.fromEntries(
        new FormData(form),
    );

    riwayat.unshift({
        waktu: waktuSekarang(),
        kode: kode.trim(),
        nama: nama.trim(),
        jumlah: Number(jumlah),
        keterangan: keterangan.trim(),
        status: "menunggu",
    });

    renderRiwayat();
    form.reset();
    form.elements.kode.focus();
});

renderRiwayat();
