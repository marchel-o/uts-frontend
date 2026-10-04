let fails = 0;
let pre = new URLSearchParams(location.search).get("id");

function ambil() {
    const v = el("pilih").value;
    if (v === "__cart") return { items: getCart() };
    return load("history", []).find(t => t.id === v);
}

function detail() {
    const t = ambil();
    el("detail").innerHTML = t ? itemRows(t.items) : '<p class="hint">Tidak ada pesanan dipilih.</p>';
}

function daftar() {
    const cart = getCart();
    const selesai = load("history", []).filter(t => t.status === "selesai").reverse();
    let html = "";

    if (cart.length) {
        html += `<option value="__cart">Pesanan berjalan (belum dibayar) - ${rupiah(total(cart))}</option>`;
    }
    selesai.forEach(t => {
        html += `<option value="${t.id}">${t.id} - ${rupiah(t.total)} (${t.method})</option>`;
    });

    el("pilih").innerHTML = html || '<option value="">Tidak ada pesanan yang bisa di-void</option>';
    if (pre && [...el("pilih").options].some(o => o.value === pre)) el("pilih").value = pre;
    el("void").disabled = !html;
    detail();
}

// Kunci tombol 30 detik setelah 3x PIN salah
function kunci(detik) {
    el("void").disabled = true;
    const timer = setInterval(() => {
        detik--;
        el("msg").textContent = "Terlalu banyak PIN salah. Coba lagi dalam " + detik + " detik.";
        if (detik <= 0) {
            clearInterval(timer);
            fails = 0;
            el("void").disabled = false;
            el("msg").textContent = "";
        }
    }, 1000);
}

el("pilih").addEventListener("change", () => {
    pre = null;
    detail();
    el("msg").textContent = "";
});

el("void").addEventListener("click", () => {
    const t = ambil();
    const alasan = el("alasan").value.trim();
    el("msg").classList.remove("ok");

    if (!t) return (el("msg").textContent = "Pilih pesanan dulu.");
    if (alasan.length < 5) return (el("msg").textContent = "Tulis alasan pembatalan (minimal 5 karakter).");

    if (el("pin").value !== SUPERVISOR_PIN) {
        fails++;
        el("pin").value = "";
        el("pin").focus();
        if (fails >= 3) return kunci(30);
        return (el("msg").textContent = "PIN supervisor salah (" + fails + "/3).");
    }

    const history = load("history", []);
    let kode;

    if (el("pilih").value === "__cart") {
        kode = "TRX" + Date.now().toString().slice(-8);
        history.push({ id: kode, t: Date.now(), items: t.items, total: total(t.items), method: "-", status: "void", alasan });
        save("cart", []);
    } else {
        kode = t.id;
        history.forEach(x => {
            if (x.id === kode) {
                x.status = "void";
                x.alasan = alasan;
                x.voidAt = Date.now();
            }
        });
    }

    save("history", history);
    fails = 0;
    el("alasan").value = "";
    el("pin").value = "";
    pre = null;
    daftar();
    el("msg").classList.add("ok");
    el("msg").textContent = "Transaksi " + kode + " berhasil di-void.";
});

daftar();