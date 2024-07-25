# Wonerworte

Wonerworte is a web application that allows users to log in and share their words of wonder, travel experiences, stories, and more.

## Tech Stack

### Frontend
- Pug
- HTML
- CSS
- JavaScript
- Tailwind CSS

### Backend
- Node.js
- Express
- JWT (JSON Web Tokens) for authentication
- Mongoose

## Other Services
- Cloudinary (for profile picture uploads)
- Multer (for handling file uploads)

## Getting Started
  ### Prerequisites
   + Ensure you have the following installed on your machine:
    
- Node.js
- MongoDB

Clone the repository:

### git clone 
https://github.com/dipunjab/WanderWrote_Project.git

### cd wonerworte

## Install dependencies:
  ### npm install

- Set up environment variables:
    Create a .env file in the root directory and add the following variables:

+ .env

### PORT=3000
### MONGODB_URL=your_mongodb_connection_string
### CORS_ORIGIN=*

### ACCESS_TOKEN_SECRET=your_access_token_secret
### ACCESS_TOKEN_EXPIRY=your_access_token_expiry
### REFRESH_TOKEN_SECRET=your_refresh_token_secret
### REFRESH_TOKEN_EXPIRY=your_refresh_token_expiry

### CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
### CLOUDINARY_API_KEY=your_cloudinary_api_key
### CLOUDINARY_API_SECRET=your_cloudinary_api_secret

## Build Tailwind CSS:
   npm run build

## Run the application:
   npm start
   
- The application will be running at http://localhost:3000.

## Usage
- Registration
    To register a new user, fill in all the required fields and upload a profile picture. Ensure that the email and username are unique, and the password meets the minimum length requirement.

- Posting
    Once registered and logged in, users can create new posts, share their travel experiences, and stories.

- Commenting
    Users can comment on posts. The comments display the user's full name and the comment content.

+ Configuration
    Configuration is managed through environment variables. Ensure you have a .env file with the required variables as mentioned in the installation steps.

+ Contributing
Contributions are welcome! Please fork the repository and submit a pull request for review.


## Acknowledgements
Thanks to Cloudinary for providing media upload capabilities.
