import ExerciseView from './components/ExerciseView.js'
import WorkoutView from './components/WorkoutView.js'
import Navbar from './components/Navbar.js'
import List from './components/List.js'

export default function App() {
	const views = {
		Exercises: <ExerciseView/>,
		Workouts: <WorkoutView/>,
		List: <List/>
	}
	return <Navbar views={views} defaultView={'List'}/>
}
