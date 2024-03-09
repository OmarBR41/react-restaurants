# Yelp Restaurants App

This repo is a fullstack web application built using TypeScript, React, Node.js and Express.js.

The backend serves as a wrapper to consume the [Yelp API](https://docs.developer.yelp.com/reference/v3_business_search) to search for restaurants using the following location: San Jose, CA 95127.

The frontend consumes the backend API to display the results, showing a list of available categories to filter the restaurants, and rendering cards for each restaurant with their image, name, rating, price, and a button to redirect to its Yelp Business url.

## Getting Started

### Backend

1. To start the server first open a terminal inside `./backend`
2. Set the environment variable to use your [private Yelp API key](https://docs.developer.yelp.com/docs/fusion-authentication):
   - Change the value of `YELP_API_KEY` to your API in the file `.env`
3. Install the dependencies with `pnpm install`
4. Start the development server `pnpm run dev`
5. The server should be available now
   - It uses the `PORT` specified in your `.env`
   - If nothing was changed, the server should be listening on [http://localhost:8080](http://localhost:8080)
6. The exposed route to fetch the Yelp Restaurants is [http://localhost:8080/api/v1/businesses](http://localhost:8080/api/v1/businesses)
   - It accepts the following parameters:
     - `limit`: Number of results to return
     - `offset`: Offset the list of returned results by this amount.

### Frontend

1. To set up the frontend application, first open a terminal inside `./frontend`
2. Set the environment variable to use your backend's url:
   - Change the value of `VITE_BACKEND_API_URL` to your API in the file `.env`
3. Install the dependencies with `pnpm install`
4. Start the application with `pnpm run dev`
5. The app should be available at [http://localhost:5173](http://localhost:5173)

## References

Read more about the technologies and tools used in this project:

- [Yelp API](https://docs.developer.yelp.com/reference)
- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev)
- [NodeJS](https://nodejs.org/)
- [Express.js](https://expressjs.com)
