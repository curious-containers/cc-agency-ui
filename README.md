# CC-Agency-UI

CC-Agency-UI is part of the Curious Containers project. It integrates a Web UI to interact with the CC-Agency.

For more information please refer to the Curious Containers [documentation](https://www.curious-containers.cc/).

## Deployment

Before deploying the webserver, make sure to edit the *.env.production* file and change the value of *VUE_APP_AGENCY_URL* to the URL of your cc-agency instance.

### Build the project
Run the following command to build the project:
```
npm run build
```
This command compiles and minifies the project for production, generating the necessary files for deployment.

### Build Docker Image
Build the Docker image for the CC-Agency-UI:
```
docker build . -t cc-agency-ui
```
This command uses the Dockerfile in the repository to build a Docker image named "cc-agency-ui."

### Run Docker Container
Deploy the webserver inside a Docker container:
```
docker run -d -p 8080:80 cc-agency-ui
```

## Acknowledgements

The Curious Containers software is developed at [CBMI](https://cbmi.htw-berlin.de/) (HTW Berlin - University of Applied Sciences). The work is supported by the German Federal Ministry of Economic Affairs and Energy (ZIM project BeCRF, grant number KF3470401BZ4), the German Federal Ministry of Education and Research (project deep.TEACHING, grant number 01IS17056 and project deep.HEALTH, grant number 13FH770IX6) and HTW Berlin Booster.
