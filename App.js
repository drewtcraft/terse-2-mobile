import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, View } from 'react-native';
import styles from './App.style';
import * as env from './env';
import EpisodeListView from './components/EpisodeListView';
import EpisodeView from './components/EpisodeView';
import LoadingView from './components/LoadingView';

export default function App() {
	const [ episode, selectEpisode ] = React.useState(null);
	const [ episodes, setEpisodes ] = React.useState([]);
	const [ view, setView ] = React.useState('episode_list');
	const [ isLoading, setIsLoading ] = React.useState(true);

	React.useEffect(() => {
		const url = env.BASE_URL + '/manifest.json';
		fetch(url)
			.then(res => res.json())
			.then(setEpisodes)
			.catch(err => {
//				alert(err.message);
			});
	}, []);

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


