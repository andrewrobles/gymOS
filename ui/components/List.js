import { StyleSheet, View, Text } from 'react-native'
import { useState }  from 'react'

const styles = StyleSheet.create({
	item: {
		backgroundColor: 'gray',
		marginBottom: 1,
	}
})
	
export default function List() {
	const [list, setList] = useState([
			{name: 'name1'}, 
			{name: 'name2'}, 
			{name: 'name3'},
	])
	return <View>
		{list.map(item => <Text style={styles.item} key={item.name}>
			{item.name}
		</Text>)}
	</View>
}
