function loadCashOut() {
  try {
    return JSON.parse(localStorage.getItem("kasir_cashout") || "[]");
  } catch (e) {
    return [];
  }
}
function saveCashOut(list) {
  try {
    localStorage.setItem("kasir_cashout", JSON.stringify(list));
  } catch (e) {}
}

function renderCashOutList() {
  const tbody = document.getElementById("cashout-rows");
  const list = loadCashOut();
  tbody.innerHTML =
    list
      .slice()
      .reverse()
      .map(
        (it) =>
          `<tr><td>${it.time}</td><td>Rp ${it.amount.toLocaleString("id-ID")}</td><td>${it.note}</td></tr>`,
      )
      .join("") ||
    '<tr><td colspan="3">Belum ada catatan kas keluar hari ini.</td></tr>';
  const total = list.reduce((a, it) => a + it.amount, 0);
  document.getElementById("cashout-total").textContent =
    "Rp " + total.toLocaleString("id-ID");
}
function clearCashOut() {
  if (
    !confirm(
      "Hapus semua riwayat kas keluar? Tindakan ini tidak bisa dibatalkan.",
    )
  )
    return;
  localStorage.removeItem("kasir_cashout");
  renderCashOutList();
}
document
  .getElementById("cashout-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    const amount = parseInt(document.getElementById("fx0").value || "0", 10);
    const note = document.getElementById("fx1").value.trim();
    if (!amount || !note) {
      alert("Isi nominal dan keterangan terlebih dahulu.");
      return;
    }
    const now = new Date();
    const time =
      now.toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }) +
      ", " +
      now.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    const list = loadCashOut();
    list.push({ time, amount, note });
    saveCashOut(list);
    document.getElementById("fx0").value = "";
    document.getElementById("fx1").value = "";
    renderCashOutList();
  });
document.addEventListener("DOMContentLoaded", renderCashOutList);
