![App preview](https://github.com/thinkerelwin/social-app-fullstack/assets/25836139/a7cbe337-fd0d-4733-a3be-f69f8797a7bd)

A demo app that contains both the Front-end and Back-end project, it's a social media app with an advertisement on the side. 

**Guest account**: `zxcvs@mail.com`/`zxcvs`

## Features

- **Responsive:** have layouts for mobile and desktop

- **High score on Lighthouse audition:** achieved by following best practices such as setting cache control, optimizing image size, utilizing CDN, etc.

  ![blog performance](https://github.com/thinkerelwin/social-app-fullstack/assets/25836139/11a07393-b66b-4f45-ab11-3e25171c5dba)

- **With code quality in mind:** auto lint codes with **Eslint**, **Prettier**, **Stylelint** before commit, and use **SonarQube** to improve code quality.

- **Dark mode:** ease on your eyes.
- **A test environment that is ready to use:** have a basic E2E and unit test cases written with Cypress

## User Story

- Can register a new user by clicking the "sign up" text on the bottom left corner of the login page
- Can log in by entering the email and password on the login page
- The user can create a post with text, image, or both by using the create post widget at the center top.
- The user can like a post by clicking the like button located on the bottom left of a post
- The user can add other users as a friend by clicking the add button on the top right side of a post
- The user can toggle the display of comments by clicking on the comment button located at the bottom of a post
- The user can toggle dark mode by clicking the moon icon on the header

## Running tests

- "npm run cypress:run-unit" to run unit test cases(need a local server running because there's no stub on the server response)
- 'npm run cypress:coverage' to get an E2E code coverage report (need to run E2E test once to collect the data).
- For tests written with Jest and React Testing Library, check [here](https://github.com/thinkerelwin/stock-scout)

*p.s. Cypress v13 is not fully compatible with vite v5 yet, you need to restart Cypress to change the testing type, or you will encounter an error otherwise*

## License

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
