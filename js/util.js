// Author: Humphrey Squibbles - Sargatanas
// Date: 2017-07-13
//
// Event class

'use strict'

;(() => {
	class Util {
		constructor() {
			console.log('new util');
		}

		static ajax(url, data) {
			return new Promise((resolve, reject) => {
				let req = new XMLHttpRequest();
				req.open('GET', url);
				req.onload = () => {
					if (req.status === 200) {
						resolve(req.response);
					} else {
						reject(new Error(req.statusText));
					}
				}

				req.onerror = () => {
					reject(new Error('Network error'));
				}

				req.send();
			})
		}
	}

	window.Util = Util;
})();