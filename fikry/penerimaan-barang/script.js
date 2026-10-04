const daftarBarang = [];
const kolom = ["kode", "nama", "jumlah"];
const label = [...document.querySelectorAll("thead th")].map(
  ({ textContent }) => textContent,
);

const formPenerimaan = document.querySelector("#form-penerimaan");
const formBarang = document.querySelector("#form-barang");
const tbody = document.querySelector("tbody");
const info = document.querySelector("#info");
const tombolSimpan = document.querySelector("#simpan");

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

const renderList = (pesan = "Belum ada barang di list.") => {
  tbody.replaceChildren(...daftarBarang.map(buatBaris));
  info.textContent = pesan;
  info.hidden = daftarBarang.length > 0;
  tombolSimpan.disabled = !daftarBarang.length;
};

setTanggalDefault(formPenerimaan.elements.tanggal);

formBarang.addEventListener("input", ({ target }) => {
  if (target.name) target.setCustomValidity("");
});

formPenerimaan.addEventListener("input", ({ target }) => {
  if (target.name) target.setCustomValidity("");
});

formBarang.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validasiForm(formBarang)) return;

  const { kode, nama, jumlah } = Object.fromEntries(new FormData(formBarang));
  daftarBarang.push({
    kode: kode.trim(),
    nama: nama.trim(),
    jumlah: Number(jumlah),
  });

  renderList();
  formBarang.reset();
  formBarang.elements.kode.focus();
});

formPenerimaan.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!validasiForm(formPenerimaan)) return;
  if (!daftarBarang.length) return;

  daftarBarang.length = 0;
  formPenerimaan.reset();
  setTanggalDefault(formPenerimaan.elements.tanggal);
  renderList("Penerimaan berhasil dicatat.");
});

renderList();
