const PRODUCTS = [
    ["8991001", "Mie Instan Goreng", "Makanan", 3500],
    ["8991002", "Mie Instan Kuah Soto", "Makanan", 3200],
    ["8991003", "Sarden Kaleng 155g", "Makanan", 13500],
    ["8992001", "Air Mineral 600ml", "Minuman", 3500],
    ["8992002", "Teh Botol 350ml", "Minuman", 5000],
    ["8992003", "Susu UHT Coklat 200ml", "Minuman", 6500],
    ["8992004", "Kopi Sachet 3in1", "Minuman", 2000],
    ["8993001", "Beras Premium 5kg", "Sembako", 72000],
    ["8993002", "Minyak Goreng 1L", "Sembako", 18500],
    ["8993003", "Gula Pasir 1kg", "Sembako", 17000],
    ["8993004", "Telur Ayam 1/2kg", "Sembako", 16000],
    ["8994001", "Roti Tawar", "Roti & Snack", 16500],
    ["8994002", "Biskuit Coklat", "Roti & Snack", 9000],
    ["8995001", "Sabun Mandi Batang", "Kebersihan", 4500],
    ["8995002", "Deterjen Bubuk 800g", "Kebersihan", 22000],
    ["8995003", "Tisu Wajah 250s", "Kebersihan", 12500]
].map(([k, n, c, p]) => ({ k, n, c, p }));

const SUPERVISOR_PIN = "123456"; // demo saja, di sistem asli dicek di server

const el = id => document.getElementById(id);
const rupiah = n => "Rp" + Number(n).toLocaleString("id-ID");
const angka = v => parseInt(String(v).replace(/\D/g, ""), 10) || 0;

function load(key, fallback) {
    try {
        return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch (e) {
        return fallback;
    }
}

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

const getCart = () => load("cart", []);
const total = items => items.reduce((sum, i) => sum + i.p * i.q, 0);

function addToCart(kode) {
    const cart = getCart();
    const item = cart.find(i => i.k === kode);
    if (item) {
        item.q++;
    } else {
        const p = PRODUCTS.find(x => x.k === kode);
        cart.push({ k: p.k, n: p.n, p: p.p, q: 1 });
    }
    save("cart", cart);
}

function changeQty(kode, delta) {
    const cart = getCart();
    cart.forEach(i => {
        if (i.k === kode) i.q += delta;
    });
    save("cart", cart.filter(i => i.q > 0));
}

// Baris item + total (dipakai di panel pesanan, struk, dan halaman void)
function itemRows(items, editable = false) {
    const rows = items.map(i => `
        <div class="row">
            <div class="name">${i.n}<small>${i.q} × ${rupiah(i.p)}</small></div>
            ${editable ? `<div class="qty">
                <button data-k="${i.k}" data-d="-1" aria-label="Kurangi">−</button>
                <button data-k="${i.k}" data-d="1" aria-label="Tambah">+</button>
            </div>` : ""}
            <b>${rupiah(i.p * i.q)}</b>
        </div>`).join("");
    return rows + `<div class="row sum"><span>Total</span><b>${rupiah(total(items))}</b></div>`;
}