
<p align="center">
  <a href="https://checkinout.vercel.app/" target="_blank">
    <img alt="Checkinout Logo" src="public/checkinout_repo.png">
  </a>
</p>


# Checkinout - T3 Stack

A checklist project built for daily use, built using the [T3 stack](https://create.t3.gg/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)




## Introduction

Checkinout is a web application that simplifies managing your daily routine checks. With Checkinout, you can easily create a list of tasks that you need to complete every day and mark them off as you go. It's ideal for busy professionals, parents, or anyone looking for an easier way to manage their daily routine checks.

#### Features
- Create multiple lists with as many items as you need
- Check off items as you complete them
- View completed items for each list
- Simple and intuitive user interface
- Free to use

## Tech Stack
[T3 stack](https://create.t3.gg/), [Mantine](https://mantine.dev/), [next-i18next](https://github.com/i18next/next-i18next)

## Live project

[Checkinout (hosted on Vercel)](https://checkinout.vercel.app/)


## Run Locally

Clone the project

```bash
  git clone https://github.com/burak-sevinc/t3-checkinout.git
```

Go to the project directory

```bash
  cd t3-checkinout
```

Install dependencies

```bash
  npm install
```

> You need to create a `.env` file at the root folder with the keys defined in `.env.example` before running any of the following commands.



> To migrate the Database (Make sure that you have a valid DATABASE_URL in your .env file). This is needed if you are planning to run Checkinout locally

```bash
 npx prisma db push
 ```

Start the app in development mode with hot-code reloading by running:
```bash
 npm run dev
```

Create an optimized production build of the application by running
```bash
 npm run build
```

After building the app start it in production mode by running:
```bash
npm start
```

 Check if there are any linting issues by running:
```bash
npm run lint
```

## Feedback

If you have any feedback, you can reach out to me at info@buraksevinc.dev

