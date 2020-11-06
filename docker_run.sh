#!/bin/bash

projectname=hairdressers

docker rm $projectname --force
# docker rmi $projectname --force
docker build -t $projectname .
docker run --rm --net="host" --name $projectname $projectname
