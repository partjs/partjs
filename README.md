PartJS
=============

Built heavily based on Drywall, a user system for Node.js. PartJS is a package of single-page application boilerplates. 

It is developed for Mokoversity Farm. [See Mokoversity Farm.](https://www.mokoversity.com/farm)

Technology
============

| On The Server | On The Client  | Development |
| ------------- | -------------- | ----------- |
| Express       | Bootstrap      | Grunt       |
| Jade          | Backbone.js    | Bower       |
| Mongoose      | jQuery         |             |
| Passport      | Underscore.js  |             |
| Async         | Font-Awesome   |             |
| EmailJS       | Moment.js      |             |


Prerequisite
============

Basically you could be a full stack developer.

 - Strong JavaScript programming skills.
 - Node.js fundamentals: async IO, HTTP module and etc.
 - Express.js and Node.js
 - Understanding REST architecture.
 - Understanding NoSQL.
 - MongoDB and its Node.js driver.

Philosophy
==============

 - Continusly develop a SPA template suite hat can be reused in new applications without being greatly changed from the original.

SPA templates
==============

 - ```views/timeline```: a timeline SPA
 - ```views/post```: a form SPA

System Requirements
==============

 - Node Runtime
 - MongoDB
 - Grunt CLI
 - npm and bower package manager

Install
==============

```bash
$ cd <directory-to-your-partjs>
$ cp config.example.js config.js
$ npm i
$ bower i
$ grunt build
$ grunt start
```

Please visit http://localhost:3000/.

### How to Install Homebrew (Mac)

```bash
$ ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

### How to Install Node

```bash
$ brew install nodejs
```

### How to Install MongoDB

```bash
$ brew install mongodb
```

### How to Install bower

```bash
$ sudo npm i -g bower
```

### How to Install Grunt

```bash
$ sudo npm i -g grunt-cli
```

### How to Install forever

```bash
$ sudo npm -g i forever
```

Principles
==============

The templates of PartJS are following the principles of single-page application design. You could checkout [SPA Design Principles 101](http://www.slideshare.net/jollen/singlepage-application-design-principles-101).


License
==============

MIT

Copyright (C) 2014 Jollen Chen

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
