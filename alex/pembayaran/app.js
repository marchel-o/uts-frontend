const items = getCart();
const T = total(items);

if (!items.length) {
    el("content").innerHTML = `
        <div class="card">
            <h2>Belum ada pesanan</h2>
            <p class="hint">Cari dan tambahkan barang dulu.</p>
            <a class="btn pri" href="../cari-barang/index.html">Cari barang</a>
        </div>`;
} else {
    init();
}

function init() {
    el("cart").innerHTML = itemRows(items);
    el("tot").textContent = rupiah(T);

    // Tombol nominal cepat: uang pas + pecahan terdekat
    const seen = new Set();
    [T, Math.ceil(T / 10000) * 10000, 50000, 100000, 200000]
        .filter(n => n >= T && !seen.has(n) && seen.add(n))
        .slice(0, 4)
        .forEach(n => {
            const btn = document.createElement("button");
            btn.type = "button";
            btn.className = "btn";
            btn.dataset.n = n;
            btn.textContent = n === T ? "Uang pas" : rupiah(n);
            el("quick").appendChild(btn);
        });

    function selisih() {
        const u = angka(el("uang").value);
        el("selisih").textContent = !u ? "" : u < T ? "Kurang " + rupiah(T - u) : "Kembalian " + rupiah(u - T);
    }

    el("quick").addEventListener("click", e => {
        const btn = e.target.closest("button");
        if (!btn) return;
        el("uang").value = Number(btn.dataset.n).toLocaleString("id-ID");
        selisih();
    });

    el("uang").addEventListener("input", e => {
        const n = angka(e.target.value);
        e.target.value = n ? n.toLocaleString("id-ID") : "";
        selisih();
    });

    el("kartu4").addEventListener("input", e => {
        e.target.value = e.target.value.replace(/\D/g, "");
    });

    document.querySelectorAll("[name=m]").forEach(radio => {
        radio.addEventListener("change", () => {
            ["Tunai", "QRIS", "Kartu"].forEach(m => {
                el("p-" + m).hidden = m !== radio.value;
            });
            el("err").textContent = "";
        });
    });

    function error(msg) {
        el("err").textContent = msg;
    }

    el("proses").addEventListener("click", () => {
        const method = document.querySelector("[name=m]:checked").value;
        let paid = T;
        let change = 0;
        let detail = "";

        if (method === "Tunai") {
            paid = angka(el("uang").value);
            if (paid < T) return error("Uang kurang " + rupiah(T - paid) + ".");
            change = paid - T;
        } else if (method === "Kartu") {
            const digit = el("kartu4").value.trim();
            if (!/^\d{4}$/.test(digit)) return error("Isi 4 digit terakhir kartu.");
            detail = el("jenis").value + " •••• " + digit;
        } else if (!el("qrisok").checked) {
            return error("Centang dulu setelah pembayaran QRIS diterima.");
        }

        const id = "TRX" + Date.now().toString().slice(-8);
        const history = load("history", []);
        history.push({ id, t: Date.now(), items, total: T, method, detail, paid, change, status: "selesai" });
        save("history", history);
        save("lastTx", id);
        save("cart", []);
        location.href = "../transaksi/index.html";
    });
}