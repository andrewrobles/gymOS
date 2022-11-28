import Exercises from './components/Exercises.js'
import Workouts from './components/Workouts.js'
import Navbar from './components/Navbar.js'

export default function App() {
	const views = {
		Exercises: <Exercises/>,
		Workouts: <Workouts/>,
	}
	return <Navbar views={views} defaultView={'Workouts'}/>
}
