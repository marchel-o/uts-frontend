const rows = document.getElementById('rows');
const totalEl = document.getElementById('totalAmt');
const msgEl = document.getElementById('msg');
const rp = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

function loadDrops() {
  try { return JSON.parse(localStorage.getItem('pos_drops') || '[]'); } catch { return []; }
}
function saveDrops(list) {
  try { localStorage.setItem('pos_drops', JSON.stringify(list)); } catch {}
}

function render() {
  const list = loadDrops();
  rows.innerHTML = list.length
    ? list.map((d, i) => `
      <tr>
        <td>${d.t}</td><td>${d.to}</td><td>${d.note || '-'}</td>
        <td class="r">${rp(d.amt)}</td>
        <td class="r"><button type="button" class="btn-sm" data-del="${i}">Hapus</button></td>
      </tr>`).join('')
    : '<tr><td colspan="5">Belum ada setoran.</td></tr>';
  totalEl.textContent = rp(list.reduce((a, d) => a + d.amt, 0));
}

document.getElementById('saveBtn').addEventListener('click', () => {
  const amt = Number(document.getElementById('amt').value);
  msgEl.hidden = false;
  if (!(amt > 0)) {
    msgEl.className = 'msg bad';
    msgEl.textContent = 'Masukkan jumlah setoran lebih dari 0.';
    return;
  }
  const list = loadDrops();
  list.unshift({
    t: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    to: document.getElementById('to').value,
    note: document.getElementById('note').value.trim(),
    amt
  });
  saveDrops(list);
  msgEl.className = 'msg ok';
  msgEl.textContent = 'Setoran ' + rp(amt) + ' tersimpan.';
  document.getElementById('amt').value = '';
  document.getElementById('note').value = '';
  render();
});

rows.addEventListener('click', (e) => {
  const btn = e.target.closest('[data-del]');
  if (!btn) return;
  const idx = Number(btn.dataset.del);
  const list = loadDrops();
  if (!confirm('Hapus setoran ' + rp(list[idx].amt) + '?')) return;
  list.splice(idx, 1);
  saveDrops(list);
  render();
});

render();0