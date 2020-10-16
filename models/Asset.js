import { isArray } from 'lodash';

// these are the properties of a lean asset
const initialStyleProps = [
	'src',
	'images',
	'imageIndex',
	'width',
	'height',
	'x',
	'y',
	'z',
	'angle',
	'display',
];

// an Asset 
export default class Asset {
	constructor (opt = {}) {
		this.key = opt.key;
		this.name = opt.name;

		// string url, support multiple images
		if (!isArray(opt.src)) opt.src = [ opt.src ];
		this.src = opt.src || [];

		// this property is for images in memory
		this.images = [];

		// tells us which image we are displaying right now
		this.imageIndex = 0;

		// dimensions
		this.width = opt.width;
		this.height = opt.height;

		// position
		this.x = opt.x || 0;
		this.y = opt.y || 0;

		// used as z-index
		this.z = opt.z || 1;

		// for rotation
		this.angle = opt.angle || 0;

		// turn the image on and off
		this.display = true;
	}

	getInitialStyle () {
		return initialStyleProps.reduce((acc, k) => {
			acc[k] = this[k];
			return acc;
		}, {});
	}

}
