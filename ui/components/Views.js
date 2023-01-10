import ExerciseView from './ExerciseView.js'
import WorkoutView from './WorkoutView.js'
import Navbar from './Navbar.js'
import List from './List.js'

export default function Views() {
	const views = {
		Exercises: <ExerciseView/>,
		List: <List/>,
	}
	return <Navbar views={views} defaultView={'List'}/>
}
