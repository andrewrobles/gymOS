import { StyleSheet, View, Text } from 'react-native'
import { useState, useMemo }  from 'react'

const styles = StyleSheet.create({
	item: {
		backgroundColor: 'gray',
		marginBottom: 1,
	},
	rect: {
		width: 200,
		height: 200,
		backgroundColor: 'red'
	}
})

const Rect = () => {
	return <View style={styles.rect}/>
}

const POSITION = {x: 0, y: 0}
const Draggable = ({children}) => {
	const [state, setState] = useState ({
		isDragging: false,
		origin: POSITION,
		translation: POSITION
	})
	
	return <View>{children}</View>
}
	
export default function List() {
	return <Rect/>
}
