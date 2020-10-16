import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './App.style';
import { BASE_URL } from './env';
import EpisodeListView from './components/EpisodeListView';
import EpisodeView from './components/EpisodeView';
import LoadingView from './components/LoadingView';

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
		const urls = listItem.files.map(f => base + '/' + f);

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


