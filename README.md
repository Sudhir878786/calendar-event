
### Installation 🔧

Local installation:

```bash
# Clone this repository
$ git clone 
# Change directory to the project path
```

---

**Server setup:**
```bash
# Change directory to the server path
$ cd server

# Install dependencies
$ npm install


```shell
PORT=5000
MONGODB_CNN= {Open MongoDB compass and connect to an existing server in my case mongodb://localhost:27017}
JWT_SECRET_KEY=RANDOMKEY
```

---

**Client setup:**
```bash
# Go back to the project path
$ cd ..

# Change directory to the client path
$ cd client

# Install dependencies
$ npm install



## Deployment 📦

```bash
# Open terminal in project path and run
$ cd server
$ npm start


# Open another terminal in project path and run
$ cd client
$ npm start
```
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

```
├─ client
│  ├─ .env
│  ├─ .env.example
│  ├─ package-lock.json
│  ├─ package.json
│  ├─ public
│  │  ├─ favicon.ico
│  │  ├─ index.html
│  │  ├─ logo192.png
│  │  ├─ logo512.png
│  │  ├─ manifest.json
│  │  └─ robots.txt
│  └─ src
│     ├─ actions
│     │  ├─ auth.jsx
│     │  ├─ event.jsx
│     │  └─ ui.jsx
│     ├─ App.jsx
│     ├─ components
│     │  ├─ auth
│     │  │  ├─ auth.css
│     │  │  ├─ LoginScreen.jsx
│     │  │  └─ RegisterScreen.jsx
│     │  ├─ calendar
│     │  │  ├─ calendar.css
│     │  │  ├─ CalendarEvent.jsx
│     │  │  ├─ CalendarModal.jsx
│     │  │  └─ CalendarScreen.jsx
│     │  └─ ui
│     │     ├─ AddNewBtn.jsx
│     │     ├─ Alert.jsx
│     │     ├─ DeleteBtn.jsx
│     │     ├─ icons
│     │     │  ├─ DeleteIcon.jsx
│     │     │  ├─ LogoutIcon.jsx
│     │     │  ├─ PlusIcon.jsx
│     │     │  └─ UserIcon.jsx
│     │     ├─ LoadingScreen.jsx
│     │     ├─ Navbar.jsx
│     │     └─ ui.css
│     ├─ helpers
│     │  ├─ fetch.jsx
│     │  └─ prepareEvents.jsx
│     ├─ index.css
│     ├─ index.jsx
│     ├─ reducers
│     │  ├─ authReducer.jsx
│     │  ├─ calendarReducer.jsx
│     │  ├─ rootReducer.jsx
│     │  └─ uiReducer.jsx
│     ├─ routers
│     │  ├─ AppRouter.jsx
│     │  ├─ AuthRouter.jsx
│     │  ├─ PrivateRoute.jsx
│     │  └─ PublicRoute.jsx
│     ├─ store
│     │  └─ index.jsx
│     └─ types
│        └─ index.jsx
├─ README.md
└─ server
   ├─ .env
   ├─ .env.example
   ├─ controllers
   │  ├─ auth.js
   │  └─ events.js
   ├─ database
   │  └─ config.js
   ├─ helpers
   │  ├─ databaseValidators.js
   │  ├─ dateValidators.js
   │  └─ jwt.js
   ├─ index.js
   ├─ middlewares
   │  ├─ validateFields.js
   │  └─ validateJWT.js
   ├─ models
   │  ├─ Event.js
   │  └─ user.js
   ├─ package-lock.json
   ├─ package.json
   ├─ public
   │  └─ index.html
   └─ routes
      ├─ auth.js
      └─ events.js

```