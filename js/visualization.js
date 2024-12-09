function drawGraph(canvas, graph, mstEdges, tspRoute) {
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  let nodesArr = [...graph.nodes];
  let n = nodesArr.length;
  let R = Math.min(canvas.width, canvas.height) * 0.35;
  let cx = canvas.width / 2;
  let cy = canvas.height / 2;
  let pos = {};
  for (let i = 0; i < n; i++) {
    let angle = (2 * Math.PI * i) / n;
    pos[nodesArr[i]] = {
      x: cx + R * Math.cos(angle),
      y: cy + R * Math.sin(angle),
    };
  }

  let mstSet = new Set();
  for (let e of mstEdges) {
    mstSet.add(e.u + "," + e.v);
    mstSet.add(e.v + "," + e.u);
  }

  let tspSet = new Set();
  for (let i = 0; i < tspRoute.length - 1; i++) {
    tspSet.add(tspRoute[i] + "," + tspRoute[i + 1]);
    tspSet.add(tspRoute[i + 1] + "," + tspRoute[i]);
  }

  // Draw edges
  for (let u of graph.nodes) {
    for (let edge of graph.getNeighbors(u)) {
      if (nodesArr.indexOf(u) < nodesArr.indexOf(edge.node)) {
        let p1 = pos[u],
          p2 = pos[edge.node];

        let color = "black";
        if (edge.blocked) {
          ctx.setLineDash([5, 5]);
        } else {
          ctx.setLineDash([]);
          if (tspSet.has(u + "," + edge.node)) {
            color = "blue";
          } else if (mstSet.has(u + "," + edge.node)) {
            color = "blue";
          } else {
            // Traffic-based color
            if (edge.traffic === 1) color = "green";
            else if (edge.traffic === 2) color = "yellow";
            else if (edge.traffic === 3) color = "red";
          }
        }

        ctx.strokeStyle = color;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();

        // Distance label
        let mx = (p1.x + p2.x) / 2,
          my = (p1.y + p2.y) / 2;
        ctx.fillStyle = "black";
        ctx.font = "12px Arial";
        ctx.fillText(edge.dist.toString(), mx, my);
      }
    }
  }

  ctx.setLineDash([]);

  // Draw nodes
  for (let u of graph.nodes) {
    let p = pos[u];
    ctx.beginPath();
    ctx.arc(p.x, p.y, 15, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#333";
    ctx.stroke();
    ctx.fillStyle = "black";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(u, p.x, p.y);
  }
}
