# NuCat

This is an online catalogue of IceCube collaboration. The previous application can be found [here](https://neutrino-catalog.icecube.aq/main) using HTML / CSS / JavaScript + Express JS / NodeJS + Firestore hosted on Google Firebase. This project, however, is developed using MERN (MongoDB, Express JS, React JS and Node JS) Stack. You can click [here](https://nucat.icecube.aq/app) to see what it looks like.

## Neutrinos
TBC.

## REST APIs and Usage
### Python
TBC.
### Postman
TBC.

## Test Locally
Create a file `server/.env` and put environment variables inside. For IceCubers, please make a request in the slack channel `#alert_db_webpage`. For people outside of IceCube, we have a clound database for testing you can access to with the below enviroment variables:

```
USERNAME=readOnly
PASS=9PcgQQKj5LwzA63C
DB_USERNAME=readOnly
DB_PASS=9PcgQQKj5LwzA63C
DB_ADDRESS=nucatgt.jfmfo.mongodb.net
DB_NAME=neutrino-catalog
```

You will only have READ access to a database which contains some fake neutrinos.
### With Node
In `.../NuCat/client/src/api/index.js`, choose the testing `baseURL`. (uncomment this `baseURL` but comment out other `baseURL`s)

Fire up the backend:

(pwd).../NuCat/server: $ `npm run server`

Lauch the frontend:

($pwd).../NuCat/client: $ `npm run start`

Open the brower and go to http://localhost:8000/

### With Docker
In `.../NuCat/client/api/index.js`, choose the Docker `baseURL`.

## Contributing
For IceCubers, please follow the [GitGuide:GitHub-in-IceCube](https://github.com/icecube/icecube.github.io/wiki/GitGuide:GitHub-in-IceCube) or refer to [CONTRIBUTING.md](CONTRIBUTING.md) to contribute code.

We also welcome contributions from the community. For more detailed information, refer to [CONTRIBUTING.md](CONTRIBUTING.md).
