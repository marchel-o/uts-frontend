function loadMembers() {
  try {
    return JSON.parse(localStorage.getItem("kasir_members") || "[]");
  } catch (e) {
    return [];
  }
}
function saveMembers(list) {
  try {
    localStorage.setItem("kasir_members", JSON.stringify(list));
  } catch (e) {}
}

document.getElementById("member-form").addEventListener("submit", function (e) {
  e.preventDefault();
  const name = document.getElementById("fx0").value.trim();
  const phone = document.getElementById("fx1").value.trim();
  const dob = document.getElementById("fx2").value;
  const res = document.getElementById("member-reg-result");
  if (!name || !phone) {
    alert("Nama dan No. HP wajib diisi.");
    return;
  }
  const list = loadMembers();
  if (list.find((m) => m.phone === phone)) {
    alert("No. HP ini sudah terdaftar sebagai member.");
    return;
  }
  const joinDate = new Date().toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
  list.push({ name, phone, dob, points: 0, joinDate, status: "aktif" });
  saveMembers(list);
  res.style.display = "block";
  res.innerHTML = `<h4>Konfirmasi</h4><p>Member <b>${name}</b> berhasil didaftarkan dengan No. HP ${phone}.</p>`;
  e.target.reset();
});
