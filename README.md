"# Book-Record-Management-Build" 

Server >> Storing the certain book data
       >>User Register
       >>Subscriber

   this is a book record management API server/backend for the library system or management of records or manuals or books

# Routers and EndPoints

## /users 
POST: to create a new users
GET: to get all user info

## /users/{id}
GET:to get a user by id
PUT: to update a user by their Id
DELETE: delete a user by id ( check if user still have an issued dooks) && (is there any fine to paid)

## subscription Types
3 months (Basics)
6 months (Standard)
1 years (Premium)

## /users/subscription-details/{id}
GET: to get user subscription details
    >> date of subscription
    >> Valid till 
    >>is there any fine

## /books
GET: get all books info
POST:create/add the books

## /books/{id}
GET:get a book by id
POST: Update a book id

## /books/issued
GET:get all issued books

## /books/issued/withFine
GET:gat all issued books with their fine


Fine System:
user : 30-04-2024 - 29-07-2024
02-08-2024 -> 50*3 = 150/-


# Mongo-DB

## Non-Relational Database:

## Relation => Table
## Rows => Tuples
## Columns => Attributes

Data >> json(csv)format >>schemaless

## MVC Arch => Controllers
 >> M -> Model (it depicts the structure of mongodb collections)
 >> V -> View (write to frontent like reactJs)
 >> C -> controllers (Brains or logical part of a routes)
    >> books.controllers.js
    >> users.controllers.js

## Schema
  >> id : String 
  >> name : String
  >> age : number
  >> gender : char || varchar(10)

## model
>>  id: 123
>>  name: 'Arya'
>>  age: 21
>> gender: 'male'

Foreign Key
>>Referential integrity

Users Table                   Books Table
>>issuedBooks: 2(Foreign key)   issuedBooks: 2 (Primary Key)

## Data Transfer Object (DTO) 
>> Transfering the data to one object to another object
 var obj1:{
      name
      age
      id
      gender
 }
      
 var obj2:{
        name 
        age
        id
        gender
 }
