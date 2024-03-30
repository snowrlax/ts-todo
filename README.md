## To run this project locally
- Step 1: Clone the Repo
- Step 2:
      ```cd backend```
      ```npm i```
- Step 3: Get a Database Url from MongoDb, or Postgres. Preffered (Aiven.io)
- Step 4: Seed the ```DATABASE_URL``` in the .env file
- Step 5: In another terminal run ```npm run build``` & ```npm run start```
- Step 6: cd over to ```frontend``` folder
- Step 7: ```npm i```
- Step 8: create a .env in the ```frontend``` folder and put ```VITE_BACKEND_URL=http://localhost:3000```
- Step 9: Run ```npm run dev```

## To test routes use Postman
