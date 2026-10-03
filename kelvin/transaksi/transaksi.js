const produk = [
    {
        nama: "Indomie Goreng",
        harga: 3500
    },
    {
        nama: "Air Mineral",
        harga: 4000
    },
    {
        nama: "Roti Coklat",
        harga: 5000
    }
];

const produkList = document.getElementById("produkList");

produk.forEach(function(item, index) {
    produkList.innerHTML += `
        <div class="produk-item">
            <h4>${item.nama}</h4>
            <p>Rp${item.harga.toLocaleString("id-ID")}</p>
            <button onclick="tambahProduk(${index})">Tambah</button>
        </div>
    `;
});

let keranjang = [];
function tambahProduk(index) {
    const item = produk[index];

    const ada = keranjang.find(function(barang) {
        return barang.nama === item.nama;
    });

    if (ada) {
        ada.jumlah++;
    }
    else {
        keranjang.push({
            nama: item.nama,
            harga: item.harga,
            jumlah: 1
        });
    }
    tampilkanKeranjang();

}

function tampilkanKeranjang() {
    const keranjangList = document.getElementById("keranjangList");
    const totalBelanja = document.getElementById("totalBelanja");
    keranjangList.innerHTML = "";
    let total = 0;


    keranjang.forEach(function(item, index) {
        const subtotal = item.harga * item.jumlah;
        total += subtotal;

        keranjangList.innerHTML += `
            <tr>
                <td>${item.nama}</td>
                <td>Rp${item.harga.toLocaleString("id-ID")}</td>
                <td>
                    <button onclick="ubahJumlah(${index}, -1)">-</button>
                    ${item.jumlah}
                    <button onclick="ubahJumlah(${index}, 1)">+</button>
                </td>
                <td>Rp${subtotal.toLocaleString("id-ID")}</td>
                <td>
                    <button onclick="hapusProduk(${index})">Hapus</button>
                </td>
            </tr>
        `;
    });

    totalBelanja.textContent = "Total: Rp" + total.toLocaleString("id-ID");
}

function ubahJumlah(index, perubahan) {
    keranjang[index].jumlah += perubahan;

    if (keranjang[index].jumlah <= 0) {
        keranjang.splice(index, 1);
    }

    tampilkanKeranjang();
}

function hapusProduk(index) {
    keranjang.splice(index, 1);
    tampilkanKeranjang();
}





const uangBayar = document.getElementById("uangBayar");
const kembalian = document.getElementById("kembalian");
uangBayar.addEventListener("input", function() {
    let total = 0;

    keranjang.forEach(function(item) {
        total += item.harga * item.jumlah;
    });

    const bayar = Number(uangBayar.value);
    const selisih = bayar - total;

    if (bayar === 0) {
        kembalian.textContent = "Kembalian: Rp0";
    } 
    else if (selisih < 0) {
        kembalian.textContent =
            "Uang kurang: Rp" + Math.abs(selisih).toLocaleString("id-ID");
    }
    else {
        kembalian.textContent =
            "Kembalian: Rp" + selisih.toLocaleString("id-ID");
    }
});



const btnBayar = document.getElementById("btnBayar");
document.getElementById("tanggal").textContent =
    new Date().toLocaleDateString("id-ID");

btnBayar.addEventListener("click", function() {
    let total = 0;

    keranjang.forEach(function(item) {
        total += item.harga * item.jumlah;
    });

    const bayar = Number(uangBayar.value);

    if (keranjang.length === 0) {
        alert("Keranjang masih kosong!");
    }
    else if (uangBayar.value === "" || bayar <= 0) {
        alert("Masukkan uang pembayaran!");
    }
    else if (bayar < total) {
        alert("Uang pembayaran kurang!");
    }
    else {
        const kembali = bayar - total;

        let riwayat = JSON.parse(
            localStorage.getItem("riwayatTransaksi")
        ) || [];

        riwayat.push({
            nomor: "UTS" + (Date.now()),
            tanggal: new Date().toLocaleString("id-ID"),
            items: keranjang.map(function(item) {
                return {
                    nama: item.nama,
                    harga: item.harga,
                    jumlah: item.jumlah,
                    subtotal: item.harga * item.jumlah
                };
            }),
            total: total,
            bayar: bayar,
            kembalian: kembali
        });

        localStorage.setItem(
            "riwayatTransaksi",
            JSON.stringify(riwayat)
        );

        alert(
            "Transaksi berhasil!\n" +
            "Total: Rp" + total.toLocaleString("id-ID") + "\n" +
            "Bayar: Rp" + bayar.toLocaleString("id-ID") + "\n" +
            "Kembalian: Rp" + kembali.toLocaleString("id-ID")
        );

        keranjang = [];
        tampilkanKeranjang();

        uangBayar.value = "";
        kembalian.textContent = "Kembalian: Rp0";
    }
});


document.querySelectorAll(".dropdown-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
        e.preventDefault();

        const menu = this.nextElementSibling;
        menu.classList.toggle("active");
    });
});

