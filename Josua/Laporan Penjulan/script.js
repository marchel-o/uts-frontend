// Data contoh (ganti dengan data asli / hasil Tarik Tunai & Tutup Shift nanti)
const SALES = {
  Tunai: 1350000,
  QRIS: 2140000,
  Debit: 980000,
  'E-Wallet': 610000
};

const rp = (n) => 'Rp ' + Math.round(n).toLocaleString('id-ID');
const omzet = Object.values(SALES).reduce((a, b) => a + b, 0);

function dropTotal() {
  try {
    return (JSON.parse(localStorage.getItem('pos_drops') || '[]'))
      .reduce((a, d) => a + d.amt, 0);
  } catch {
    return 0;
  }
}

function closedDiff() {
  try {
    const c = JSON.parse(localStorage.getItem('pos_closed') || 'null');
    return c ? c.diff : null;
  } catch {
    return null;
  }
}

const diff = closedDiff();

document.getElementById('stats').innerHTML = `
  <div class="stat">
    <span>Total omzet</span>
    <b>${rp(omzet)}</b>
  </div>

  <div class="stat">
    <span>Setoran tarik tunai</span>
    <b>${rp(dropTotal())}</b>
  </div>

  <div class="stat">
    <span>Selisih kas</span>
    <b class="${diff === null ? '' : diff === 0 ? 'ok' : 'bad'}">
      ${diff === null ? 'Belum tutup shift' : (diff > 0 ? '+' : '') + rp(diff)}
    </b>
  </div>
`;

document.getElementById('pay').innerHTML = Object.entries(SALES).map(([k, v]) => `
  <div class="pay-row">
    <span>${k}</span>
    <b>${rp(v)} (${Math.round(v / omzet * 100)}%)</b>
  </div>

  <div class="bar">
    <i style="width:${v / omzet * 100}%"></i>
  </div>
`).join('');

function renderChart() {
  const entries = Object.entries(SALES);
  const max = Math.max(...entries.map(([, v]) => v));

  const w = 560;
  const h = 220;
  const pad = 40;
  const slot = (w - pad * 2) / entries.length;
  const barW = slot - 24;

  const bars = entries.map(([k, v], i) => {
    const barH = (v / max) * (h - pad * 2);
    const x = pad + i * slot + 12;
    const y = h - pad - barH;

    return `
      <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="6" fill="rgb(235,157,255)"></rect>
      <text x="${x + barW / 2}" y="${y - 8}" text-anchor="middle" font-size="12" fill="#1d2a2a">${rp(v)}</text>
      <text x="${x + barW / 2}" y="${h - pad + 18}" text-anchor="middle" font-size="12" fill="#555">${k}</text>
    `;
  }).join('');

  document.getElementById('chart').innerHTML = `
    <svg viewBox="0 0 ${w} ${h + 10}" role="img" aria-label="Grafik penjualan per metode pembayaran">
      <line x1="${pad}" y1="${h - pad}" x2="${w - pad}" y2="${h - pad}" stroke="#ccc" stroke-width="1"></line>
      ${bars}
    </svg>
  `;
}

renderChart();