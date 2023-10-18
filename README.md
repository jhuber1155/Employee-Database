# Employee-Database

## Description

This project was a test of our understanding of both how a SQL database works as well as much as how to interact with said database when we do build it. There are a lot of moving parts on this project which needed to work together to get to something functionable and testable. We used our SQL workbench to make sure our SQL commands were effective and doing what we wanted, and then we took those SQL commands and wrapped them in Javascript. While using that Javascript, we also employed many new techniques which are abstract and can be difficult to master. 

Those concepts included the Async/Await ability that a function can use to work with dynamic data and execute certain abilities at certain times. With the power of Async/Await comes the checks and balance of try-catch, where we try our code in real time and try to catch the errors that occur while being asynchronus. Another new thing I learned was the new Promise ability. It is a chain promise which coincides with Async/Await and allows for promise chaining to execute more code when the data needed for it is available. Included in new promise techniques is also the db.query/db.promise.query technique which is specifically used with the SQL database and data going to and from it.

I also learned nifty tricks like the console.table ability to show a formatted table of data in the console log, and the power of the ever present for-loop which is needed to gather a group of data and present it in a palatable array (through the push method in this case) for referencing in other functions or tables. I also gained more experience of working with parameters (params) and data as well as the need to fulfill the resolve and reject functions of the new Promise.

This particular project will help end users manage their employees quickly and efficently as well as allow them to keep a ten thousand foot view of the company with the departments, salaries, and job titles of the people working at said company.

## Installation

This particular set of code needs to be downloaded from github, cloned from the repository, and then opened with the code editor of your choice. You can then download and run all the npm packages with the command line npm i. After all packages have been installed, you are ready to use the application.

## Usage

Open the Integrated terminal in your code editor and run node server.js. From there you will be prompted to choose from a series of questions what you would like to do/change about the company and its roster of employees, roles, and departments.

Link to video walkthrough: https://drive.google.com/file/d/1Fc1O0vK2su_eAOjY2gFqdUHkhgN6Ve3g/view

## Credits

I would like to thank my fellow students and Instructors at the UCLA bootcamp for helping me understand this very complex and often difficult project. I had a lot of help and guidence from everyone. I also relied on the X-pert Learner software from the UCLA bootcamp and supplemented that learning with Chat GPT when I couldnt fully understand a concept I learned. I also used many websites and have listed a few which were of use:

Many topics with the MDN Web Docs : https://developer.mozilla.org/en-US/
Many topics with W3Schools : https://www.w3schools.com/

Documentation with Inquirer and mysql2

Mostly Async/Await and new Promise:
https://javascript.info/async-await
https://www.geeksforgeeks.org/async-await-function-in-javascript/
https://www.theodinproject.com/lessons/node-path-javascript-async-and-await
https://www.digitalocean.com/community/tutorials/js-async-functions
https://stackoverflow.com/questions/50326040/javascript-promise-with-await-explanation
