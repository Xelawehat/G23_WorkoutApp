To run the app that I just pushed you'll have to do a few things:

Edit the ip in these files: (so if a function doesn't work correctly or you get a Axios Network Error, most likely it's because the IP address isn't set correctly in one of these files).
Edit this line in each of the following files:

  "let currentIpAddress = '172.20.10.14:5000';"
  change '172.20.10.14' to your localhost ip address, which if you have windows you can find by opening a terminal (Windows Key + R, type cmd, press Enter; in terminal enter ipconfig and grab the IPv4 address)

  Authmodel.js	             Login/signup
  createWorkoutScreen.jsx		 Create a workout
  editWorkoutScreen.jsx		   edit a workout
  calendar.jsx			         retrieve all user workouts/display on the calendar
  profile.jsx                Edit the user's profile information
  listOfWorkouts.jsx         lists all the workouts/delete a workou

Open 2 terminals:
in terminal 1: (if you get an error that a few dependencies are missing just run npm install dependency_name)
"npm install " then run,
"npx expo start"

In terminal 2:
cd into /Backend directory
in terminal type "nodemon server.js" (npm install nodemon if you get an error that nodemon can't be found)
