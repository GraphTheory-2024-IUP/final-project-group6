function parseEdges(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const edges = [];
  for (let line of lines) {
    let [u, v, d] = line.split(",");
    if (!u || !v || !d) continue;
    edges.push({ u: u.trim(), v: v.trim(), d: parseFloat(d.trim()) });
  }
  return edges;
}

function parseBlocked(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const blocked = new Set();
  for (let line of lines) {
    let [u, v] = line.split(",");
    if (!u || !v) continue;
    let e1 = u.trim() + "," + v.trim();
    let e2 = v.trim() + "," + u.trim();
    blocked.add(e1);
    blocked.add(e2);
  }
  return blocked;
}

function parseTraffic(text) {
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  const traffic = {};
  for (let line of lines) {
    let [u, v, lvl] = line.split(",");
    if (!u || !v || !lvl) continue;
    lvl = parseInt(lvl.trim());
    traffic[u.trim() + "," + v.trim()] = lvl;
    traffic[v.trim() + "," + u.trim()] = lvl;
  }
  return traffic;
}

function parseDeliveries(text) {
  return text
    .split("\n")
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
}
