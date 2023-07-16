# Energy Charts

[![license](https://img.shields.io/github/license/facilitate-energy/energy-charts?color=blueviolet)](LICENSE)
[![Netlify Status](https://api.netlify.com/api/v1/badges/a1d97599-86ab-4bc6-8f90-5cbe783479ef/deploy-status)](https://app.netlify.com/sites/energy-charts/deploys)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and migrated to [Vite](https://vitejs.dev/).

## Purpose

Energy Charts is a web application developed to:

- make it easier to communicate energy modelling results and scenarios to stakeholders;
- facilitate discussion of energy modelling results and make model debugging easier;
- disseminate energy modelling results and scenarios to a wide audience.

## To run locally

After cloning from GitHub, execute from within the repository:

`npm install`

Followed by:

`npm start`

Requires [Node.js](https://nodejs.org).

## To deploy

Follow this [guide](https://www.netlify.com/blog/2016/09/29/a-step-by-step-guide-deploying-on-netlify/) to deploy on Netlify.

## To customise

- **Scenario data** is located in `public/data`
- Mardown files to be rendered as **Pages** are in `public/pages`
- **Routes** and other configuration settings are in `src/config.js`
- Charts' **specs** are in `src/specs/chartsInfo.js`. These also act as filters.

## To use as dependency

To use Energy Charts as dependency in a project run:

`npm install energy-charts --save-prod`

## License

Copyright 2021-2023 Facilitate Energy Ltd.

Energy Charts is licensed under the Apache License, Version 2.0.

You may obtain a copy of the License [here](/LICENSE) or at http://www.apache.org/licenses/LICENSE-2.0.
