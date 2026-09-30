const loginForm = document.getElementById("loginForm");
const admin = {
    username: "admin",
    pin: "1234"
};

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const pin = document.getElementById("pin").value.trim();
    const message = document.getElementById("message")
   
    if(username === admin.username && pin === admin.pin) {
        window.location.href="";
    }
    else {
        message.textContent = "Username atau password salah."
    }

});