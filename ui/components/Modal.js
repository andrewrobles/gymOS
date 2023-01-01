import { useState, useEffect } from 'react'
import { StyleSheet, Button, View, Text } from 'react-native'
import api from '../api.js'

const styles = StyleSheet.create({
}) 


export default function Modal(props) {
return <View>
{props.modalIsVisible ?
<Button title="Go Back" onPress={() => showModal(false)}/>:
<Button title={props.buttonText} onPress={props.showModal}/>}
{props.modalIsVisible ? props.modalContent: null}
</View>
}
