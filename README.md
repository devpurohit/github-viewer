# GitHub Viewer

This project is a simple web application built with React that fetches and displays a list of issues and pull requests from a GitHub repository. The user can filter the issues by their state (open, closed, merged) and by labels.

## Getting Started

To run this project locally, follow these steps:

1. Clone the repository
2. Install the dependencies by running `npm install`
3. Start the development server by running `npm start`

## Usage

Upon loading the application, the user will see a table with a list of issues from the repository. The table displays the issue's title, number, author, and creation date. The user can filter the issues by their state by selecting an option from the "Status" dropdown menu. The available options are "All", "Open", "Closed", and "Merged". The user can also filter the issues by their labels by selecting one or more options from the "Labels" dropdown menu.

Clicking on an issue's title will take the user to a detailed view of that issue, which includes its description, comments, and any associated pull requests.

## Note

The GitHub service file used to fetch the issues has a hardcoded GitHub repository selected. Currently, it is set to the "axios/axios" repository. If you want to fetch issues from a different repository, you will need to update the `owner` and `repo` constant in the `src/services/github.js` file.
