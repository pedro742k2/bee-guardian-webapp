# 🐝 Bee Guardian Project

### Note
- This is the front-end (React web app) repository of the Bee Guardian Project. To access the back-end repository [click here](https://github.com/pedro742k2/bee-guardian-server).

## 🍯 What is the Bee Guardian Project and what is it used for

Bee Guardian is a React web app with the goal of speeding up the process of checking beehives health and production by monitoring multiple factors such as weight, internal and external temperatures and humidity.This is possible with the presence of an electronic device installed inside the hive container which is sending new readings regularly.
<br/><br/>
This project allows the beekeepers not to have to wear a special suit and move every day or week to the location of the hive(s) just to check if they are in place and producing.
  
## How to test

### 🌎 Bee Guardian Project is available online:
  - 📡 Live web app: [Click here](https://pedro742k2.github.io/bee-guardian-webapp)
  
### ⚙️ If you want to test it locally:
  - Clone the repository;
  - Inside the repository:
    - Execute `npm install` to install all project dependencies;
    - Execute `npm run dev` to run the web app and (by default) access it at http://127.0.0.1:5173/bee-guardian-webapp (the link will be provided by the terminal);
  - To see the readings of an actual hive, you can both:
    - Login with the following credentials:
      - user: `pedro2002`;
      - password: `123456`;
      - Go to page `Dashboard`;
      - Select Hive ID `101` named `Hive A`.
    - Register a new account:
      - Go to page `Dashboard`;
      - Add the ID `101` on the "Last Readings & Add Hive" section with the description you want.

## 🤝 Contributions and feedback

  - 🛠️ If you have any suggestions, want to report an issue or give general feedback, feel free to make a pull request or email me at `pedrobatista0704@gmail.com` with the suggestion or detailed description of the problem 😀.

## 💻 Technologies

### Frontend
  - React.js
  - Typescript

### Backend ([Repository](https://github.com/pedro742k2/bee-guardian-server))
  - Node.js
  - Typescript
  - Express
  - Bcrypt
  - JSON Web Token
  - Database: PostgreSQL, Redis
