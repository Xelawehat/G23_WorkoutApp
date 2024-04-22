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
export interface IExercise {
    name: string;
    favorite: boolean;
    muscleGroup: string[];
    sets: number;
    reps: number;
    weight: number;
};

export const initialExercise: IExercise = {
      name: '',
      favorite: false,
      muscleGroup: [],
      sets: 0,
      reps: 0,
      weight: 0,
    };


// Define the workout object type
export interface IWorkout {
    name: string;
    time: Date; // You can use a specific type for time if needed
    color: string;
    timesCompleted: number;
    date: string; // You can use a specific type for date if needed
    exercises: Exercise[];
};

export const initialWorkout: IWorkout = {
    name: '',
    time: Date(),
    color: 'red',
    timesCompleted: 0,
    date: '',
    exercises: [],
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