import React from 'react';
import { View, Text} from 'react-native';
import styles from './index.style';

export default function EpisodeListItem ({ item: props }) {
	return <View>
		<Text>{ props.title }</Text>
	</View>;
}
