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
    allowNotifs: boolean;
}