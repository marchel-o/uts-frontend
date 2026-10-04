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

let currentMemberPhone = null;
function searchMember() {
  const q = document.getElementById("sq").value.trim();
  const res = document.getElementById("member-result");
  if (!q) {
    alert("Masukkan No. HP / No. Kartu Member.");
    return;
  }
  const m = loadMembers().find((x) => x.phone === q);
  res.style.display = "block";
  if (!m) {
    currentMemberPhone = null;
    res.innerHTML =
      "<h4>Konfirmasi</h4><p>Member dengan No. HP tersebut belum terdaftar.</p>";
    return;
  }
  currentMemberPhone = m.phone;
  res.innerHTML = `<h4>Konfirmasi</h4><p>Nama: <b>${m.name}</b></p><p>Total Poin: <b id="pts-val">${m.points} pts</b></p>
    <p>Tukar 100 poin = diskon Rp1.000</p>
    <div class="scan-row" style="margin-top:12px"><input id="pts-amount" type="number" placeholder="Nominal belanja (Rp)">
    <button type="button" class="btn" onclick="addPoints()">+ Tambah Poin</button></div>`;
}
function addPoints() {
  if (!currentMemberPhone) {
    alert("Cari member dulu.");
    return;
  }
  const amt = parseInt(document.getElementById("pts-amount").value || "0", 10);
  if (!amt || amt <= 0) {
    alert("Masukkan nominal belanja yang valid.");
    return;
  }
  const earned = Math.floor(amt / 1000);
  const list = loadMembers();
  const m = list.find((x) => x.phone === currentMemberPhone);
  if (!m) return;
  m.points += earned;
  saveMembers(list);
  document.getElementById("pts-val").textContent = m.points + " pts";
  document.getElementById("pts-amount").value = "";
  alert(`+${earned} poin ditambahkan.`);
}
