// Author: Humphrey Squibbles - Sargatanas
// Date: 2017-07-13
//
// Renderer class

'use strict'


;(() => {
	const renderOptions = {
		xScale: 80,
		xTranslate: 10,
		yScale: 80,
		yTranslate: 100
	};

	class Renderer {
		constructor() {
			console.log('new renderer');
		}

		render(list) {
			// var svg = d3.select("svg");
			let p = d3.select('body')
				.append('svg')
				.data([list])
				.style('width', d => { return d.maxWidth * renderOptions.xScale + 2 * renderOptions.xTranslate; })
				.style('height', d => { return d.maxHeight + renderOptions.yScale + 2 * renderOptions.yTranslate; });

			// TODO
			// - centre line
			// - scale on centre line
			// - event lines
			// - event popup

			p.selectAll("circle")
				.data(list.allNodes)
				.enter().append("circle")
				.classed('dot', true)
				.attr('cx', d => { return d.index * renderOptions.xScale + renderOptions.xTranslate; })
				.attr('cy', d => { return d.height * renderOptions.yScale + renderOptions.yTranslate; });

		}
	}

	window.Renderer = Renderer;
})();