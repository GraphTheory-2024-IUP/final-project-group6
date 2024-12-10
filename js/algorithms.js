// Dijkstra's shortest path with traffic consideration
function dijkstra(graph, source) {
  let dist = {};
  let prev = {};
  let Q = new Set(graph.nodes);

  for (let n of graph.nodes) {
    dist[n] = Infinity;
    prev[n] = null;
  }
  dist[source] = 0;

  while (Q.size > 0) {
    let u = null;
    let uDist = Infinity;
    for (let node of Q) {
      if (dist[node] < uDist) {
        uDist = dist[node];
        u = node;
      }
    }
    if (u === null) break;
    Q.delete(u);

    for (let edge of graph.getNeighbors(u)) {
      if (edge.blocked) continue;
      // Incorporate traffic level into the cost
      let cost = edge.dist * edge.traffic;
      let alt = dist[u] + cost;
      if (alt < dist[edge.node]) {
        dist[edge.node] = alt;
        prev[edge.node] = u;
      }
    }
  }

  return { dist, prev };
}

// Prim's MST with traffic consideration
function primMST(graph) {
  let start = [...graph.nodes][0];
  let mstEdges = [];
  let inSet = new Set([start]);
  let edges = [];

  // Push edges from start with their traffic-adjusted cost
  for (let edge of graph.getNeighbors(start)) {
    if (!edge.blocked) {
      edges.push({ u: start, v: edge.node, dist: edge.dist * edge.traffic });
    }
  }

  while (inSet.size < graph.nodes.size && edges.length > 0) {
    edges.sort((a, b) => a.dist - b.dist);
    let e = edges.shift();
    if (!inSet.has(e.v)) {
      inSet.add(e.v);
      mstEdges.push(e);
      // Add new edges from this node
      for (let edge of graph.getNeighbors(e.v)) {
        if (!edge.blocked && !inSet.has(edge.node)) {
          let cost = edge.dist * edge.traffic;
          edges.push({ u: e.v, v: edge.node, dist: cost });
        }
      }
    }
  }

  // Note: We stored MST edges with adjusted cost in dist, but it's fine.
  // The MST edges returned still represent the correct MST with traffic considered.
  return mstEdges;
}

// Connectivity check (BFS) - unchanged
function isReachable(graph, start, targets) {
  let visited = new Set();
  let queue = [start];
  while (queue.length > 0) {
    let u = queue.shift();
    visited.add(u);
    for (let edge of graph.getNeighbors(u)) {
      if (!edge.blocked && !visited.has(edge.node)) {
        queue.push(edge.node);
      }
    }
  }
  for (let t of targets) {
    if (!visited.has(t)) return false;
  }
  return true;
}

// Brute-force TSP with traffic considered through Dijkstra
function tsp(graph, start, deliveries) {
  function permute(arr) {
    if (arr.length <= 1) return [arr];
    let result = [];
    for (let i = 0; i < arr.length; i++) {
      let current = arr[i];
      let rest = arr.slice(0, i).concat(arr.slice(i + 1));
      for (let p of permute(rest)) {
        result.push([current].concat(p));
      }
    }
    return result;
  }

  let bestRoute = null;
  let bestDist = Infinity;
  let { dist: distFromStart } = dijkstra(graph, start);
  let permutations = permute(deliveries);

  for (let route of permutations) {
    let currentDist = 0;
    let valid = true;

    // From start to first delivery
    currentDist += distFromStart[route[0]];
    if (!isFinite(currentDist)) valid = false;

    // Between deliveries
    for (let i = 0; i < route.length - 1 && valid; i++) {
      let { dist } = dijkstra(graph, route[i]);
      currentDist += dist[route[i + 1]];
      if (!isFinite(dist[route[i + 1]])) valid = false;
    }

    // Return to start
    if (valid) {
      let { dist: distBack } = dijkstra(graph, route[route.length - 1]);
      currentDist += distBack[start];
      if (!isFinite(distBack[start])) valid = false;
    }

    if (valid && currentDist < bestDist) {
      bestDist = currentDist;
      bestRoute = [start].concat(route).concat([start]);
    }
  }

  return bestRoute || [];
}
