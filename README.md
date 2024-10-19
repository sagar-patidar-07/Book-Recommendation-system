# Book Recommendation System

This book recommendation system uses collaborative filtering techniques, KNN Model to  make recommendations. Users can search for books based on title, author name, or publisher and in result the recommendations will be displayed.


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd book-recommendation
```

Start the application using Docker Compose:

```bash
  docker-compose up
```

Navigate to http://localhost:3000 in your web browser to access the application.


## Project Structure

The Project Structure is as follow:

``` bash
project/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   └── main.py
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md

```


## Screenshots

![App Screenshot](https://github.com/sagar-patidar-07/Book-Recommendation-system/blob/main/Book%20SS.jpeg)


## Features

- KNN model based recomendation
- Popular books by Year, All time.
- Responsive Frontend in React.js.
- Search based book recomendation based on author, publisher.


## Tech Stack

**Client:** ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Material UI](https://img.shields.io/badge/UI%20Framework-Material%20UI-007FFF)  ![Javascript](https://img.shields.io/badge/Language-JavaScript-F7DF1E)

**Server:** ![FASTAPI](https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white) ![Python](https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue)  ![Scikit-Learn](https://img.shields.io/badge/scikit_learn-F7931E?style=for-the-badge&logo=scikit-learn&logoColor=white) ![Pandas](https://img.shields.io/badge/Pandas-2C2D72?style=for-the-badge&logo=pandas&logoColor=white) ,![Numpy](https://img.shields.io/badge/Numpy-777BB4?style=for-the-badge&logo=numpy&logoColor=white), pickle

**Deployment** ![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white)

