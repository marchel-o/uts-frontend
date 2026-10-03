tanggal = document.getElementById("tanggal");
tgl_skr = new Date().toLocaleDateString("id-ID");
shift = document.getElementById("statusShift");
tanggal.textContent = tgl_skr
totalTransaksi = document.getElementById("totalTransaksi");
const produkTerjual = document.getElementById("produkTerjual");
const totalSale = document.getElementById("totalSale");



if(sessionStorage.getItem("shiftAktif") === "true") {
    shift.textContent = "Shift Aktif";
}
else {
    shift.textContent = "Shift Belum Aktif";
}


let riwayat = JSON.parse(
    localStorage.getItem("riwayatTransaksi")
) || [];
let penjualan = 0;
let jumlahProduk = 0;

riwayat.forEach(function(item) {
    penjualan += item.total;

    item.items.forEach(function(produk) {
        jumlahProduk += produk.jumlah;
    });
});



totalSale.textContent = "Rp" + penjualan.toLocaleString("id-ID");
totalTransaksi.textContent = riwayat.length;
produkTerjual.textContent = jumlahProduk;



const tabel = document.querySelector("table tbody");
tabel.innerHTML = "";

riwayat.slice(-3).reverse().forEach(function(item) {
    tabel.innerHTML += `
        <tr>
            <td>${item.nomor}</td>
            <td>${item.tanggal}</td>
            <td>Rp${item.total.toLocaleString("id-ID")}</td>
            <td>Selesai</td>
        </tr>
    `;
});

if (riwayat.length === 0) {
    tabel.innerHTML = `
        <tr>
            <td colspan="4">Belum ada transaksi</td>
        </tr>
    `;
}


const logout = document.getElementById("logout");
logout.addEventListener("click", function(e) {
    e.preventDefault();

    let yakin = confirm("Yakin ingin logout?");

    if (yakin) {
        sessionStorage.removeItem("shiftAktif");
        sessionStorage.removeItem("modalAwal");

        window.location.href = "../login/index.html";
    }
});


document.querySelectorAll(".dropdown-toggle").forEach(function (toggle) {
    toggle.addEventListener("click", function (e) {
        e.preventDefault();

        const menu = this.nextElementSibling;
        menu.classList.toggle("active");
    });
});
