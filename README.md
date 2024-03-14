# Finapp
Personal Finance Application.
https://financialappgui2.web.app/

# How-To-Setup-Back-End

## Create-Project
  1. Go to https://console.firebase.google.com/
  2. Click Add Project and follow the prompt
 
## Hosting
### Get-CLI (Linux)
#####  Install the CLI in your Linux machine
	 $ curl -sL https://firebase.tools | bash
##### In the firebasae app
	Goto Build->Hosting, click **Get Started**
	Do not install npm, simply hit next.
	Here you will be able to set **Add Custom Domain**
#####  Login with the desired account (Web-Browser will be opened)
	firebase login
 	
##### Begin hosting (Choose desired folder, select app created at the console.firebase and  decide if app is a Single-Page-App, in our case its not a Single-Page-App)
###### notice that an index.html, 404.html, firebase.json and other hidden files will be created.
	firebase init hosting
##### Host locally  (if hosting locally, "http://localhost:5000/" will be the default location)
	firebase server
##### Host Publicly (The site's address will be printed in the console. Note that it has automatic SSL certification)
	firebase deploy
### From here you are freely available to create or paste files (like the .zip file we provided) in the folder
## Authentication (Sign-up/Log-in)
##### Find all methods
	Goto Build->Authentication
##### Choose decired
	In our case, the simplest would be google#
##### Add appropriate "Public-facing" name
	This name will be seen by user upon login
##### Add appropriate "supporting email"
	Usually same as the current account
#####  Save
	Click **Enable**
## DataBase
### We Will Be Using RealTime Database (Which is a noSQL)
##### Create the DB
	Goto side-bar and select "Realtime Database" and then click "Get Started"
##### Selecting Database location
	Choose storage location nearest to you
##### Setup The Database (after enable, it will redirect to the realtime database console where data will be added)
	Choose "Start in test mode" then click "enable"

## Interfacing JavaScript with FireBase
##### Acquire the necessary FireBase Configuration Data (AuthKey, AppID... necessary for communication). Be sure to select the CDN option as its the easier
	Goto Project-OverView -> Project-Setting -> (scroll-down and copy project-config)
##### Communicate with FireBase API using Configuration Data
	Paste project-config data into any .mjs that needs to communication with FireBase API
##### Importing Functions from the SDK (Simply choose the library, and define the functions needed)
	import { function-name-heres } from "https://www.gstatic.com/firebasejs/10.1.0/library-name-here.js";
##### Example FireBase Authentication
	```js
	 import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
	onAuthStateChanged(auth, (user) => {
		// this function by firebase, allows us to place if statements
		loginlogoutreference.removeEventListener("click", userSignOut);
		loginlogoutreference.removeEventListener("click", userSignIn);
		if (user) {
			loginlogoutreference.innerHTML = "Logout";
			loginlogoutreference.addEventListener("click", userSignOut);
			// Upon login gather unique Google ID to access the database
			googleuniqueuserid = user.uid;
			GatherAndDisplayCurrentDate();
		} else {
			loginlogoutreference.innerHTML = "Login";
			googleuniqueuserid = null;
			removeallaccordiotitems()
			setTimeout(function() {
			    window.location.href = "../../index.html";
			  }, 1000);
			}
	});
	```
