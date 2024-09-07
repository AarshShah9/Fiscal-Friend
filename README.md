![React Badge](https://img.shields.io/badge/React-61DAFB?logo=react&logoColor=000&style=for-the-badge)
![TypeScript Badge](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff&style=for-the-badge)
![Tailwind CSS Badge](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?logo=tailwindcss&logoColor=fff&style=for-the-badge)
![Node.js Badge](https://img.shields.io/badge/Node.js-5FA04E?logo=nodedotjs&logoColor=fff&style=for-the-badge)
![Express Badge](https://img.shields.io/badge/Express-000?logo=express&logoColor=fff&style=for-the-badge)
![MongoDB Badge](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb&logoColor=fff&style=for-the-badge)
![Mongoose Badge](https://img.shields.io/badge/Mongoose-800?logo=mongoose&logoColor=fff&style=for-the-badge)
![Amazon Web Services Badge](https://img.shields.io/badge/Amazon%20Web%20Services-232F3E?logo=amazonwebservices&logoColor=fff&style=for-the-badge)
![Amazon RDS Badge](https://img.shields.io/badge/Amazon%20RDS-527FFF?logo=amazonrds&logoColor=fff&style=for-the-badge)
![Amazon EC2 Badge](https://img.shields.io/badge/Amazon%20EC2-F90?logo=amazonec2&logoColor=fff&style=for-the-badge)

# Fiscal-Friend

## About

This is a MERN stack project that is meant to be your 'Fiscal Friend" which helps you budget your finances, keep track of your investments such as stocks, and much more. The technologies used include, React, Express, Node.js, Mongoose, MongoDB, TailwindCSS and external REST Web APIs to get historical and present stock data. The application was also hosted using AWS (CodePipeline, CodeBuilds, ElasticBeanstalk, EC2 and RDS).

### Running the dev server
- When in base directory, to install all dependencies run:
```bash
npm run install:all
```
- To run the full stack, run:
```bash
npm run dev:full
```
- To run the front end only, run:
```bash
npm run dev:front
```
- To run the back end only, run:
```bash
npm run dev:back
```

You can also run the front end and back end separately by navigating to the respective directories and running specific npm commands in each. These scripts are located in the package.json files in the respective directories.

### Environment Variables
- The `.env` file in the root directory is used to store environment variables. This file is not committed to the repository. You will need to create your own `.env` file in the root directory and add the env variables you need. This should be ignored by git, but try to make sure it never sneaks back in somehow.

### Prettier
- Please use prettier to format your code.

For VSCode Users you can add this to your `.vscode/settings.json` file to enable auto formatting on save.
```json
{
  "editor.formatOnSave": true,
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
### Backend Testing
Please write unit tests to go with any controllers. These use the Jest testing framework. To run tests, while in the /server/ directory execute:
```bash
npm run test
```


## Team Members

- Aarsh Shah
- Brandon McGee
- Eadan Lay
- Findlay Brown
- Ken Liu
- William Fraser
- Zachariah Blair
