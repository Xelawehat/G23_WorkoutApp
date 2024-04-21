// workoutData.js
const workoutsArray = [
    // {
    //     name: "Leg Day",
    //     color: "blue",
    //     date: "2024-04-20",
    //     time: "2024-04-20T16:25",
    //     timesCompleted: 0,
    //     exercises: [
    //       {
    //         name: "Deadlifts",
    //         sets: 3,
    //         reps: 5,
    //         weight: 315
    //       },
    //       {
    //         name: "Squats",
    //         sets: 3,
    //         reps: 5,
    //         weight: 50
    //       },
    //       // Add more exercises if needed
    //     ]
    //   },
    //   {
    //     name: "Chest Day",
    //     color: "red",
    //     date: "2024-04-20",
    //     time: "2024-04-20T16:25",
    //     timesCompleted: 0,
    //     exercises: [
    //       {
    //         name: "Bench Press",
    //         sets: 3,
    //         reps: 5,
    //         weight: 225
    //       },
    //       {
    //         name: "Tricep Pulldown",
    //         sets: 3,
    //         reps: 10,
    //         weight: 65
    //       },
    //       {
    //         name: "Push-Ups",
    //         sets: 3,
    //         reps: 20,
    //         weight: 0
    //       },
    //       // Add more exercises if needed
    //     ]
    //   },
];

export const addWorkout = (workout) => {
  workoutsArray.push(workout);
};

export const updateWorkout = (index, updatedWorkout) => {
  workoutsArray[index] = updatedWorkout;
};

export const deleteWorkout = (index) => {
  workoutsArray.splice(index, 1);
};

export default workoutsArray;