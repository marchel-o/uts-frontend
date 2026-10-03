const devs = ['Printer struk thermal', 'Laci kasir (cash drawer)', 'Scanner barcode'];
const devsEl = document.getElementById('devs');

devsEl.innerHTML = devs.map((n, i) => `
  <div class="dev">
    <div>
      <b>${n}</b>
      <div class="status" id="st${i}">Belum dites</div>
    </div>
    <button type="button" class="btn-ghost" data-i="${i}">Tes koneksi</button>
  </div>`).join('');

devsEl.addEventListener('click', (e) => {
  const btn = e.target.closest('button');
  if (!btn) return;
  const status = document.getElementById('st' + btn.dataset.i);
  status.className = 'status';
  status.textContent = 'Menghubungkan…';
  btn.disabled = true;

  setTimeout(() => { // simulasi; pada aplikasi nyata pakai Web Serial / WebUSB
    const ok = Math.random() > 0.2;
    status.className = 'status ' + (ok ? 'ok' : 'bad');
    status.textContent = ok ? 'Terhubung' : 'Gagal terhubung. Periksa kabel lalu coba lagi.';
    btn.disabled = false;
  }, 900);
});