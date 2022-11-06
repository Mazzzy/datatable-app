# Datatable app with photo listing Frontend
## Project overview
This repo is the codebase for the frontend of photo listing in grid(datatable). 

## Implementation details
It displays view having header, logo and theme switch mode (light/dark) option.
In the main view (dashboard) it contains grid(table) view that contains photo listing that are fetched from API along with pagination options in the bottom.
- At the top of grid(table) there is Filter option, it contains Filter by free text and respective column selection option.
- At the bottom of grid(table) there is pagination having options of first, prev, next and last. - By default page 1 along pageSize of 10 gets triggered and grid(table) gets populated. On respective click of pagination option, the details are fetched and updated in grid(table).
- The table column has sort functionality, ascending and descending toggle based on button click in the respective header column.
- On click of table row, respective character age details are fetched from another API and gets displayed in sidebar (from right)
- On click of close (cross icon) in sidebar, it gets closed from right.
- Unit testing of respective components, views etc.

### APIs used
- Fetching Photo list along with page number and pageSize: ``https://jsonplaceholder.typicode.com/photos?_page=<page_number>&_limit=<page_size>``
eg: ``https://jsonplaceholder.typicode.com/photos?_page=1&_limit=10``

## Technology stacks

__Core__
- React, TypeScript, SASS, HTML5.

__Libraries__
- ``react-icons`` - for free icons across app.

__Tools__
- ``eslint`` with strict type-check & ``prettier`` - for formatting and beautifying code.
- ``jest`` for unit testing.
- LocalStorage for persisting theme mode at client's machine.

## How to use
Go to root directory `datatable-app` and Execute commands with `npm` or `yarn`.

### Installing the application
- If node is not installed then Install [node] (https://nodejs.org/en/download/)
- Run the following command to load all the module dependencies for app:
```bash
npm install
```
Or
```bash
yarn
```

### check lint related errors
```bash
npm run lint
```
Or
```bash
yarn lint
```
It runs ESLint and shows syntatical (code) and formating errors across the application.

### auto fix lint and formatting errors
```bash
npm run lint:fix
```
Or
```bash
yarn lint:fix
```
It auto fixes lint and formatting related errors across the application.

### Running the app
- To start the app in local environment/dev mode, run the command:
```bash
npm run start
```
Or
```bash
yarn start
```
It runs the react based app in the development mode. Open http://localhost:3000 to view it in the browser. The page will reload if you make edits.

### Running unit tests (jest)
- To run all the test cases for the application, run the command:
```bash
npm run test
```
Or
```bash
yarn test
```
It runs all available test cases(components, views etc) across the application. You can also run test cases in different modes (watch, specific files, filter etc).

## Project folder structure
```bash
├── src
│   ├── assets
│   ├── components
│   ├── config
│   ├── styles
│   ├── types
│   ├── utils
│   ├── views
├── App.test.tsx
├── App.tsx
├── index.tsx
├── react-app-env.d.ts
├── setupTests.ts
├── .env
├── .eslintrc.js
├── .gitignore
├── .prettierrc
├── package.json
├── README.md
├── tsconfig.json
├── yarn.lock
```

__assets__ 

Contain images (logo).

__components__ 

Contain shareable components - button, error, filter, loading, pagination, select, sidebar, table, textbox. It also contains test cases for respective components.

__config__ 

Contain configurations - constants. It contains urls for APIs

__styles__ 

Contain common styles - base, utilities etc.

__types__ 

Contain types of data used in application - PhotoType, TableColumnType, SelectDataType. Types has been designed based on schema that maps to API response data and needed in UI application code.

__utils__ 

Contain utilities for filterByText, localStorage, custom-hooks for API calling, parsing link headers and helper functions.

__views__

Contain main views - dashboard, header. The main views contains respective child views based on features specific to that particular views.

## Screenshots
