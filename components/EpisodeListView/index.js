import React from 'react';
import { SafeAreaView, FlatList, StatusBar, View, Text} from 'react-native';
import EpisodeListItem from './EpisodeListItem';
import styles from './index.style';

export default function EpisodeListView (props) {
	const renderItem = _props => {
		return <EpisodeListItem
			{ ...props }
			clickHandler={ props.handleEpisodeClick }
		/>
	};

	return <SafeAreaView style={ styles.container }>
		<View>
			<Text>
				Episodes
			</Text>
		</View>
		<FlatList
			data={ props.data }
			renderItem={ EpisodeListItem }
			keyExtractor={ i => i.title }
		/>
	</SafeAreaView>;
}
