import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './App.style';
import { BASE_URL } from './env';
import EpisodeListView from './components/EpisodeListView';
import EpisodeView from './components/EpisodeView';
import LoadingView from './components/LoadingView';
import Promise from 'bluebird';

export default function App() {
	const [ episode, selectEpisode ] = React.useState(null);
	const [ episodes, setEpisodes ] = React.useState([]);
	const [ view, setView ] = React.useState('episode_list');
	const [ isLoading, setIsLoading ] = React.useState(true);

	// load manifest file on launch to display list of episodes
	React.useEffect(() => {
		const url = BASE_URL + '/manifests/index.json';
		fetch(url)
			.then(res => res.json())
			.then(setEpisodes)
			.catch(err => {
				alert(err.message);
			});
	}, []);

	function handleEpisodeClick (listItem) {
		// fetch episode and images all at once
		// then pass all this shit into the next view
		const base = BASE_URL + listItem.path;

		let episode;
		// store the downloaded images here when we are ready
		const imageMap = {};
		const promises = listItem.files.map(file => {
			const url = base + '/' + file;

			if (/json$/.test(file)) {
				return fetch(url)
					.then(res => res.json())
					.then(res => {
						
					});;
			} else {
				// this will have to change if I use native modules
				// might need a loader per OS, fuck...
				return new Promise(resolve => {
					const img = new Image;
					img.onLoad = function () {
						imageMap[file] = img;
						resolve(img);
					}
					img.src = url;
				});
			}
		});

		return Promise.all(promises)
			.then(() => {
				
			});
		
	}

	// -------
	// ROUTING
	// -------
	switch (view) {
		case 'episode': 
			return <EpisodeView 
				{ ...episode } 
				styles={ styles } 
			/>;
		
		case 'episode_list':
			return <EpisodeListView 
				data={ episodes }
				styles={ styles }
			/>;
		case 'loading': 
			return <LoadingView />
	}
}


