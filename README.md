### Introduction Healthcare Bookings Platform
In order to counteract the shortage in care, care institutions often work with the deployment of independent care providers. For that reason, I think it is a good idea to create a booking system for available services and available caregivers. To put it very simply, data is exported and imported within a dashboard I compiled. And on the platform, the user can make a match by pressing a button. The caregiver receives a notification by email and by accepting this notification, the service is confirmed.

Firebase backend is used for registering, logging in and handling authentication. The API Key for Firebase is generated during application development at https://firebase.google.com/. The Firebase configuration is included in the firebase.js file, the data needed to connect the application to Firebase is stored in the .env file. Variables contained in the .env file must be prefixed with REACT_APP_, otherwise they will be ignored. The data of the caregivers and bookings has been established with the help of Heroku.

### Prerequisite for Windows
To install React on Windows, your system will require the minimum configuration as below:

Windows XP, Windows 7 (32/64 bit) or higher
Minimum 4 GB RAM and higher
10 GB available space on the hard disk
At least one Internet Browser e.g. Chrome, Firefox, Microsoft Edge etc.
Node.js
Active internet connection minimum speed 512kbps and above.
At least one installed code Editor to test and debug your code e.g.  
* Atom
* Sublime
* Visual studio code

### Installation guide 
To be able to use the webapplication locally, the following steps can be followed.
1. Clone the web app's Github repository.
2. Use the npm install command to download all dependencies.
3. Create a file called  .env in the root of your project. Complete the parameters as described in the file .env.  

Example: REACT_APP_MY_API_KEY={{INSERT_APIKEY}}

### Application Guide
* The homepage overview of recently made bookings and top performing care providers.
* You can log in or create an account via the Login page. In addition, a test account can also be used:
	username test@test.nl
	password: Test123!
* Creating an account requires a unique username, unique email address and password.
* After creating an account, you can log in to the web application.
* Services can be assigned to available care providers via the broking platform.
* When the caregiver accepts this service, the booking status will change to confirmed.

### TESTING
After logging in with your account you can change the emailaddress to your own at ./match page line 42.

to_email: clickedUser.email, // change clickedUser.email to your own e-mail. clickedUser.email to automates the email put your own email here to test

After that you can register 
![](Screenshot 3.png)
Login
![](Screenshot 2.png)
View the match page and send a request.
![](Screenshot.png)
