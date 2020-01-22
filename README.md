# **Todo Application (Backend)**

_Project was created in a team work during the CodersCamp bootcamp._

> Backend following REST architecture made on Express framework using MongoDB as database and built tools to use sugary Javascript. We've used Express, Body Parser and Mongoose packages.
> You can find the app [here](https://cc19todoapp.herokuapp.com) . Be careful, Back End is running on Heroku (dyno sleep mode).

# Documantation

> This is only simple todo list REST api.\
> User only able to access their own ToDo list.

## Users Endpoint

Input params:

- login (String)
- email (String)
- password (String)

> **POST** "api/users" - Register new user

> **POST** "api/users/" - register new user

> **GET** "api/users/me" - get information about users account

> **POST** "api/auth/" - login user (in request body only email and password)

## ToDo Endpoint

Input params:

- \_userID (mongoose.Schema.Types.ObjectId)
- \_listID (mongoose.Schema.Types.ObjectId)
- name (String)
- checked (Boolean)

> **GET** "api/lists/" - get all user's lists

> **POST** "api/lists/" - add new list

> **DELETE** "api/lists/:listID" - delete user's list

> **PATCH** "api/lists/:listID" - change list's name

> **GET** "api/tasks/" - get all user's tasks

> **POST** "api/tasks/" - add new task to list

> **DELETE** "api/tasks/:id/" - delete task from list

> **PATCH** "api/tasks/:id/" Mark a single task as checked or unchecked

> **PATCH** "api/tasks/:id/move_to/:listID/" Move a task to another list

> **GET** "api/tasks?checked=true(/false)" - get all user's tasks that are checked(/unchecked)

> **GET** "api/tasks?list=listID" - get all user's tasks that belong to list with id equal to "listID"

> **GET** "api/tasks?list=listID&checked=true(/false)" - get all user's tasks that belong to list with id equal to "listID" and are checked(/unchecked)

## Authors

Created by CodersCamp's members under the supervision of [@MalgoskaBou](https://github.com/MalgoskaBou):\
[@Ievgeniia Abdulina](https://github.com/IevgeniiaAbdulina)\
[@Iwona](https://github.com/Crazysh8)\
[@Daria Kawalec](https://github.com/dariaka)\
[@Olimpia Kwiecień](https://github.com/kvviecien)\
[@Magdalena Szczech](https://github.com/magdalenaszczech)
