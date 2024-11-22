#!/bin/bash

# Set variables
IMAGE_NAME="my-mssql-server"
CONTAINER_NAME="sql1"
SA_PASSWORD="YourStrong!Passw0rd"

# Build the Docker image
echo "Building Docker image..."
docker build -t $IMAGE_NAME .

# Check if the image was built successfully
if [ $? -ne 0 ]; then
    echo "Failed to build Docker image."
    exit 1
fi

# Run the Docker container
echo "Running Docker container..."
docker run -e "ACCEPT_EULA=Y" -e "SA_PASSWORD=$SA_PASSWORD" -p 1433:1433 --name $CONTAINER_NAME -d $IMAGE_NAME

# Check if the container is running successfully
if [ $? -eq 0 ]; then
    echo "Docker container $CONTAINER_NAME is running."
else
    echo "Failed to run Docker container."
    exit 1
fi