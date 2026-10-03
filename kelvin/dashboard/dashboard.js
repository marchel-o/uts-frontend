tanggal = document.getElementById("tanggal");
tgl_skr = new Date().toLocaleDateString("id-ID");
shift = document.getElementById("statusShift");
tanggal.textContent = tgl_skr
totalTransaksi = document.getElementById("totalTransaksi");
const produkTerjual = document.getElementById("produkTerjual");
const totalSale = document.getElementById("totalSale");
const penjualan = 125000;



if(sessionStorage.getItem("shiftAktif") === "true") {
    shift.textContent = "Shift Aktif";
}
else {
    shift.textContent = "Shift Belum Aktif";
}

totalTransaksi.textContent = "3";
totalSale.textContent = "Rp" + penjualan.toLocaleString("id-ID");


produkTerjual.textContent = 12;


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
