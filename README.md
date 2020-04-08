To clone and install dependencies

- `git clone https://github.com/sm3rta/guestbook-frontend`

- `cd guestbook-frontend`

- `yarn` (or use npm)

To start the application

- Make sure the backend server is running: https://github.com/sm3rta/guestbook-backend
- `yarn start`

To generate the docs

- `yarn docs`
- Open /docs/index.html

I used

- axios for data fetching
- jsdoc for documenting components
- moment to display dates in a "from now" format
- prop-types for validating component props
- react-router-dom for routing

I've chosen a simplistic approach with a responsive design

The web app mainly consists of 3 pages

- A sign-in page
- A sign-up page
- Homepage where you can view, add, edit, delete and reply to messages
