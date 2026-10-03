const DEN = [
  100000,
  50000,
  20000,
  10000,
  5000,
  2000,
  1000
];

const START_CASH = 500000;   // modal awal laci (sementara, sampai ada halaman Buka Shift)
const SALES_TUNAI = 1350000; // sama dengan data Tunai di Laporan Penjualan
const SYSTEM_CASH = START_CASH + SALES_TUNAI;

const denomsEl = document.getElementById('denoms');
const totalEl = document.getElementById('countTotal');
const msgEl = document.getElementById('closeMsg');
const rp = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');

function dropTotal() {
  try {
    return (JSON.parse(localStorage.getItem('pos_drops') || '[]'))
      .reduce((a, d) => a + d.amt, 0);
  } catch {
    return 0;
  }
}

denomsEl.innerHTML = DEN.map((d) => `
  <div>
    <label for="n${d}">${rp(d)}</label>
    <input id="n${d}" data-d="${d}" type="number" min="0" placeholder="0 lembar">
  </div>
`).join('');

function counted() {
  return [...denomsEl.querySelectorAll('input')]
    .reduce((a, i) => a + (Number(i.value) || 0) * Number(i.dataset.d), 0);
}

denomsEl.addEventListener('input', () => {
  totalEl.textContent = rp(counted());
});

document.getElementById('closeBtn').addEventListener('click', () => {
  const c = counted();

  msgEl.hidden = false;

  if (c === 0) {
    msgEl.className = 'msg bad';
    msgEl.textContent = 'Isi jumlah lembar uang terlebih dahulu.';
    return;
  }

  const expected = SYSTEM_CASH - dropTotal();
  const diff = c - expected;

  try {
    localStorage.setItem(
      'pos_closed',
      JSON.stringify({ counted: c, expected, diff })
    );
  } catch {}

  if (diff === 0) {
    msgEl.className = 'msg ok';
    msgEl.textContent = 'Shift ditutup. Uang di laci sesuai sistem.';
  } else {
    msgEl.className = 'msg warn';
    msgEl.textContent = `Shift ditutup. Sistem ${rp(expected)}, hitungan ${rp(c)}: ${diff < 0 ? 'kurang' : 'lebih'} ${rp(Math.abs(diff))}.`;
  }
});