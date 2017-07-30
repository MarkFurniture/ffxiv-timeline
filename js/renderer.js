// Author: Humphrey Squibbles - Sargatanas
// Date: 2017-07-13
//
// Renderer class

'use strict'

;(() => {
	class Renderer {
		constructor() {
			console.log('new renderer');
		}

		render(list) {
			// var svg = d3.select("svg");
			let p = d3.select('body')
				.append('svg')
				.data([list])
				.style('width', d => { console.log(d); return 100 * d.length; });

			p.selectAll("circle")
				.data(list.allNodes)
				.enter().append("circle")
				.classed('dot', true)
				.attr('cx', d => { return d.index * 50 + 10; })
				.attr('cy', d => {
					// console.log(list.maxDepth);
					return (d.level * 10 + 10) * Math.pow(-1, d.level);
				})
				.text(function(d) {
					// console.log(d);
					return d.id;
				});
		}
	}

	window.Renderer = Renderer;
})();