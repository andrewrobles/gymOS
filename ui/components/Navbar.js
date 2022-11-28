import { StyleSheet, View, Button, Text } from 'react-native'
import { useState, useEffect } from 'react'

const styles = StyleSheet.create({
	container: {
		margin: 30,
	},
	navbar: {
		flexDirection: 'row',
	},
});

export default function Navbar(props) {
	const [selectedView, setSelectedView] = useState(props.defaultView)
	return <View style={styles.container}>
		{props.views[selectedView]}
		<View style={styles.navbar}>{Object.keys(props.views).map(key => (
			<Button
			key={key}
			title={key}
			onPress={() => setSelectedView(key)}/>
		))}</View>
	</View>
}
