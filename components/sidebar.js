
fetch("/components/sidebar.html")
    .then(response => {
        if (!response.ok) {
            throw new Error("Sidebar gagal dimuat");
        }

        return response.text();
    })
    .then(html => {
        const container = document.getElementById("sidebar-container");
        container.innerHTML = html;

        const sidebar = document.getElementById("sidebar");
        const menuToggle = document.getElementById("menuToggle");

        // Tombol buka/tutup sidebar
        if (menuToggle && sidebar) {
            menuToggle.addEventListener("click", function () {
                sidebar.classList.toggle("active");

                const isOpen = sidebar.classList.contains("active");

                menuToggle.setAttribute("aria-expanded", isOpen);
                menuToggle.textContent = isOpen
                    ? "✕ Tutup Menu"
                    : "☰ Menu";
            });
        }

        if (sidebar) {
            sidebar.querySelectorAll(".dropdown-toggle").forEach(toggle => {
                toggle.addEventListener("click", function (e) {
                    e.preventDefault();

                    const menu = this.nextElementSibling;

                    if (menu && menu.classList.contains("dropdown-menu")) {
                        menu.classList.toggle("active");
                    }
                });
            });
        }
    })
    .catch(error => console.error(error));
