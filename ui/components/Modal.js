import { Button, View } from 'react-native'

export default function Modal(props) {
const hideModal = () => props.showModal(false)
return <View>
{props.modalIsVisible ? 
<Button title="Go Back" onPress={hideModal}/>: 
null}

{!props.modalIsVisible && props.buttonText !== undefined ?
<Button title={props.buttonText} onPress={props.showModal}/>:
null}

{props.modalIsVisible ? props.content: null}
</View>
}
