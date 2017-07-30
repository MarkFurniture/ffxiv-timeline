// Author: Humphrey Squibbles - Sargatanas
// Date: 2017-07-13
//
// App class

'use strict'

;(() => {

	const STYLE_OVERRIDES = {
		// add overrides to this object to change default values
	};

	class App {
		constructor() {
			console.log('Initialising app');

			this.renderer = new Renderer();
			this.util = new Util();
			this.nodeList = new NodeList('http://local.src.com/xiv/timeline/data/test.json');

			this.get();
		}

		async get() {
			// get and parse node data
			let data = await this.nodeList.getEventList();
			this.nodeList.parse(data, 0);
			console.log(this.nodeList.toString());

			// render the data
			this.renderer.render(this.nodeList.list);
		}
	}

	window.App = App;
})();