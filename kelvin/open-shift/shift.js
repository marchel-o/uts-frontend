const currDate = document.getElementById("currentDate");
const now = new Date().toLocaleDateString("id-ID"); 
const amountDisp = document.getElementById("amountDisp");
let nominal = "";
const tombol = document.querySelectorAll(".numpad input");
const openShiftBtn = document.getElementById("openShiftBtn");

tombol.forEach(function(btn) {
    btn.addEventListener("click", function() {

        if (btn.value === "C") {
            nominal = "";
        }
        else if(btn.value === "⌫") {
            nominal = nominal.slice(0, -1);
        }
        else {
            nominal += btn.value;
        }
        amountDisp.textContent = nominal;
        amountDisp.textContent = new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0
        }).format(Number(nominal || 0));

    });
});

openShiftBtn.addEventListener("click", function() {
        if (nominal === "" || Number(nominal) <= 0) {
            alert("Masukkan modal awal kasir terlebih dahulu!");
            return;
        }
        sessionStorage.setItem("modalAwal", nominal);
        sessionStorage.setItem("shiftAktif", "true");

        window.location.href = "../dashboard/dashboard.html"
    });


currDate.textContent = now;