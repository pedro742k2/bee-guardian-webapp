# 🐝 Bee Guardian Project

### Note
- This is the front-end (React web app) repository of the Bee Guardian Project. To access the back-end repository [click here](https://github.com/pedro742k2/bee-guardian-server).

## 🍯 What is the Bee Guardian Project and what is it used for

Bee Guardian is a React web app with the goal of speeding up the process of checking beehives health and production by monitoring multiple factors such as weight, internal and external temperatures and humidity.This is possible with the presence of an electronic device installed inside the hive container which is sending new readings regularly.
<br/><br/>
This project allows the beekeepers not to have to wear a special suit and move every day or week to the location of the hive(s) just to check if they are in place and producing.

## Screenshots (Dashboard page only)

### Dashboard Navigation
<img width="980" alt="dashboard navigation" src="https://user-images.githubusercontent.com/54741310/192089981-aa2d9bfd-754b-4808-ad21-beebf117cbc1.png">

### Hive Selector
<img width="980" alt="hive selector" src="https://user-images.githubusercontent.com/54741310/192089811-e2ae483d-9c5b-4118-b05b-0630c13d2abf.png">

### Last Readings & Add Hive Menu
<img width="980" alt="last readings   add hive" src="https://user-images.githubusercontent.com/54741310/192089834-0ace284c-1a5e-4863-a22a-4350d1129821.png">

### Chart Reading Options
<img width="980" alt="chart options selector" src="https://user-images.githubusercontent.com/54741310/192089851-d6b484aa-0ec8-4b45-9fab-ce7f07bf6711.png">

### Hive Readings
<img width="980" alt="chart readings" src="https://user-images.githubusercontent.com/54741310/192089874-80901bb5-b221-4283-897d-6eab04f0cd38.png">

### Hive Notes
<img width="980" alt="hive notes" src="https://user-images.githubusercontent.com/54741310/192089882-6c5403a3-39ff-4ad8-807c-a26389efbe08.png">


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
      - Select Hive ID `101` named `Hive A`. (I'll be updating the hive readings weekly)
    - Register a new account:
      - Go to page `Dashboard`;
      - Add the ID `101` on the "Last Readings & Add Hive" section with the description you want. (I'll be updating the hive readings weekly)

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
