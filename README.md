# Fiscal-Friend

### Running the dev server
- When in base directory, to install all dependencies run:
```bash
npm install:all
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
