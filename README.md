# Gym App 

![gym app logo](ui/logo.png)

A simpler way to track your lifts.

--------------------

## What is this?

Other gym apps track lifts by requiring you to provide weight, reps, and sets per each exercise. This app only requires you to provide the weight, which makes a huge difference.

Let's say that you're doing a standard 5 by 5 workout (5 sets of 5) with 3 exercises: squat, deadlift, and benchpress. A traditional gym app would have you to provide the weight and reps 5 times per exercise, which is 30 pieces of information. This app only requires 3 pieces of information: the weight for each exercise - that's 10 times less work when compared to traditional gym apps!

## Database
Create a new file in `api` called `config.env` and provide MongoDB `ATLAS_URI`:
```bash
ATLAS_URI=
PORT=5000
```
## API
```bash
cd api

# Setup
npm install
npm run start

# Running tests
npm run test

# Updating swagger
npm run swagger
```

## UI
```bash
cd ui

# Setup
npm install
npm run ios
```
