function processData() {
  const edgesText = document.getElementById("edges").value;
  const blockedText = document.getElementById("blocked").value;
  const trafficText = document.getElementById("traffic").value;
  const start = document.getElementById("start").value.trim();
  const deliveriesText = document.getElementById("deliveries").value;

  let edges = parseEdges(edgesText);
  let blocked = parseBlocked(blockedText);
  let traffic = parseTraffic(trafficText);
  let deliveries = parseDeliveries(deliveriesText);

  if (!start) {
    alert("Please specify a start location (depot).");
    return;
  }

  // Build Graph
  let graph = new Graph();
  for (let e of edges) {
    let isBlocked = blocked.has(e.u + "," + e.v);
    let lvl = traffic[e.u + "," + e.v] || 1; // default to level 1 if not specified
    graph.addEdge(e.u, e.v, e.d, isBlocked, lvl);
  }

  // Run MST
  let mst = primMST(graph);

  // Check connectivity
  let connectivity = isReachable(graph, start, deliveries);

  // TSP route
  let tspRoute = tsp(graph, start, deliveries);

  // Shortest path sample (to the first delivery)
  let shortestPaths = "";
  if (deliveries.length > 0) {
    let d = deliveries[0];
    let { dist, prev } = dijkstra(graph, start);
    shortestPaths = "Shortest path to first delivery point (" + d + "): ";
    let path = [];
    let curr = d;
    while (curr != null) {
      path.push(curr);
      curr = prev[curr];
    }
    path.reverse();
    shortestPaths += path.join(" -> ") + " (Distance: " + dist[d] + ")";
  }

  // Results output
  let resultDiv = document.getElementById("result");
  let res = "";
  res += "MST Edges: " + mst.map((e) => `(${e.u}-${e.v})`).join(", ") + "\n";
  res +=
    "Optimized TSP Route: " +
    (tspRoute.length > 0 ? tspRoute.join(" -> ") : "No route found") +
    "\n";
  res +=
    "Connectivity Status: " +
    (connectivity
      ? "All delivery points are reachable"
      : "Some delivery points are not reachable") +
    "\n";
  if (shortestPaths) res += shortestPaths + "\n";

  resultDiv.textContent = res;

  // Visualization
  let c = document.getElementById("graphCanvas");
  drawGraph(c, graph, mst, tspRoute);
}
