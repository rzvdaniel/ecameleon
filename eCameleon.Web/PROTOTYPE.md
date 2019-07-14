# eCameleon Prototype

## Prerequisites

1. eCameleon.Auth already up and running
2. eCameleon.Api already up and running

## Setup

### Account
- Enter first user details (would be part of Admin group)

### Configuration
- Enable user registration
- Protect website with authentication
- Choose social media logins
- eCameleon.Auth address
- eCameleon.API address

Configuration is saved to the database, overridding any default configuration previously saved, and is loaded to the browser storage after setup is complete.

Whenever it happens that the storage is destroyed, it configuration is loaded again when the website is accessed.

## Apps

Admin Group users are granting access permissions to any new apps when loading them to the system.

By default, all apps have zero accessibility, but they're shown in the "App Manager" which Admin Group users can access.

App content like in pages or articles can be accessed by invoking the corresponding app viewer.

### AppManager
- Manage apps. 
- Import, disable or delete, grant access to User Groups or to Everyone.
- By default, access is retricted for everyone, including the Admin Group.

### AppList
- List apps that a user has rights to access. 
- Users can access apps based on their Group permissions.

### PageManager
- Manage website pages.
- Includes search

### PageContent
- Create page
- Pages are written in HTML and saved to the database
- For a page a Title, Content, Author, DateCreated, DateUpdated are recorded
- Nice to have a history of changes

### PageView
- Display a page
- Access it like: /app/pageview/helloworld

### MicroserviceManager
- Upload microservices
- Check health status
- Start, stop, unload

### GroupsManager
- Manage user groups
- One app only
- Contains pages like GroupsList, CreateGroup, EditGroup, ViewGroup

### UsersManager
- Manage users
- Assign them to groups
- One app only
- Contains pages like UsersList, CreateUser, EditUser, ViewUser

### Register
- Allow users to register

### Login
- Allow users to login

### Forgot Password
- Allow users to reset their pasword

## Landing Pages
- Ideally, design a landing page for each group and/or let users customize their own
- Provide a way to assign landing pages to User Groups
- Provide default landing pages for Admin and Everyone groups











