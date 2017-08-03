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

		init(list) {
			let p = d3.select('body')
				.append('svg')
				.data([list])
				.style('width', d => { return d.maxWidth * renderOptions.xScale + 2 * renderOptions.xTranslate; })
				.style('height', d => { return d.maxHeight + renderOptions.yScale + 2 * renderOptions.yTranslate; });

			this.svg = d3.select("svg");

			return this;
		}

		render(list) {
			// TODO
			// - centre line
			// - scale on centre line
			// - event lines
			// - event popup
			// - implement timeline scaling
			// - implement minimap

			this.renderLine(this.svg, list);
			this.renderNodes(this.svg, list);

		}

		renderNodes(context, list) {
			// draw lines from timeline to dots
			// context.selectAll('line.node')
			// 	.data(list.allNodes)
			// 	.enter()
			// 	.append('line')
			// 	.classed('node', true)
			// 	.classed('line', true)
			// 	.attr('x1', d => { return d.index * renderOptions.xScale + renderOptions.xTranslate; })
			// 	.attr('y1', d => { return d.height * renderOptions.yScale + renderOptions.yTranslate; })
			// 	.attr('x2', d => { return d.index * renderOptions.xScale + renderOptions.xTranslate; })
			// 	.attr('y2', renderOptions.yTranslate);

			// draw edges

			// context.selectAll("circle.node")
			// 	.data(list.allNodes)
			// 	.enter()
			// 	.append("circle")
			// 	.classed('node', true)
			// 	.attr('cx', d => { return d.index * renderOptions.xScale + renderOptions.xTranslate; })
			// 	.attr('cy', d => { return d.height * renderOptions.yScale + renderOptions.yTranslate; })
			// 	.on('mouseover', e => { console.log('blargh'); });

			let g = context.selectAll('g')
				.data(list.allNodes)
				.enter()
				.append('g')
				.classed('node', true)
				.on('mouseover', (e, d, t) => {
					console.log(e, d, t, this);
					d3.select(this).classed('hover', true);
				})
				// .on('mouseout', e => { d3.select(this).classed('hover', false); });

			// draw lines from timeline to dots
			g.append('line')
				.classed('node', true)
				.classed('line', true)
				.attr('x1', d => { return d.index * renderOptions.xScale + renderOptions.xTranslate; })
				.attr('y1', d => { return d.height * renderOptions.yScale + renderOptions.yTranslate; })
				.attr('x2', d => { return d.index * renderOptions.xScale + renderOptions.xTranslate; })
				.attr('y2', renderOptions.yTranslate);;

			// draw dots
			g.insert('circle')
				.classed('node', true)
				.attr('cx', d => { return d.index * renderOptions.xScale + renderOptions.xTranslate; })
				.attr('cy', d => { return d.height * renderOptions.yScale + renderOptions.yTranslate; });
		}

		// render the central line
		renderLine(context, list) {
			// draw the line
			context.append('line')
				.classed('timeline', true)
				.attr('x1', renderOptions.xTranslate)
				.attr('y1', renderOptions.yTranslate)
				.attr('x2', list.maxWidth * renderOptions.xScale + renderOptions.xTranslate)
				.attr('y2', renderOptions.yTranslate);

			// draw caps on the line
			context.append('circle')
				.attr('cx', renderOptions.xTranslate)
				.attr('cy', renderOptions.yTranslate);

			context.append('circle')
				.classed('cap', true)
				.attr('cx', list.maxWidth * renderOptions.xScale + renderOptions.xTranslate)
				.attr('cy', renderOptions.yTranslate);
		}
	}

	window.Renderer = Renderer;
})();