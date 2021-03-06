// Author: Humphrey Squibbles - Sargatanas
// Date: 2017-07-13
//
// App class

'use strict'

;(() => {
	class NodeList {
		constructor(uri) {
			console.log('new event list');
			this.uri = uri;
			// this.config = {
			// 	vscale: 100
			// };
		}

		async getEventList() {
			console.log('getting event list');
			let events = {};

			await Util.ajax(this.uri).then((data) => {
					events = JSON.parse(data);
				}).catch((e) => {
					console.log(e);
				});

			return events;
		}

		parse(data) {
			this.list = this.parseEventList(data)
			this.calculateNodeLevels();
			console.log(this.list);
		}

		parseEventList(list, depth = 0, startIndex = 0, childIndex = 0, level = 0) {
			let parentList = {
				length: 0,
				maxDepth: depth,
				level: level,
				maxBranchLength: 0,
				nodes: [],
				allNodes: [],
				hanging: []
			};

			let newNode;
			let index = startIndex;

			for (let n in list.e) {
				let node = list.e[n];
				let lastNode = parentList.nodes.slice(-1)[0];

				if (node.type === 'branch') {
					// branch: recurse for new list
					// let newList = this.parseEventList(node, depth + 1, index, level + lastNode.next.length + 1);
					let newList = this.parseEventList(node, depth + 1, index, lastNode.next.length, lastNode.next.length);

					// connect head of new list to tail of existing list
					newList.nodes[0].linkAfter(lastNode);

					// update list metadata
					parentList.length += newList.length;
					parentList.maxDepth = Math.max(newList.maxDepth, parentList.maxDepth);

					// take max branch length if we have returned from a branch
					parentList.maxBranchLength = Math.max(newList.maxBranchLength, parentList.maxBranchLength);
					// store hanging nodes
					parentList.hanging.push(...newList.hanging);

					// push nodes to flat array
					parentList.allNodes.push(...newList.allNodes);
				} else {
					// node: create and join new node
					// increment node index by the max branch length if combining
					index += (parentList.hanging.length) ? parentList.maxBranchLength : 0;

					// create new node
					newNode = new EventNode(node.id, node.type, depth, index, childIndex, level);

					// resolve hanging nodes if any exist
					if (parentList.hanging.length) {
						for (let hangingNode of parentList.hanging)
							hangingNode.linkBefore(newNode);

						parentList.hanging = [];

						// if at root depth, discard branch lengths
						if (depth === 0)
							parentList.maxBranchLength = 0;
					} else if (parentList.nodes.length) {
						newNode.linkAfter(lastNode);
					}

					// update list metadata
					parentList.length += 1;
					index += 1;

					// push new node to the node list
					parentList.nodes.push(newNode);
					parentList.allNodes.push(newNode);
				}
			}

			// only flag current node as hanging if there are no other hanging nodes
			// this prevents subsequent nodes from linking several nodes back
			if (!parentList.hanging.length)
				parentList.hanging.push(newNode);

			// add nodes in current list to the maxBranchLength of all sub lists
			parentList.maxBranchLength += parentList.nodes.length;

			return parentList;
		}

		// breadth first search
		calculateNodeLevels(root = this.list.nodes[0]) {
			let maxHeight = 0;
			let maxWidth = 0;
			let counter = 0;
			let offset;
			let queue = [root];
			let stack = [];

			while (queue.length) {
				let node = queue.splice(0,1)[0];

				// resolve height of nodes with multiple parents
				if (node.previous.length > 1) {
					let i;
					let examine;
					for (i = 0; i < this.list.allNodes.length && this.list.allNodes[i] != node; i++)
						if (this.list.allNodes[i].depth == node.depth)
							examine = this.list.allNodes[i];

					node.height = examine.height;
				}


				if (node.next.length > 1) {
					offset = Math.pow(0.5, node.depth-1)/ node.next.length;
				} else {
					offset = 0;
				}

				for (let c in node.next) {
					let child = node.next[c];
					if (child.visited === undefined) {

						// if node has multiple children then calculate offset
						if (node.next.length > 1)
							child.height = (node.height + child.level * offset) - offset / node.next.length;
						else
							child.height = node.height;

						maxHeight = Math.max(maxHeight, child.height);

						child.visited = true;
						queue.push(child);
					}
				}

				maxHeight = Math.max(maxHeight, node.height);
				maxWidth = Math.max(maxWidth, node.index);

				counter++;
			}

			this.list.maxHeight = maxHeight;
			this.list.maxWidth = maxWidth;
		}

		toString() {
			let arrOut = [];
			let strArr = [];
			let strOut = '';

			for (let i = 0; i <= this.list.maxDepth; i++)
				strArr.push([]);

			for (let node of this.list.allNodes)
				if (arrOut[node.index])
					arrOut[node.index].push(node.id);
				else
					arrOut[node.index] = [node.id];

			for (let i = 0; i < arrOut.length; i++)
				for (let j = 0; j <= this.list.maxDepth; j++)
					strArr[j] += arrOut[i][j] ? `${arrOut[i][j]}\t` : '\t'

			strOut = strArr.join('\n');

			return strOut;
		}
	}

	window.NodeList = NodeList;
})();