# Grabit

A delivery application created with React, Java, Mysql and Socket.io.

## Table of Contents

- [General info](#general-info)
- [features](#features)
- [To Do](#to-do)
- [Technologies](#technologies)
  - [Developement](#developement)
  - [Testing](#testing)
- [Setup](#setup)
- [Fundamental Principles](#fundamental-principles)
- [Test Coverage](#test-coverage)
- [Deployment](#deployment)

### General info

the project is a delivery web application that gives customers the possibility
to order anything from anywhere and gives also the possibility for couriers to work
and deliver orders, the difference between grabit and any other delivery solution
is that the cost is shared between nearby living customers.

### features

- Signup as customer.
- Signup as a Courier.
- edit profile (as a customer and courier ).
- set status (active or inactive) (as a courier).
- request an order (as a customer).
- display list of orders and their status (as a customer and courier).
- filter the list of orders by order status (as a customer and courier).
- assign orders to drivers
- track order (as a customer)
- set order status (accepted, picked, delivered) (as a courier)
- getting a notification when an order is assigned to a courier.
- getting a notification when the order is not accepted by courier (in 3 minutes).
- assist courier (optimized route, next address, order details)

### To Do

- link nearby orders to each other to improve the courier's
  delivery experience.
- sort orders from the closest to the farthest from the courier
  to set the most optimised route.
- change file structure design to atomic design.

### Technologies

#### Developement

- React
- Java
- Spring Boot
- Socket.io-client (frontend)
- netty-socketio (backend)
- MySql
- Leaflet

#### Testing

- Jest (unit testing)
- Enzyme (integration testing with mount())
- puppeteer (e2e testing)
- Junit5
- Mockito

### Setup

```
git clone https://github.com/yasTheDreamer/grabit.git
cd grabit
```

#### Start the backend

```
cd backend
mvn install
mvn spring-boot:run
```

#### Start the frontend

```
cd frontend
npm install
npm run start
```

### Fundamental Principles

i tried to follow clean architecture and clean code principles (solid, grasp ...)
and tried as much as possible to stick to some basic principles when refactoring :

#### code smells

- eliminate bloaters (long methods) by Extracting methods.
- moving methods to more generic classes.

### Test Coverage

Run backend tests using the command :

```
mvn test
```

Run frontend tests using the command :

```
npm run test
```

PS : i only tested some fonctionalities from unit to e2e, other tests will be done soon.

### Deployment

Only the frontend part of the application is hosted on netlify (netlify doesn't host the backend).
the url is : [grabit](https://objective-austin-3b2ce1.netlify.app/)
