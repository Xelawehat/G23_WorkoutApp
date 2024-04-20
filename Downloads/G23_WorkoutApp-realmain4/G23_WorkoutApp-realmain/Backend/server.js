//  TODO: The age and weight must be replaced with user entered data
//  MODULES
//  Import the required modules
const express = require('express');           //  for building web servers & APIs; respond to HTTP requests, create routes for the app
const mongoose = require('mongoose');         //  connect to the MongoDB database, makes tranferring data simpler
const bodyParser = require('body-parser');    //  parses JSON payloads in HTTP requests, so that we can extract data
const cors = require('cors');                 //  Cross-Origin Resource Sharing, restricts who can access the app essentially
const bcrypt = require('bcrypt');             //  hash passwords, uses blowfish algorithm
const session = require('express-session');   //  keeps authenticated users logged in
const { default: getUserWorkouts } = require('./backendFunctions');
const Schema = mongoose.Schema;


//  Initialize the app
const app = express();
const port = process.env.PORT || 5000;  //  Set the port


// Middleware setup
app.use(cors());
app.use(express.json());
app.use(bodyParser.json()); //  parses JSON formatted requests
//  Next line times how long the request took
app.use((req, res, next) => {
    console.time('request');
    res.on('finish', () => {
      console.timeEnd('request');
    });
    next();
  });


  //  Session Middleware configuration (enabling cookies to keep track of the current user/ensure authorized access)
  app.use(session({
    secret: 'Mount-Everest',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
      maxAge: 1000*60*60*24
  }
  }));

  //    DEBUGging cookies
  app.get(`/show-session-info`, (req,res) =>{
    const isLoggedIn = req.session.isLoggedIn;

    //  Access the session cookie
    const sessionCookie = req.cookies['connect.sid'] || 'No session cookie';
    res.send(`Session Cookie: ${sessionCookie}<br>Logged In: ${isLoggedIn}`);
  })

  // MongoDB connection - feel free to pass it your connection String
const uri = "mongodb+srv://groot:WE_will_Get_100.@main-cluster.qga3zp6.mongodb.net/app?retryWrites=true&w=majority&appName=Main-Cluster";
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));


  //    SCHEMAS
  //  Exercise schema
const exerciseSchema = new Schema({
    name: {type: String, required: true},
    muscleGroup: {type: String, required: false},
    sets: {type: Number, required: true},
    reps: {type: Number, required: true},
    weight: {type: Number, required: true},
    difficulty: {type: Number, required: false},
    personalBest: {type: Number, required: false},
    favorite: {type: Boolean, required: false},
  });


  //  Official workout schema
const UserSchema = new Schema({
    email: { type: String, required: true },
    username: { type: String, required: true },
    password: { type: String, required: true }, // Consider using bcrypt for hashing
    age: String,
    height: String,
    weight: String,
    gender: String,
    goals: String,
    experience: String,
    workouts: [{
      name: String,
      time: { type: Date, default: Date.now }, // Changed from Timestamp to Date
      difficulty: Number,
      favorite: { type: Boolean, default: false },
      color: String,
      timesCompleted: { type: Number, default: 0 },
      date: { type: Date, default: Date.now },
      exercises: [exerciseSchema] // Renamed from workout to exercises for clarity
    }]
  });
  const User = mongoose.model('User', UserSchema);
//   // Ensure workouts is always an array even if not provided
//   UserSchema.path('workouts').default([]);   //  Extra-to ensure workouts array is initialized to empty, but not neccessary


//  ROUTES  -    API Endpoints
//  TODO: I have an error checking the cookie when getting the Workout name, because Insomnia automatically creates a new cookie
//  TODO: Having an issue with the cookies - a new cookie is created each time, so cookie not stored for user - so error: Unauthorized occurs.

//  Register
app.post('/register', async (req, res) => {
    const { email, username, password, age, weight, workouts } = req.body;
  
    try {
      // Hash password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create a new instance of User with the hashed password and additional details
      const newUser = new User({
        email,
        username,
        password: hashedPassword,
        age,
        weight,
        workouts: workouts || []  // Use provided workouts or initialize with an empty array if none provided
      });
  
      // Save the new user to the database
      await newUser.save();
  
      // Optionally set user ID in session (only if session is actually used for subsequent requests)
      req.session.user = newUser._id;
      req.session.isLoggedIn = true;

  
      // Send a successful response back
      // res.status(201).send('User registered successfully.');
      res.send({
        message: "success",
        userId: newUser._id,  // Send user ID back to client
        isValid: true
    });
    } catch (error) {
      console.error('Error during user registration:', error);
      console.log(error.message);
      res.status(500).send(error.message);
    }
  });

