# Docker Setup for Physica Portal

This directory contains resources for running the application in a Docker container.
The main `Dockerfile` and `docker-compose.yml` files have been placed in the root of your project folder because that is where they are typically expected to be by Docker and CI/CD tools.

## How to use this project on any computer

Because we have Dockerized the application, you can easily run it on any computer that has Docker installed.

### Prerequisites
1. Install [Docker](https://docs.docker.com/get-docker/) on the computer.
2. Install [Git](https://git-scm.com/downloads).

### Steps to Run
1. Clone your repository:
   ```bash
   git clone https://github.com/shibom-lang/Physica-portal.git
   cd Physica-portal
   ```
2. Make sure you have a `.env` file in the root folder with your MongoDB and Cloudinary variables.
   *Note: `.env` files should NOT be committed to GitHub for security reasons. You must create it manually on the new computer.*
   
   Example `.env`:
   ```env
   PORT=5001
   MONGODB_URI=mongodb://mongodb:27017/physica
   # Add your Cloudinary variables below:
   # CLOUDINARY_CLOUD_NAME=...
   # CLOUDINARY_API_KEY=...
   # CLOUDINARY_API_SECRET=...
   ```

3. Start the application:
   ```bash
   docker-compose up --build
   ```

The backend server will now be running at `http://localhost:5001`!
