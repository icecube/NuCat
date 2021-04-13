# NuCat

This is an online catalogue of likely astrophysical neutrino events published by IceCube collaboration. The previous application can be found [here](https://neutrino-catalog.icecube.aq/main) using HTML / CSS / JavaScript + Express JS / NodeJS + Firestore hosted on Google Firebase. This project, however, is developed using MERN (MongoDB, Express JS, React JS and Node JS) Stack. The prototype version is being hosted on [IceCube servers](https://icecube.wisc.edu/) and can be accessed [here](https://nucat.icecube.aq/app). This project is meant to catalogue these neutrino events as well as provide means of inputting data into the database.

## Physics

This project is meant to provide an easy means of visualizing and analyzing data captured by IceCube neutrino detectors. It provides a skymap of all neutrino events as well as a list of the events including all important information tied to an event, including position, error, energy, and time of event. This can be used as a tool to help analysis. This will also serve as a catalog containing all publications relevant to a neutrino event.

## Installation

This project needs NodeJS version 12.4.0, so to run it locally, you will need to download it if you don't already have it. To download Node for your OS, check [here](https://nodejs.org/en/download/package-manager/). Once you have Node, in both `NuCat/server` and `NuCat/client` run `npm install` to install the necessary packages.

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

In `.../NuCat/client/src/api/index.js`, choose the testing `baseURL`. (Line 5, uncomment this `baseURL` but comment out other `baseURL`s)

Launch the backend:

(pwd).../NuCat/server$ `npm run server`

Launch the frontend:

(pwd).../NuCat/client$ `npm run start`

The last command should automatically open your browser. If not, open the brower and go to http://localhost:8000/

### With Docker
In `.../NuCat/client/src/api/index.js`, choose the Docker `baseURL`. (Line 6, uncomment this `baseURL` but comment out other `baseURL`s)

You will need to install docker for your OS. To do so, follow the tutorial for your OS [here](https://docs.docker.com/get-docker/). Once docker is installed, you must build the front and backend and launch it.

Build the backend:

(pwd).../NuCat$ `sudo docker build --pull --rm -f "server/Dockerfile" -t nucat-node:v1.1 "server"`

Build the frontend:

(pwd).../NuCat$ `sudo docker build --pull --rm -f "client/Dockerfile" -t nucat-react:v1.4 "client"`

Launch the website:

(pwd).../NuCat$ `sudo docker-compose -f "docker-compose-dev.yml" up -d --build`

Now you can open your browser at http://localhost:8000. It will not open automatically.

## REST APIs and Usage
Neutrino events can be manipulated in the database a few different ways using REST APIs. This includes getting, inserting, and deleting data. Below are a few ways a user can manipulate data with the api.

* get from https://nucat.icecube.aq/api/infos
* get from https://nucat.icecube.aq/api/candidates
* get from https://nucat.icecube.aq/api/info/[id]
* get from https://nucat.icecube.aq/api/candidate/[id]
* post to https://nucat.icecube.aq/api/candidate/[id]
* post to https://nucat.icecube.aq/api/info/[id]
* delete from https://nucat.icecube.aq/api/candidate/[id]
* delete from https://nucat.icecube.aq/api/info/[id]

`post` and `delete` require authentication. 

### Python
You can use the `requests` library to interact with the database with python. Documentation can be found [here](https://docs.python-requests.org/en/master/).
### Postman
Postman is an api app that helps visualize api structure. See more [here](https://www.postman.com/).
### Frontend
The frontend also provides a simple way of adding data with proper credentials.

## Contributing
For IceCubers, please follow the [GitGuide:GitHub-in-IceCube](https://github.com/icecube/icecube.github.io/wiki/GitGuide:GitHub-in-IceCube) or refer to [CONTRIBUTING.md](CONTRIBUTING.md) to contribute code.

We also welcome contributions from the community. For more detailed information, refer to [CONTRIBUTING.md](CONTRIBUTING.md).