//  Login
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user by username in the User2 model
      const user = await User.findOne({ username });
      if (!user) {
        console.log('User not found');
        return res.status(404).send('User not found.');
      }
  
      // Compare the provided password with the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).send('Invalid credentials.');
      }
  
      // Store the user's ID in the session after successful login
      req.session.user = user._id;
      req.session.isLoggedIn = true;    //  for logout purposes & accessing workouts (the secured route)

      /*
      //    DEBUG
      const isLoggedIn = req.session.isLoggedIn;
      //  Access the session cookie
      const sessionCookie = req.cookies['connect.sid'] || 'No session cookie';
      res.send(`Session Cookie: ${sessionCookie}<br>Logged In: ${isLoggedIn}`);
    console.log('Session Cookie:',sessionCookie);
    console.log('Logged In:',isLoggedIn)
    */
      
      // res.send('Login successful.');
      res.send({
        message: "success",
        userId: user._id,  // Send user ID back to client
        isValid: true
    });
    } catch (error) {
      console.error('An error occurred during the login process:', error);
      res.status(500).send('An error occurred during the login process.');
    }
  });

  //    Add workout
  app.post('/users/:userId/workouts', async (req, res) => {

    const {userId} = req.params;
    const workoutData = req.body;

    //  TODO: Ensure this works correctly - Session checking
    /*
    if (!req.session.user || req.session.user !== req.params.userId) {
      return res.status(401).send('Unauthorized');
  }
  */

    try{

      const user = await User.findById(userId);
      if(!user) {
        return res.status(404).send('User not found');
      }
      else{
        console.log('Authorized');
      }

       // Check if workouts array is initialized
       if (!user.workouts) {
        user.workouts = []; // Initialize if not existent
    }

      user.workouts.push(workoutData);
      await user.save();
      //  send status, sent successfully
      res.status(200).json({
        message: 'New workout added successfully'
      });
      console.log('Successfully created a new workout.');

      //  catch clause for error
    } catch(error){
      res.status(500).send(error.message);
      console.log('Workout not created');
    }
  });


  // Assuming you have already set up express and other middlewares
app.get('/users/:userId/workouts', async (req, res) => {
  const { userId } = req.params;

  try {
      const user = await User.findById(userId).populate('workouts');
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      res.status(200).json(user.workouts);  // Assuming 'workouts' is an array field in your User model
  } catch (error) {
      res.status(500).json({ message: 'Error retrieving workouts', error: error.message });
  }
});

  // OLD - Get workout (display to console for now)
//   app.get('/users/:userId/workouts', async (req, res) => {
//     const { userId } = req.params;
//     // const workoutName = req.query.name; // Access the workout name passed as a query parameter

//     /*
//     if (!req.session.user || req.session.user.toString() !== userId) {
//         return res.status(401).send('Unauthorized');
//     }
//     */

//     try {
//         const user = await User.findById(userId);
//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         // // Find the workout by name
//         // const workout = user.workouts.find(w => w.name === workoutName);
//         // if (!workout) {
//         //     return res.status(404).send('Workout not found');
//         // }

//         // console.log('Workout found:', workout); // Print the workout to the console
//         res.status(201).json({message: "success"}); // Send the workout as a response
//     } catch (error) {
//         console.error('Error retrieving workouts:', error);
//         res.status(500).send(error.message);
//     }
// });


//  Route to edit the workout
app.patch('/users/:userId/workouts', async (req, res) => {

  const { userId } = req.params;
  const {newName, workoutUpdate} = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    //  Find the workout by name
    const workout = user.workouts.find(w => w.name === newName);
    if(!workout) {
      return res.status(404).json({message: "Workout Not Found"});
    }

    //  Uppdate the workout
    Object.assign(workout, workoutUpdate);
    await user.save();

    res.status(201).json({
      message: "Workout updated successfully",
      updatedWorkout: workout
    });

  } catch (error) {
    res.status(500).json({message: "Error updating workout", error: error.message});
  }

});

//  Delete the workout
app.delete('/users/:userId/workouts', async (req, res) => {
    const { userId } = req.params;
    const workoutName = req.query.name;
  
    /*
    if (!req.session.user || req.session.user.toString() !== userId) {
        return res.status(401).send('Unauthorized');
    }
    */
  
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send('User not found');
        }
  
        // Filter out the workout to delete
        const initialCount = user.workouts.length;
        user.workouts = user.workouts.filter(workout => workout.name !== workoutName);
  
        if (user.workouts.length === initialCount) {
            return res.status(404).send('Workout not found');
        }
  
        await user.save();
        res.send('Workout deleted successfully');
    } catch (error) {
        console.error('Error deleting workout:', error);
        res.status(500).send(error.message);
    }
  });

  //  Route to edit the profile
  app.patch('/users/:userId/profile', async (req, res) => {

    const { userId } = req.params;
    const {age, height, weight, gender, goals, experience} = req.body;

    try {
      const updatedUser = await User.findByIdAndUpdate(userId,
      {$set: {age, height, weight, gender, goals, experience}},
      {new: true, runValidators: true}
    );

    if(!updatedUser) {
      return res.status(404).json({message: "User not found"});
    }

    res.status(200).json({
      message: "success",
      data: updatedUser
    });

    } catch (error) {
      res.status(500).json({message: "Error updating profile", error: error.message});
    }

  });


  /*
  app.post('/logout', function(req, res) {
    req.session.destroy(function(err) {
        if (err) {
            return res.status(500).send('Failed to log out');
        }

        // Optionally clear the client-side cookie as well.
        res.clearCookie('connect.sid');  // 'connect.sid' is the default session cookie name; change it if you have set a different name.
        
        res.send('Logged out successfully');
    });
});
*/

  //    SERVER (start server listening on )
  app.listen(port, () => console.log(`Server running on port ${port}`));