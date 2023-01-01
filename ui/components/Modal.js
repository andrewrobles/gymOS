import { useState, useEffect } from 'react'
import { Button, View, Text } from 'react-native'

export default function Modal(props) {
return <View>
{props.modalIsVisible ?
<Button 
	title="Go Back" 
	onPress={() => props.showModal(false)}
/>: null}
{!props.modalIsVisible && props.buttonText !== undefined ?
<Button title={props.buttonText} onPress={props.showModal}/>
: null}
{props.modalIsVisible ? props.content: null}
</View>
}
