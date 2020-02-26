# Rejection

A student project for [Learn JavaScript with Eric Elliott](https://ericelliottjs.com).

Want to work as a team?

You gotta lose to win.

Train yourself to:

* Get a raise
* Sell more
* Develop more business
* Negotiate better deals

The game has one rule:

**You must be rejected by a human being at least once per day.**

Ask for things outside your comfort zone, and you'll find yourself winning a lot more.

Win = 1 point.
Rejection = 10 points.

How long can you make your rejection streak last?


## Basic Level

Build a UI that lets you keep track of your score. Include a text input for the ask, who you asked, and two buttons: "Accepted" or "Rejected". For asynchronous requests such as emails or messages, record the score at the time you get the answer, not at the time you ask.

Use HTML+CSS and store a record of the data in `localStorage`.

Your data structure can be a simple array of ask objects:

```js
interface Question {
  id: String           // id of the question so you can get/edit/remove by id
  timestamp: Number,   // output from Date.now()
  question: String,    // the ask
  askee: String,       // person asked
  status: String       // 'Accepted', 'Rejected', 'Unanswered'
}
```

You can calculate everything else you need to know by reducing over the list of asks.

It may be useful to display a running tally of the user's current score. Just remember that the current day's subtotal needs to be recalculated each time an ask is accepted or rejected, so it will be useful to keep the list in an array that you can [reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) with each new ask added by the user.


## Mid level

Add an API to store data using a web service and database. Track multiple users (which means you'll need to add user authentication). Hint: Redis, Mongo, or RethinkDB would be good database candidates. Social login such as Facebook or Twitter would be good login options (easier and more secure than username/password logins).


## Advanced level

* Share your score and compete with your friends on Facebook.
* For each user, keep a leaderboard from their circle of friends.

## Extra credit

* Add mobile apps by turning your web app into a [Progressive Web Application](https://medium.com/javascript-scene/why-native-apps-really-are-doomed-native-apps-are-doomed-pt-2-e035b43170e9).


## To Implement:

1. Fork this repo
2. Implement your solution.
3. Open an issue with a link to your fork.

To get credit, you must [open an issue](https://github.com/learn-javascript-courses/rejection/issues/new?title=Challenge+completed+level:+basic/mid/advanced) with a link to your fork.

## Development notes

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Todo

- [x] Basic level
- [x] Save and restore state to/from localStorage
- [ ] Mid level
- [ ] Advanced level
- [ ] Extra credit

### Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

#### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

#### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
