# My-Social-Network - "Full-Stack Web Project"

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
    </li>
    <li>
      <a href="#built-with">Built With</a>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
    </li>
     <li>
      <a href="#getting-started">API</a>
    </li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

## About The Project

<p align="center">
  <img src="https://user-images.githubusercontent.com/85368212/230733545-f4873770-48c7-4b54-a8eb-d2240f256fd7.png" width="1000" alt="accessibility text">
</p>

The website is a copy of social media [Facebook](https://www.facebook.com/), where you can add posts (to share them with your friends). You can also like these posts and comment on them. The app provides the ability to send friend requests to other users. The site was created for educational purposes. 

### Guest

Guests are able to view all added posts, log in and register a new account.

### User

Users have the option to add a new post (if user own the post, he can delete or edit it). Users can comment and like other posts, as well as send friend requests to other registered users. If a user receives a friend request, they have the option to decline or accept it. 

**The project will be defended in front of technical trainers from [SoftUni](https://softuni.bg/) for final evaluation for the ReactJs course.**

## Built With

![csharp](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)
![.Net](https://img.shields.io/badge/.NET-5C2D91?style=for-the-badge&logo=.net&logoColor=white)
![EFCore](https://img.shields.io/badge/Entity_Framework_Core-5C2D91?style=for-the-badge&logo=&logoColor=white)
![mssql](https://img.shields.io/badge/MSSQL-07405E?style=for-the-badge&logo=microsoft&logoColor=white)
![react](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![testing](https://img.shields.io/badge/testing%20library-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

## Getting Started

1. Clone the repo
   ```sh
   git clone https://github.com/PetarPaunov/My-Social-Network.git
   
2. Open and rebuild the API.
3. Configure **connection string** in the **appsettings JSON** file.
3. Configure the **credentials** for **[Cloudinary](https://cloudinary.com/console/c-054f2b0f7435ef7f8dff7f6ceec5bd/media_library/folders/home) service** in the **appsettings JSON** file.
4. Open the **"Package Manager Console"**, select the **.Data** project and **apply the migrations**.
   ```sh
   Update-Database
   
![image](https://user-images.githubusercontent.com/85368212/230717877-8d82951b-9afd-4f08-833e-08a41bb3cdc5.png)

5. Open the ReactJs project.
6. Run tests - open terminal and type: 
    ```sh 
    npm test

![image](https://user-images.githubusercontent.com/85368212/230718129-e9b52573-3b6f-40bb-963d-da0d3d480c33.png)

7. Run the project - open terminal and type:
    ```sh 
    npm start

![image](https://user-images.githubusercontent.com/85368212/230718033-11e034a7-a751-4946-9409-ec0a9a8c9526.png)

**That's all you need to get the project up and running on your machine.**

## API

**Test all requests in postman**

### GET

1. Gets all posts from the database.
    ```sh 
    http://localhost:5236/api/Post/all
    
2. Gets all user posts from the database (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Post/get-user-posts
    
3. Gets all friend posts from the database (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Post/get-friend-posts/:userId

4. Gets post for update from the database (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Post/get-for-update/:postId

5. Gets all friend requsts from the database (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Request/all-requests

6. Gets user profile information from the database (user should be authenticated).
    ```sh 
    http://localhost:5236/api/UserProfile/user-profile

7. Gets all user friends from the database (user should be authenticated).
    ```sh 
    http://localhost:5236/api/UserProfile/firends

8. Gets friend profile info from the database (user should be authenticated).
    ```sh 
    http://localhost:5236/api/UserProfile/friend-info/:userId
    
### POST

1. Register.
    ```sh 
    http://localhost:5236/api/Account/register
    
    JSON object to send:
    
        {    
          "firstName": "string",
          "lastName": "string",
          "userName": "string",
          "email": "user@example.com",
          "password": "string",
          "passwordConfirm": "string"
        }
        
2. Login.
    ```sh 
    http://localhost:5236/api/Account/login
    
    JSON object to send:
    
        {
           "email": "string",
           "password": "string"
        }
        
3. Add comment (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Comment/add
    
    JSON object to send:
    
        {
          "postId": "string",
          "description": "string"
        }
        
4. Add post (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Post/add-post
    
    Send body with multipart/form-data with "Title(string), Description(string), Image(file)"
    
5. Toggle like (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Post/toggle-like/:postId
    
6. Send friend request (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Request/send/:userId
    
7. Accept friend request (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Request/accept/:requestId
    
8. Decline friend request (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Request/decline/:requestId
    
8. Gets all users, have the option to send query string and search specific user (user should be authenticated).
    ```sh 
    http://localhost:5236/api/UserProfile/all-users
    http://localhost:5236/api/UserProfile/all-users/:query
    
### PUT

1. Update post (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Post/update
    
    Send body with multipart/form-data with "Id(string), Title(string), Description(string), Image(file)"
    
2. Update user profile (user should be authenticated).
    ```sh 
    http://localhost:5236/api/UserProfile/update
    
    Send body with multipart/form-data with "FirstName(string), LastName(string), UserName(string), Image(file), Address(string)"
    
### DELETE

1. Update post (user should be authenticated).
    ```sh 
    http://localhost:5236/api/Post/delete/:postId
    
## License

Distributed under the MIT License. See [**LICENSE.txt**](LICENSE) for more information.
