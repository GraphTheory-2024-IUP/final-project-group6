class Graph {
  constructor() {
    this.adj = {}; // { node: [{node, dist, blocked, traffic}, ...] }
    this.nodes = new Set();
  }

  addEdge(u, v, d, blocked, trafficLevel) {
    if (!this.adj[u]) this.adj[u] = [];
    if (!this.adj[v]) this.adj[v] = [];
    this.adj[u].push({
      node: v,
      dist: d,
      blocked: blocked,
      traffic: trafficLevel,
    });
    this.adj[v].push({
      node: u,
      dist: d,
      blocked: blocked,
      traffic: trafficLevel,
    });
    this.nodes.add(u);
    this.nodes.add(v);
  }

  getNeighbors(u) {
    return this.adj[u] || [];
  }
}
