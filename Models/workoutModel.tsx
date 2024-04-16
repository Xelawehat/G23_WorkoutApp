//
//
//
// Outline for Sets, Exercise, and Workout Objects

// Define the sets object type
export interface Sets {
    reps: number;
    weight: number;
};

// Define the exercise object type
export interface Exercise {
    name: string;
    favorite: boolean;
    muscleGroup: string[];
    bodyweight: boolean;
    sets: Sets[];
};

// Define the workout object type
export interface Workout {
    name: string;
    time: string; // You can use a specific type for time if needed
    difficulty: number;
    favorite: boolean;
    color: string;
    timesCompleted: number;
    date: string; // You can use a specific type for date if needed
    exercises: Exercise[];
};

export interface user {
    username: string;
    password: string;
    email: string;
    age: string;
    height: number;
    weight: number;
    gender: string;
    workouts: Workout[];
    goal: string;
}

// Example usage:
const workout: Workout = {
    name: "Chest Day",
    time: "60 minutes",
    difficulty: 3,
    favorite: true,
    color: "red",
    timesCompleted: 0,
    date: "2024-04-10",
    exercises: [
        {
            name: "Bench Press",
            favorite: false,
            muscleGroup: ["Chest", "Triceps"],
            bodyweight: false,
            sets: [
                { reps: 10, weight: 225 },
                { reps: 10, weight: 225 },
                // Add more sets if needed
            ]
        },
        {
            name: "Incline Bench Press",
            favorite: false,
            muscleGroup: ["Chest", "Triceps"],
            bodyweight: false,
            sets: [
                { reps: 10, weight: 185 },
                { reps: 10, weight: 185 },
                // Add more sets if needed
            ]
        },
        // Add more exercises if needed
    ]
};
