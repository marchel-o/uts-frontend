const dataStok = [
  {
    kode: "BRG-001",
    nama: "Indomie Goreng",
    stokRak: 48,
    stokGudang: 240,
    status: "aman",
  },
  {
    kode: "BRG-002",
    nama: "Aqua 600ml",
    stokRak: 12,
    stokGudang: 36,
    status: "menipis",
  },
  {
    kode: "BRG-003",
    nama: "Pocari Sweat",
    stokRak: 30,
    stokGudang: 90,
    status: "aman",
  },
  {
    kode: "BRG-004",
    nama: "Teh Botol Sosro",
    stokRak: 8,
    stokGudang: 14,
    status: "menipis",
  },
  {
    kode: "BRG-005",
    nama: "Chitato Sapi Panggang",
    stokRak: 22,
    stokGudang: 70,
    status: "aman",
  },
  {
    kode: "BRG-006",
    nama: "Rinso Anti Noda 800g",
    stokRak: 5,
    stokGudang: 9,
    status: "menipis",
  },
  {
    kode: "BRG-007",
    nama: "Gula Pasir Gulaku 1kg",
    stokRak: 40,
    stokGudang: 160,
    status: "aman",
  },
  {
    kode: "BRG-008",
    nama: "Minyak Goreng Tropical 2L",
    stokRak: 6,
    stokGudang: 18,
    status: "menipis",
  },
];

const kolom = ["kode", "nama", "stokRak", "stokGudang", "status"];
const label = [...document.querySelectorAll("thead th")].map(
  ({ textContent }) => textContent,
);
const tbody = document.querySelector("tbody");
const kosong = document.querySelector("#kosong");
const inputCari = document.querySelector("#cari-barang");

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

const renderStok = (daftar) => {
  tbody.replaceChildren(...daftar.map(buatBaris));
  kosong.hidden = daftar.length > 0;
};

const filterStok = (kataKunci) => {
  const q = kataKunci.trim().toLowerCase();

  return dataStok.filter(({ kode, nama, status }) =>
    [kode, nama, status].some((nilai) => nilai.toLowerCase().includes(q)),
  );
};

inputCari.addEventListener("input", () =>
  renderStok(filterStok(inputCari.value)),
);

renderStok(dataStok);
