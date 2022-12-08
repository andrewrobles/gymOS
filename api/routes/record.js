const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

const moongo = require('../repositories/baseRepository')

// Get all workouts
recordRoutes.route("/workouts").get(async (req, res) => {
	const db = dbo.getDb("gym")
	const workoutRepository = moongo.repository(db.collection("workout"))
	const workouts = await workoutRepository.getMany()
	res.json(workouts)
});
 
// Get all exercises
recordRoutes.route("/exercises").get(async (req, res) => {
	const db = dbo.getDb("gym")
	const exerciseRepository = moongo.repository(db.collection("exercise"))
	const exercises = await exerciseRepository.getMany()
	res.json(exercises)
});

// Get exercise by id 
recordRoutes.route("/exercises/:id").get(async (req, res) => {
	const db = dbo.getDb("gym")
	const exerciseRepository = moongo.repository(db.collection("exercise"))
	const exercises = await exerciseRepository.findOneById(req.params.id)
	res.json(exercises)
});

// Get workout by id 
recordRoutes.route("/workouts/:id").get(async (req, res) => {
	const db = dbo.getDb("gym")
	const workoutRepository = moongo.repository(db.collection("workout"))
	const workouts = await workoutRepository.findOneById(req.params.id)
	res.json(workouts)
});
 
// Create a new exercise
recordRoutes.route("/exercises").post(async (req, res) => {
	let newExercise = {
	   name: req.body.name,
	};
	const db = dbo.getDb("gym")
	const exerciseRepository = moongo.repository(db.collection("exercise"))
	const result = await exerciseRepository.insertOne(newExercise)
	res.json(result)
});

// Create a new workout
recordRoutes.route("/workouts").post(async (req, res) => {
	let newWorkout = {
		name: req.body.name,
		exerciseIds: req.body.exerciseIds
	};
	const db = dbo.getDb("gym")
	const workoutRepository = moongo.repository(db.collection("workout"))
	const workouts = await workoutRepository.insertOne(newWorkout)
	res.json(workouts)
});

 
// // This section will help you update a record by id.
// recordRoutes.route("/update/:id").post(function (req, response) {
//  let db_connect = dbo.getDb();
//  let myquery = { _id: ObjectId(req.params.id) };
//  let newvalues = {
//    $set: {
//      name: req.body.name,
//      position: req.body.position,
//      level: req.body.level,
//    },
//  };
//  db_connect
//    .collection("records")
//    .updateOne(myquery, newvalues, function (err, res) {
//      if (err) throw err;
//      console.log("1 document updated");
//      response.json(res);
//    });
// });


// Delete a workout by id 
recordRoutes.route("/workouts/:id").delete(async (req, res) => {
	const db = dbo.getDb("gym")
	const workoutRepository = moongo.repository(db.collection("workout"))
	const workouts = await workoutRepository.deleteOneById(req.params.id)
	res.json(workouts)
});
 
 
module.exports = recordRoutes;
