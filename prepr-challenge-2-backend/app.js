const express = require("express");
const app = express();
const bodyParser = require('body-parser');

// Curb Cores Error by adding a header here
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// require database connection 
const dbConnect = require("./db/dbConnect");

// execute database connection 
dbConnect();


const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("./db/userModel");


// body parser configuration
app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (request, response, next) => {
  response.json({ message: "Hey! This is your server response!" });
  next();
});

//Register Request
app.post("/register", (request, response) => {

    // hash the password
    bcrypt
    .hash(request.body.password, 10)
    .then((hashedPassword) => {
    // create a new user instance and collect the data
    const user = new User({
        email: request.body.email,
        password: hashedPassword,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        user_name: request.body.user_name,
        user_type: request.body.user_type,
        language: request.body.language
    });

    // save the new user
    user
        .save()
        // return success if the new user is added to the database successfully
        .then((result) => {
        response.status(201).send({
            message: "User Created Successfully",
            result,
        });
        })
        // catch error if the new user wasn't added successfully to the database
        .catch((error) => {
        response.status(500).send({
            message: "Error creating user",
            error,
        });
        });
    })
    // catch error if the password hash isn't successful
    .catch((e) => {
    response.status(500).send({
        message: "Password was not hashed successfully",
        e,
    });
    });

});

const isEmail = (str) => {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if ( re.test(str) ) {
    return true
  }
  else{
    return false;
  }
};

//Login Request
app.post("/login", (request, response) => {
  let data = "";

  
  if (isEmail(request.body.email)) {
      data = { email: request.body.email};
  }

  else{
    data = {user_name: request.body.email};
  }
  

  // check if email exists
    User.findOne(data)
  
      // if email exists
      .then((user) => {
        // compare the password entered and the hashed password found
        bcrypt
          .compare(request.body.password, user.password)
  
          // if the passwords match
          .then((passwordCheck) => {
  
            // check if password matches
            if(!passwordCheck) {
              return response.status(400).send({
                message: "Passwords does not match",
                error,
              });
            }
  
            //   create JWT token
            const token = jwt.sign(
              {
                userId: user._id,
                userEmail: user.email,
              },
              "RANDOM-TOKEN",
              { expiresIn: "24h" }
            );
            
           
  
            //   return success response
            response.status(200).send({
              message: "Login Successful",
              user :{
              first_name: user.first_name,
              last_name: user.last_name,
              user_name: user.user_name,
              user_type: user.user_type,
              language: user.language,
              email: user.email
              },
              token,
            });
          })
          // catch error if password does not match
          .catch((error) => {
            response.status(400).send({
              message: "Passwords does not match",
              error,
            });
          });
      })
      // catch error if email does not exist
      .catch((e) => {
        response.status(404).send({
          message: "Email not found",
          e : {User}
        });
      });
  });


  



module.exports = app;