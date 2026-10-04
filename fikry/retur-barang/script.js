const daftarSupplier = [
  "PT Indofood Sukses Makmur",
  "PT Sinar Sosro",
  "PT Unilever Indonesia",
];

const daftarAlasan = ["Rusak", "Expired", "Salah Kirim"];

const daftarRetur = [];
const kolom = ["kode", "jumlah", "alasan"];
const label = [...document.querySelectorAll("thead th")].map(
  ({ textContent }) => textContent,
);

const formDokumen = document.querySelector("#form-dokumen");
const formBarang = document.querySelector("#form-barang");
const tbody = document.querySelector("tbody");
const info = document.querySelector("#info");
const tombolProses = document.querySelector("#proses");

const fieldWajib = (form) =>
  [...form.elements].filter(
    (el) =>
      el.name &&
      !el.disabled &&
      !["button", "submit", "reset"].includes(el.type),
  );

const validasiForm = (form) => {
  const fields = fieldWajib(form);
  fields.forEach((el) => el.setCustomValidity(""));

  const kosong = fields.find((el) => !String(el.value).trim());
  if (kosong) {
    kosong.setCustomValidity("Wajib diisi.");
    kosong.reportValidity();
    return false;
  }

  if (!form.checkValidity()) {
    form.reportValidity();
    return false;
  }

  return true;
};

const setTanggalDefault = (input) => {
  if (!input.value) {
    input.value = new Date().toLocaleDateString("sv-SE");
  }
};

const buatBaris = (item) => {
  const tr = document.createElement("tr");
  const tdAksi = document.createElement("td");
  tdAksi.append(
    Object.assign(document.createElement("button"), {
      type: "button",
      textContent: "Hapus",
    }),
  );

  tr.append(
    ...kolom.map((key, i) => {
      const td = document.createElement("td");
      td.dataset.label = label[i];
      td.textContent = item[key];
      return td;
    }),
    tdAksi,
  );

  return tr;
};

const renderRetur = (pesan = "Belum ada barang retur di list.") => {
  tbody.replaceChildren(...daftarRetur.map(buatBaris));
  info.textContent = pesan;
  info.hidden = daftarRetur.length > 0;
  tombolProses.disabled = !daftarRetur.length;
};

daftarSupplier.forEach((nama) => {
  formDokumen.elements.supplier.append(new Option(nama, nama));
});

daftarAlasan.forEach((nama) => {
  formBarang.elements.alasan.append(new Option(nama, nama));
});

setTanggalDefault(formDokumen.elements.tanggal);

formBarang.addEventListener("input", ({ target }) => {
  if (target.name) target.setCustomValidity("");
});

formBarang.addEventListener("change", ({ target }) => {
  if (target.name) target.setCustomValidity("");
});

formDokumen.addEventListener("input", ({ target }) => {
  if (target.name) target.setCustomValidity("");
});

formDokumen.addEventListener("change", ({ target }) => {
  if (target.name) target.setCustomValidity("");
});

formBarang.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validasiForm(formBarang)) return;

  const { kode, jumlah, alasan } = Object.fromEntries(new FormData(formBarang));
  daftarRetur.push({ kode: kode.trim(), jumlah: Number(jumlah), alasan });

  renderRetur();
  formBarang.reset();
  formBarang.elements.kode.focus();
});

tbody.addEventListener("click", ({ target }) => {
  const tombol = target.closest("button");
  if (!tombol) return;

  daftarRetur.splice(tombol.closest("tr").sectionRowIndex, 1);
  renderRetur();
});

formDokumen.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validasiForm(formDokumen)) return;
  if (!daftarRetur.length) return;

  daftarRetur.length = 0;
  formDokumen.reset();
  setTanggalDefault(formDokumen.elements.tanggal);
  renderRetur("Retur berhasil diproses.");
});

renderRetur();
