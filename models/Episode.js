import Asset from './Asset';
import Act from './Act';

export default class Episode {
	constructor (opt) {
		this.key = opt.key;
		this.title = opt.title;
		this.frame = opt.frame;
		this.endTime = opt.endTime;

		this.assets = opt.assets.map(asset => new Asset(asset));

		this.acts = opt.acts.map(act => {
			const myAssets = act.assetNames.map(n => {
				return this.assets.find(a => a.name === n);
			});

			const params = { ...act, assets: myAssets };
			return new Act(params)
		});
	}

	isInFrame (asset) {
		const halfFrameWidth = this.frame.width / 2;
		const halfFrameHeight = this.frame.height / 2;
		const halfWidth = this.width / 2;
		const halfHeight = this.height / 2;
		const { x, y } = this;

		// is the asset's frame's left side to 
		// the right of the frame's right side?
		// and so on...
		const isNotLeftOfRight = !((x - halfWidth) > halfFrameWidth);
		const isNotRightOfLeft = !((x + halfWidth) < (halfFrameWidth * -1));
		const isNotAboveTheTop = !((y - halfHeight) > halfFrameHeight);
		const isNotBelowTheBottom = !((y + halfHeight) < (halfFrameHeight * -1));

		return isNotLeftOfRight 
			&& isNotRightOfLeft 
			&& isNotAboveTheTop 
			&& isNotBelowTheBottom;
	}

	// return an array of LEAN* assets that are IN FRAME, from lowest 
	// z-index to highest
	// * lean: just the styles needed for rendering
	// assumes the acts are SORTED -- maybe that's crazy though
	getStyledAssets (time) {
		this.time = time;

		// get the relevant acts only
		// TODO: early exit for this, if we need it
		let acts = [];
		for (let i = 0; i < this.acts.length; i++) {
			const act = this.acts[i];

			// we only care about acts either currently happening
			// or those that have already happened
			// tag them so we don't have to recalculate later
			if (act.isBefore(time)) {
				act.past = true;
				act.present = false;
				acts.push(act);
			} else if (act.coincidesWith(time)) {
				console.log('coincides');
				act.past = false;
				act.present = true;
				acts.push(act);
			} 
		}


		// sort by end time I guess
		acts = acts.sort((a, b) => a.end - b.end);

		const map = {};
		for (let i = 0; i < this.assets.length; i++) {
			const asset = this.assets[i];
			const assetKey = asset.key;
			// create the starting style object for this asset
			if (!map[assetKey]) map[assetKey] = asset.getInitialStyle();

			for (let g = 0; g < acts.length; g++) {
				const act = acts[g];

				if (act.hasAsset(assetKey)) {
					const t = act.present ? time : null; 
					act.applyDelta(map[assetKey], t);
				}
			}

			// if it isn't visible, don't tell even tell the renderer about it
			if (!this.isInFrame(asset) || !map[assetKey].display) {
				delete map[assetKey];
			}
		}

		// finally, sort by z index so the renderer can just blindly render
		// in order
		return Object.values(map).sort((a, b) => a.z - b.z);
	}
}

