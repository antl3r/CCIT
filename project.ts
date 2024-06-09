class EdmondsKarp {
	private capacity: number[][];
	private flow: number[][];
	private source: number;
	private sink: number;
	private parent: number[];
	private n: number;

	constructor(capacity: number[][], source: number, sink: number) {
		this.capacity = capacity;
		this.source = source;
		this.sink = sink;
		this.n = capacity.length;
		this.flow = Array.from({ length: this.n }, () => Array(this.n).fill(0));
		this.parent = Array(this.n).fill(-1);
	}

	private bfs(): boolean {
		let visited = Array(this.n).fill(false);
		let queue: number[] = [];
		queue.push(this.source);
		visited[this.source] = true;
		this.parent.fill(-1);

		console.log("BFS: Starting from source node", this.source);

		while (queue.length > 0) {
			let u = queue.shift()!;
			console.log("  Visiting node", u);

			for (let v = 0; v < this.n; v++) {
				if (!visited[v] && this.capacity[u][v] - this.flow[u][v] > 0) {
					queue.push(v);
					this.parent[v] = u;
					visited[v] = true;
					console.log("    Found path to node", v, "via node", u);

					if (v === this.sink) {
						console.log("    Reached sink node", this.sink);
						return true;
					}
				}
			}
		}
		return false;
	}

	public maxFlow(): number {
		let maxFlow = 0;

		while (this.bfs()) {
			let pathFlow = Infinity;
			console.log("Augmenting path found:");
			for (let v = this.sink; v !== this.source; v = this.parent[v]) {
				let u = this.parent[v];
				pathFlow = Math.min(pathFlow, this.capacity[u][v] - this.flow[u][v]);
				console.log(
					`  Path flow capacity from node ${u} to node ${v}: ${this.capacity[u][v] - this.flow[u][v]}`
				);
			}

			console.log("  Path flow to be added:", pathFlow);
			for (let v = this.sink; v !== this.source; v = this.parent[v]) {
				let u = this.parent[v];
				this.flow[u][v] += pathFlow;
				this.flow[v][u] -= pathFlow;
				console.log(`  Updated flow from node ${u} to node ${v}: ${this.flow[u][v]}`);
				console.log(`  Updated reverse flow from node ${v} to node ${u}: ${this.flow[v][u]}`);
			}

			maxFlow += pathFlow;
			console.log("Current maximum flow:", maxFlow);
		}

		return maxFlow;
	}
}

const capacity = [
	[0, 16, 13, 0, 0, 0],
	[0, 0, 10, 12, 0, 0],
	[0, 4, 0, 0, 14, 0],
	[0, 0, 9, 0, 0, 20],
	[0, 0, 0, 7, 0, 4],
	[0, 0, 0, 0, 0, 0],
];

const source = 0; // Sumber data
const sink = 5; // Tujuan data

const edmondsKarp = new EdmondsKarp(capacity, source, sink);
console.log("Maximum Flow:", edmondsKarp.maxFlow());
