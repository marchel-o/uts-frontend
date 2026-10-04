let found = [];

function drawCart() {
    const cart = getCart();
    el("cart").innerHTML = cart.length ? itemRows(cart, true) : '<p class="hint">Belum ada barang.</p>';
}

function search() {
    const q = el("q").value.trim().toLowerCase();

    if (q.length < 2) {
        found = [];
        el("hasil").innerHTML = "";
        el("info").textContent = "Ketik minimal 2 karakter.";
        return;
    }

    // semua kata harus cocok dengan nama / kode / kategori
    const words = q.split(/\s+/);
    found = PRODUCTS.filter(p => {
        const text = (p.n + " " + p.k + " " + p.c).toLowerCase();
        return words.every(w => text.includes(w));
    });

    el("info").textContent = found.length
        ? found.length + " barang ditemukan."
        : "Barang tidak ditemukan. Coba kata lain atau tanya supervisor.";

    el("hasil").innerHTML = found.map(p => `
        <li>
            <div class="name">${p.n}<small>${p.k} · ${p.c}</small></div>
            <b>${rupiah(p.p)}</b>
            <button class="btn pri" data-k="${p.k}">Tambah</button>
        </li>`).join("");
}

el("q").addEventListener("input", search);

el("q").addEventListener("keydown", e => {
    if (e.key === "Enter" && found.length) {
        addToCart(found[0].k);
        drawCart();
    }
});

el("hasil").addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    addToCart(btn.dataset.k);
    drawCart();
    el("q").focus();
});

el("cart").addEventListener("click", e => {
    const btn = e.target.closest("button");
    if (!btn) return;
    changeQty(btn.dataset.k, Number(btn.dataset.d));
    drawCart();
});

el("bayar").addEventListener("click", e => {
    if (!getCart().length) {
        e.preventDefault();
        el("info").textContent = "Tambahkan barang dulu sebelum bayar.";
    }
});

drawCart();