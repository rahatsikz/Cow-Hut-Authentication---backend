# Digital Cow Hut Auth

### Live Deployed server link

[https://cow-hut-digital-auth.vercel.app/](https://cow-hut-digital-auth.vercel.app/)

# Routes

### Auth (User)

- Create User (Post) : https://cow-hut-digital-auth.vercel.app/api/v1/auth/signup
- User Login (Post) : https://cow-hut-digital-auth.vercel.app/api/v1/auth/login
- User Refresh Token (Post) : https://cow-hut-digital-auth.vercel.app/api/v1/auth/refresh-token

### Auth (Admin)

- Create Admin (Post) : https://cow-hut-digital-auth.vercel.app/api/v1/admins/create-admin
- Admin Login (Post) : https://cow-hut-digital-auth.vercel.app/api/v1/admins/login
- Admin Refresh Token (Post) : https://cow-hut-digital-auth.vercel.app/api/v1/admins/refresh-token

### User

- Get All Users by Admin (Get) : https://cow-hut-digital-auth.vercel.app/api/v1/users
- Get Single User by Admin (Get) : https://cow-hut-digital-auth.vercel.app/api/v1/users/648b6bbdcc2f9c7474323fd5
- Update User by Admin (Patch) : https://cow-hut-digital-auth.vercel.app/api/v1/users/648b6bbdcc2f9c7474323fd5
- Delete User by Admin (Delete) : https://cow-hut-digital-auth.vercel.app/api/v1/users/64a0082ec89338b783e7dbb6

### Cows

- Create Cow by Seller (Post) : https://cow-hut-digital-auth.vercel.app/api/v1/cows/create-cow
- Get All Cows by Seller, Buyer, Admin (Get) : https://cow-hut-digital-auth.vercel.app/api/v1/cows
- Get Single Cow by Seller, Buyer, Admin (Get) : https://cow-hut-digital-auth.vercel.app/api/v1/cows/648d7ceae0842107b364dd8c
- Update Cow by Seller (Patch) : https://cow-hut-digital-auth.vercel.app/api/v1/cows/64a00c135aa1ac12b491efe1
- Delete Cow by Seller (Delete) : https://cow-hut-digital-auth.vercel.app/api/v1/cows/64a0141225917cb7223e45f7
