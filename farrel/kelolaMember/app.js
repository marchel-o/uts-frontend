function loadMembers() {
  try {
    return JSON.parse(localStorage.getItem("kasir_members") || "[]");
  } catch (e) {
    return [];
  }
}
function saveMembers(list) {
  try {
    localStorage.setItem("kasir_members", JSON.stringify(list));
  } catch (e) {}
}

let editingIndex = null;

function renderMembers() {
  const tbody = document.getElementById("member-rows");
  const q = (document.getElementById("search-box").value || "").toLowerCase();
  const all = loadMembers();
  const filtered = all
    .map((m, i) => ({ ...m, _idx: i }))
    .filter((m) => m.name.toLowerCase().includes(q) || m.phone.includes(q));

  if (filtered.length === 0) {
    tbody.innerHTML =
      '<tr><td colspan="6">Tidak ada member yang cocok.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered
    .map((m) => {
      const i = m._idx;
      if (i === editingIndex) {
        return `<tr>
        <td><input id="edit-name" value="${m.name}"></td>
        <td><input id="edit-phone" value="${m.phone}"></td>
        <td><input id="edit-dob" type="date" value="${m.dob || ""}"></td>
        <td>${m.joinDate || "-"}</td>
        <td>
          <select id="edit-status">
            <option value="aktif" ${m.status !== "nonaktif" ? "selected" : ""}>Aktif</option>
            <option value="nonaktif" ${m.status === "nonaktif" ? "selected" : ""}>Nonaktif</option>
          </select>
        </td>
        <td>${m.points} pts</td>
        <td style="white-space:nowrap">
          <button class="btn" style="padding:5px 10px;font-size:12.5px" onclick="saveEdit(${i})">Simpan</button>
          <button class="btn" style="padding:5px 10px;font-size:12.5px;background:var(--text-secondary)" onclick="cancelEdit()">Batal</button>
        </td>
      </tr>`;
      }
      const statusBadge =
        m.status === "nonaktif"
          ? `<span style="color:var(--danger)">Nonaktif</span>`
          : `<span style="color:var(--success)">Aktif</span>`;
      return `<tr>
      <td>${m.name}</td>
      <td>${m.phone}</td>
      <td>${m.dob || '-'}</td>
      <td>${m.joinDate || "-"}</td>
      <td>${statusBadge}</td>
      <td>${m.points} pts</td>
      <td style="white-space:nowrap">
        <button class="btn" style="padding:5px 10px;font-size:12.5px" onclick="addPoints(${i})">+Poin</button>
        <button class="btn" style="padding:5px 10px;font-size:12.5px" onclick="startEdit(${i})">Edit</button>
        <button class="btn" style="padding:5px 10px;font-size:12.5px;background:var(--danger)" onclick="deleteMember(${i})">Hapus</button>
      </td>
    </tr>`;
    })
    .join("");
}

function startEdit(i) {
  editingIndex = i;
  renderMembers();
}
function cancelEdit() {
  editingIndex = null;
  renderMembers();
}

function saveEdit(i) {
  const list = loadMembers();
  const name = document.getElementById("edit-name").value.trim();
  const phone = document.getElementById("edit-phone").value.trim();
  const dob = document.getElementById("edit-dob").value;
  const status = document.getElementById("edit-status").value;
  if (!name || !phone) {
    alert("Nama dan No. HP wajib diisi.");
    return;
  }
  const dup = list.find((m, idx) => m.phone === phone && idx !== i);
  if (dup) {
    alert("No. HP ini sudah dipakai member lain.");
    return;
  }
  list[i] = { ...list[i], name, phone, status };
  saveMembers(list);
  editingIndex = null;
  renderMembers();
}

function deleteMember(i) {
  if (!confirm("Hapus member ini? Tindakan ini tidak bisa dibatalkan.")) return;
  const list = loadMembers();
  list.splice(i, 1);
  saveMembers(list);
  renderMembers();
}

function addPoints(i) {
  const list = loadMembers();
  const m = list[i];
  const input = prompt(`Nominal belanja ${m.name} (Rp):`);
  if (input === null) return;
  const amt = parseInt(input, 10);
  if (!amt || amt <= 0) {
    alert("Nominal tidak valid.");
    return;
  }
  const earned = Math.floor(amt / 1000);
  m.points += earned;
  saveMembers(list);
  renderMembers();
  alert(`+${earned} poin ditambahkan untuk ${m.name}.`);
}

document.addEventListener("DOMContentLoaded", renderMembers);
