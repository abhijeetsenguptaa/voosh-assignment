# voosh-assignment Documentation

## Introduction

This is the VOOSH assignment.

## Routes

### Users

#### 1. User Registration

- **Route**: `POST api/users/email-register`
- **Description**: Allows users to register by providing their name, email, password,image and bio information.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "image": "uploads/images",
    "bio": "hy! this is doc"
  }
  ```

#### 2. User Login

- **Route**: `POST api/users/email-login`
- **Description**: Allows registered users to log in using their email and password.
- **Request Body**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword"
  }
  ```

#### 3. View My Profile (Protected)

- **Route**: `GET api/users/my-profile`
- **Description**: Allows a user to view their profile.
- **Access**: Protected (Authentication required)


#### 4. Edit My Profile (Protected)

- **Route**: `POST api/users/edit-my-profile`
- **Description**: Allows a user to edit their profile.
- **Access**: Protected (Authentication required)
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword",
    "image": "uploads/images",
    "bio": "hy! this is doc"
  }
  ```


#### 5. Logout My Profile (Protected)

- **Route**: `POST api/users/logout`
- **Description**: Allows a user to logout their profile.
- **Access**: Protected (Authentication required)


#### 6. GET All Public Users

- **Route**: `GET api/users/public-users`
- **Description**: Allows a user to view all the public profile.


#### 7. GET All Users including Private Users (Protected and Authorized)

- **Route**: `GET api/users/all-profile`
- **Description**: Allows an authorized user, especially admin users, to view all user profiles, including private profiles.
- **Access**: Protected (Authentication required)
- **Query Parameters**:
  - `id` (Optional) - User ID to filter specific user profile.
  - `isPrivate` (Optional) - Boolean value to filter private or public profiles.
  - `role` (Optional) - Role of the users to filter profiles based on roles.


#### 7. POST Change the Status from Public to Private and Vice-Versa (Protected)

- **Route**: `POST api/users/'/status-changer`
- **Description**: Allows an authorized user, to change the status from Public to Private and vice versa.
- **Access**: Protected (Authentication required)




#### 8. Logout My Profile (Protected)

- **Route**: `POST api/users/logout`
- **Description**: Allows a user to logout their profile.
- **Access**: Protected (Authentication required)


#### 9. POST a Product (Protected and Authorized)

- **Route**: `POST api/products/post`
- **Description**: Allows super-admin users to post a product by providing the title and image information.
- **Access**: Protected and Authorized (Super-admin role required)
- **Request Body**:
  ```json
  {
    "title": "Product 1",
    "image": "uploads/products"
  }
