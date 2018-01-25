# Event Calendar


This is a simple calendar app using nodejs backend, angular frontend and mongodb database. Also implemented soket.io for real-time change.
### Features
* Different calendar view (Day, Week ,Month, Year)
* Add, Delete , Edit event
* Events display in events day
* Real-time update in every client

## Background
I started this project without any knowledge of Node , Angular , Mongo. So i research about this and start following a [tutorial](https://www.youtube.com/watch?v=eB9Fq9I5ocs) in YouTube. I implemented all the things and try to understand basic of node , mongoose, angular, mongodb. When i start implementing i face many problem like: 
* href not working from angular (solve putting a extra `!` -  `#/event/add` to `#!/event/add` )
* Socket connect multiple time (solved by adding `{transports: ['websocket'], upgrade: false}`
* Http call from client not working as video ( solved by a new method )
* Have huge confusion between ES6 and ES5 . I see the syntax of es6 but cannot implemented it 
* and so on 
## Requirement
* Single-page web application using AngularJS (frontend layer)
*  REST API NodeJS application using Express for adding, editing, or removing an event (backend layer)
*  Main view shall consist of a calendar of a month, with “next” and “previous” buttons to go to another month
*  A  "+" button inside every inside the date box for adding an event (partially completed)
*  Real-time update to all opened browser using socket io
*  Keep track of when an event was created and updated
##  Thought Process
![Thought Process](https://github.com/amitbd1508/Realtime-calendar/blob/master/realtime-caldender.png?raw=true)


### Used Technology
1. Mongo Database
2. Mongoose ODM
3. Express Application Framework
4. AngularJS Framework
5. Bootstrap CSS Framework
7. Socket IO

### Prerequisites

First you need to install [Node.js](https://nodejs.org/en/) ,[Mongo DB](https://www.mongodb.com/) in your machine 

* Install Node.js

* Install and Run Mongo DB from your installation directory   
```
mongod
```

### Installing
* Clone the repository
```
git clone https://github.com/amitbd1508/Realtime-calendar.git
```
* Then Change your directory using 
```
cd Realtime-calendar/
```
* Run 
```
npm install
cd client
bower install
cd ..
node app.js
```

App running on [http://localhost:8000/](http://localhost:8000/)

## Running the tests
I don not write any test code . In future i will add the test code 

## Built With
* [Node.js](https://nodejs.org/en/) 
* [Expressjs](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js
* [Mongo DB](https://www.mongodb.com/)
* [Bootstrap](https://getbootstrap.com/)
* [angular-bootstrap-calendar](https://github.com/mattlewis92/angular-bootstrap-calendar) - Calendar Library
* [Socket](https://socket.io/) - Socket Library 


## Contributing

You are welcome to contribute


## Authors

* **Amit Ghosh** -  [Website](www.amitghosh.me)

See also the list of [contributors](https://github.com/amitbd1508/Realtime-calendar/graphs/contributors) who participated in this project.

## License

This project is licensed under ISC License

Copyright (c) [2018], [Amit Ghosh]

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted, provided that the above
copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

## Acknowledgments

* Thanks to [Traversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
* Thanks Jeeon for giving me the idea  
