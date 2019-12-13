
# **Todo Application (Backend)** 
*Project was created in a team work during the CodersCamp bootcamp.*

> Backend following REST architecture made on Express framework using MongoDB as database and built tools to use sugary Javascript. We've used Express, Body Parser and Mongoose packages. 
<!-- > You can find the app [here](https://github.com/...) . Be careful, Back End is running on Heroku (dyno sleep mode). -->

# Documantation
>This is only simple todo list REST api.\
>User only able to access their own ToDo list.

## Users Endpoint
Input params:
- login (String)
- password (String)

>**POST**        api/users / Register new user

## ToDo Endpoint
Input params:
- _userID (mongoose.Schema.Types.ObjectId)
- _listID (mongoose.Schema.Types.ObjectId)
- name (String)
- checked (Boolean)

>**POST**       api/lists / Create new list

>**POST**       api/tasks / add new task to list

>**DELETE**     api/tasks/:id / delete task from list

>**DELETE**     api/lists/:id / delete list with all contained task

## Authors
Created by CodersCamp's members under the supervision of Małgorzata Bousoltane:\
[@Ievgeniia Abdulina](https://github.com/IevgeniiaAbdulina)\
[@Iwona](https://github.com/Crazysh8)\
[@Daria Kawalec](https://github.com/dariaka)\
[@Olimpia Kwiecień](https://github.com/kvviecien)\
[@OMagdalena Szczech](https://github.com/magdalenaszczech)