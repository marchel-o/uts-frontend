const id = load("lastTx", "");
const tx = load("history", []).find(t => t.id === id);

if (!tx) {
    el("content").innerHTML = `
        <div class="card">
            <h2>Belum ada transaksi</h2>
            <p class="hint">Selesaikan pembayaran dulu.</p>
            <a class="btn pri" href="../cari-barang/index.html">Mulai transaksi</a>
        </div>`;
} else {
    const tunai = tx.method === "Tunai";

    el("lbl").textContent = tunai ? "Kembalian" : "Pembayaran " + tx.method + " diterima";
    el("kembali").textContent = rupiah(tunai ? tx.change : tx.total);
    el("void").href = "../void/index.html?id=" + tx.id;

    let struk = `<h2>Kasir Minimart<small>${tx.id} · ${new Date(tx.t).toLocaleString("id-ID")}</small></h2>`;
    struk += itemRows(tx.items);
    struk += `<div class="row"><span>Metode</span><b style="margin-left:auto">${tx.method}${tx.detail ? " (" + tx.detail + ")" : ""}</b></div>`;
    if (tunai) {
        struk += `<div class="row"><span>Tunai</span><b style="margin-left:auto">${rupiah(tx.paid)}</b></div>`;
        struk += `<div class="row"><span>Kembali</span><b style="margin-left:auto">${rupiah(tx.change)}</b></div>`;
    }
    struk += '<p class="hint" style="text-align:center;margin-top:1em">Terima kasih sudah berbelanja</p>';
    el("struk").innerHTML = struk;

    el("cetak").addEventListener("click", () => window.print());

    el("kirim").addEventListener("click", () => {
        const tujuan = el("tujuan").value.trim();
        const valid = /^\S+@\S+\.\S+$/.test(tujuan) || /^(\+62|0)8\d{8,11}$/.test(tujuan);
        el("msg").classList.toggle("ok", valid);
        el("msg").textContent = valid
            ? "Struk digital dikirim ke " + tujuan + "."
            : "Isi email atau nomor WhatsApp yang valid.";
    });
}