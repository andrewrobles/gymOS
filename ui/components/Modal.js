import { useState, useEffect } from 'react'
import { Button, View, Text } from 'react-native'

export default function Modal(props) {
return <View>
{props.modalIsVisible ?
<Button 
	title="Go Back" 
	onPress={() => props.showModal(false)}
/>:
<Button title={props.buttonText} onPress={props.showModal}/>}
{props.modalIsVisible ? props.content: null}
</View>
}
