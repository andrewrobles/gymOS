import ExerciseView from './components/ExerciseView.js'
import WorkoutView from './components/WorkoutView.js'
import Navbar from './components/Navbar.js'

export default function App() {
	const views = {
		Exercises: <ExerciseView/>,
		Workouts: <WorkoutView/>,
	}
	return <Navbar views={views} defaultView={'Workouts'}/>
}
