<div align="center">
 
<img alt="zeplin" src="https://res.cloudinary.com/dwhsfh3sc/image/upload/v1656796276/quiz-grad/Heading_njttlt.png" width="150px" height="150px" />
 
# Quizgrad
 
A quiz app where you can play multiple types of quiz and compete with other players
 
 Have a look at the live demo of [Quizgrad](https://quizgrad.vercel.app/).
 
 
</div>


## Features

- User Can compete with other players.
- After every win of quiz user will be awarded with 10+ streak which can increase the booster level once it reach to the 100 streak.
- User can see the histories of quizess which he had attempted earlier.
- User can login and logout.
- Once user reach to the certain levels he will be awarded with some badges of quizgrad.

## Run Locally

Clone the project

```bash
  git clone https://github.com/mehulsatardekar/Quizgrad.git
```

Go to the project directory

```bash
  cd Quizgrad
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```

#### Note

This application uses Vite Environment.

```bash
  npm run dev
```

After successfull installation you will need to add .env file and supabase keys to run this app

```bash
Add .env file to the root folder
VITE_SUPABASE_URL= your Supabase url
VITE_SUPABASE_ANON_KEY= your Supabase anon key
```
[How to initialize & add keys to the app in supabase](https://supabase.com/docs/reference/javascript/initializing)

## Tech Stack

- **Client:** React-18, React RouterV6, Typescript, 
- **Backend-(DB):** Supabase  (postgres-sql)
- **Cloud & Infra:** Cloudinary & Vercel for CI-CD Development. 

## Database Schema
![Database ER diagram (crow's foot)](https://user-images.githubusercontent.com/36101139/179917892-11ceac4b-90fa-446b-acb9-9beaad0c5217.png)

## Optimization

- This app is build on vite environment which is 10,100x faster than webpack,parcle and roollup. Why Vite is because The HMR (Hot module Replacement) is really faster as compare to other tools and update on Vites are blazingly fast whenever you make changes it quickly updates and it has by default configured tree-shaking, lazy-loading and common chunk splitting (for better caching).

[Check why vite is recommended not a create-react-app] (https://vitejs.dev/guide/why.html#the-problems)

- I have used Indexs for quick data retrival from database.


