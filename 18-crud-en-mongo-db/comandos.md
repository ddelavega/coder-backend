# Comandos utilizados para mongoDB

```javascript

mongosh
show dbs
use ecommerce
db.createCollection.products
db.products.insertMany(
  [
    {
    "timestamp": "2027-11-24T22:43:44.006Z",
    "title": "Lamborghini",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "890.12",
    "id": "1"
    },
    {
    "timestamp": "2075-04-23T11:08:00.005Z",
    "title": "Lamborghini",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "353.40",
    "id": "2"
    },
    {
    "timestamp": "2091-05-17T13:25:22.358Z",
    "title": "Hyundai",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "15.17",
    "id": "3"
    },
    {
    "timestamp": "2094-10-04T07:43:34.487Z",
    "title": "Fiat",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "269.63",
    "id": "4"
    },
    {
    "timestamp": "1991-07-27T08:21:13.307Z",
    "title": "Mazda",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "658.93",
    "id": "5"
    },
    {
    "timestamp": "2047-10-19T01:51:53.549Z",
    "title": "Jaguar",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "435.40",
    "id": "6"
    },
    {
    "timestamp": "1996-06-18T16:06:57.658Z",
    "title": "Dodge",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "701.57",
    "id": "7"
    },
    {
    "timestamp": "2079-12-03T01:27:10.994Z",
    "title": "Ford",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "72.83",
    "id": "8"
    },
    {
    "timestamp": "2099-10-07T14:18:08.237Z",
    "title": "Mazda",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "364.84",
    "id": "9"
    },
    {
    "timestamp": "2034-07-07T13:51:11.653Z",
    "title": "Aston Martin",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": "191.74",
    "id": "10"
    }
  ]
)
db.products.find()
db.createCollection.messages
db.messages.insertMany(
  [
    {
      "id": "1",
      "autor": "nombre.apellido.01@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    },
    {
      "id": "2",
      "autor": "nombre.apellido.02@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    },
    {
      "id": "3",
      "autor": "nombre.apellido.03@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    },
    {
      "id": "4",
      "autor": "nombre.apellido.04@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    },
    {
      "id": "5",
      "autor": "nombre.apellido.05@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    },
    {
      "id": "6",
      "autor": "nombre.apellido.06@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    },
    {
      "id": "7",
      "autor": "nombre.apellido.07@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    },
    {
      "id": "8",
      "autor": "nombre.apellido.08@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    },
    {
      "id": "9",
      "autor": "nombre.apellido.09@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    },
    {
      "id": "10",
      "autor": "nombre.apellido.10@correo.com.ar",
      "texto": "hola",
      "date": "29/8/2022 17:02:28"
    }
  ]
)
db.products.count()
db.messages.count()
db.products.insertOne(
  {
    "timestamp": "2034-07-07T13:51:11.653Z",
    "title": "Renault",
    "thumbnail": "http://loremflickr.com/640/480/technics",
    "price": 1100,
    "id": "10"
  }
)
db.products.count()
db.products.find({price:{$lt:1000}})
db.products.find({$and:[{price:{$gte:1000}}, {price:{$lte:3000}}]})
db.products.find({price:{$gt:3000}})
db.products.find({},{_id:0, title:1}).sort({"price": 1, "title": -1}).skip(2).limit(1).toArray().map((u) => u['title'] )
db.products.updateMany({},{$set:{stock: 100}})
db.products.updateMany({ price:{$gt:4000} },{ $set:{stock: 0}})
db.products.deleteMany({ price:{$lt:1000} })

db.createUser(
  {
    user: "superAdmin",
    pwd:  passwordPrompt(), 
    roles: [ 
      { role: "readWrite", db: "ecommerce" }
    ]
  }
)

db.createUser(
  {
    user: "pepe",
    pwd:  passwordPrompt(), 
    roles: [ 
      { role: "read", db: "ecommerce" }
    ]
  }
)

mongosh --port 27017 -u "superAdmin" \
--authenticationDatabase "ecommerce" -p

mongosh --port 27017 -u "pepe" \
--authenticationDatabase "ecommerce" -p

use ecommerce
db.auth("pepe", passwordPrompt())
```
