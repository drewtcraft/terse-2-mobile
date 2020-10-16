const assetProps = [
	'width',
	'height',
	'x',
	'y',
	'z',
	'angle',
];

export default class Act {
	constructor (opt = {}) {
		this.name = opt.name;
		this.key = opt.key;
		this.type = opt.type;

		// start and end mark time
		this.start = opt.start || 0;
		this.end = opt.end || 100;

		// we can apply an act to one or many assets
		this.assets = {};
		if (opt.assets) opt.assets.forEach(this.addAsset.bind(this));

		// leave this unstructured so we can handle a lot of different
		// data types
		this.data = opt.data || {};

		// TODO: support something like this...
		// this.mode = linear | ease_in | ease_out
		
	}

	isBefore (time) {
		return time >= this.end;
	}

	coincidesWith (time) {
		return time >= this.start && time <= this.end;
	}

	applyDelta (current, time) {
		const { start, end, data } = this;

		// if we have a time, {progress} represents the time as a fraction of
		// the act's total time
		// otherwise {progress} is 1, which is how we treat a completed event
		let progress;
		if (time > end || time == null) {
			progress = 1;
		} else {
			switch (this.mode) {
				// 'ease-in': { }
				// 'ease-out': { }
				default: {
					progress = (time - start) / (end - start);
				}
			}
		}

		// each type of act modifies a value of the {current} obj in its own
		// way using the {progress} variable to scale.
		switch (this.type) {
			case 'move': {
				current.x += (data.x * progress) || 0;
				current.y += (data.y * progress) || 0;
			}
		}

		return current;
	}
}
