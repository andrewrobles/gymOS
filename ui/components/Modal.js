import { useState, useEffect } from 'react'
import { StyleSheet, Button, View, Text } from 'react-native'
import api from '../api.js'

const styles = StyleSheet.create({
}) 


export default function Modal(props) {
const [modalIsVisible, setModalIsVisible] = useState(
	props.modalIsVisible !== undefined ?
	props.modalIsVisible: false
)
const showModal = () => setModalIsVisible(true)
const hideModal = () => setModalIsVisible(false)
return <View>
{modalIsVisible ?
<Button title="Go Back" onPress={hideModal}/>:
<Button title={props.buttonText} onPress={showModal}/>}
{modalIsVisible ? props.modalContent: null}
</View>
}
