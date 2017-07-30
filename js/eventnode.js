// Author: Humphrey Squibbles - Sargatanas
// Date: 2017-07-13
//
// Event class

'use strict'

// {
// 	id 			=> int
// 	name		=> string
// 	icon		=> string
// 	duration	=> int
// 	position	=> object
// }

;(() => {
	class EventNode {
		constructor(id, name, depth = 0, index = 0, childIndex = 0, level = 0) {
			// console.log('new event');
			this.id = id || 0;
			this.name = name || 'undefined';
			this.previous = [];
			this.next = [];
			this.depth = depth; // the depth of the branch containing the node
			this.index = index; // the index of the node along the timeline
			this.childIndex = childIndex; // the index of the node in its parent
			this.level = level; // the level of the branch containing the node
			this.height = 0; // the calculated height of the node on the graph
			this.position = {
				x: 0
			};
		}

		setName(name) {
			this.name = name;
		}

		setLevel(depth) {
			this.depth = depth;
		}

		addPrev(node) {
			this.previous.push(node);
		}

		addNext(node) {
			this.next.push(node);
		}

		linkAfter(node) {
			this.previous.push(node);
			node.next.push(this);
		}

		linkBefore(node) {
			this.next.push(node);
			node.previous.push(this);
		}

		removeLink() {

		}
	}

	window.EventNode = EventNode;
})();