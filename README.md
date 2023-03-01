# Employee Polls
A react web app that allows user to create Would You Rather A or B question, answer questions and compete with other users. Win by creating and answering more questions. This project uses redux to manage state, thunk to handle async actions, and includes only front end work. 

## Get started by `npm install` and `npm start`
1. Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
2. Must log in with the credentials provided in _DATA.js in order to navigate to various pages.
   - sarahedo/password123, mtsamis/xyz123, etc
3. Once logged in, you have access to /home, /add, /leaderboard, and /profile pages as well as question answering/result page through clicking any of the questions on the homd page. 
4. Answer any questions in the New Questions section, and view the result once the answer is submitted.
5. View the question result by navigating to any of the Done Questions section.
6. All questions should be listed reverse-chronilogically.
7. Go to New page to add a new Would You Rather question.
8. Go to Profile page to view all of your questions.
9. Log out by clicking the Log Out link.

Note: for testing purpose, the initial data is loaded to redux data store whenever the app is loaded regardless user signin (in real world, this should not be the case). You can retain the newly-created question and logging in/out with different users to see that question. However, if you try to access that question directly through the link pasted in the address bar, then this won't work as the app gets reloaded and the data store gets reset to initial data. 

## Unit test by `npm run test`
1. There are 18 tests. They should be all pass. 
