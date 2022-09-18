require("dotenv").config();
require("./config/database").connect();
const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
// importing user context
const User = require("./model/user");
//importing Blog Page
const blogs =require("./pages/blogPage");
//import Comments page
const comments= require("./pages/commentsPage")
//import email service
const mail = require("./pages/sendMail");
const verifyToken = require("./middleware/auth");
const verifyRefreshToken =require("./middleware/verifyRefresh")
const app = express()
// const {verifyToken,verifyRefreshToken} = require("./middleware/auth");

app.use(express.json());

// Logic goes here
// app.use('/articles', articleRoute)

app.use('/blog-page',blogs)
app.use('/comments',comments)
app.use('/sendMail',mail)


// Register
app.post("/register", async (req, res) => {

    // Our register logic starts here
    try {
      // Get user input
      const { first_name, last_name, email, password } = req.body;
  
      // Validate user input
      if (!(email && password && first_name && last_name)) {
        res.status(400).send("All input is required");
      }
  
      // check if user already exist
      // Validate if user exist in our database
      const oldUser = await User.findOne({ email });
  
      if (oldUser) {
        return res.status(409).send("User Already Exist. Please Login");
      }
  
      //Encrypt user password
      encryptedPassword = await bcrypt.hash(password, 10);
  
      // Create user in our database
      const user = await User.create({
        first_name,
        last_name,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });
  
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );
      // save user token
      user.token = token;
      // return new user
      res.status(201).json(user);
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });
    
// Login
app.post("/login", async (req, res) => {

    // Our login logic starts here
    try {
      // Get user input
      const { email, password } = req.body;
  
      // Validate user input
      if (!(email && password)) {
        res.status(400).send("All input is required");
      }
      // Validate if user exist in our database
      const user = await User.findOne({ email });
  
      if (user && (await bcrypt.compare(password, user.password))) {
        // Create token
        const accesstoken = jwt.sign(
          { user_id: user._id, email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "1m",
          }
        );
        const refreshtoken = jwt.sign(
          { user_id: user._id, email },
          process.env.REFRESH_TOKEN,
          {
            expiresIn: "2h",
          }
        )
  
        // save user token
       const accessToken= accesstoken;
        const refreshToken =refreshtoken
        console.log(refreshToken)

        // user
        res.status(200).json({user,accessToken,refreshToken});
      }
      res.status(400).send("Invalid Credentials");
    } catch (err) {
      console.log(err);
    }
    // Our register logic ends here
  });

// refresh token end point
app.post("/refresh",async(req,res)=>{
  try{
  const {email,refreshToken}=req.body
  if(!refreshToken){
    return res.status(400).send("refresh Token is required")
  }
  const isVerified=verifyRefreshToken(email,refreshToken)
  if(isVerified){
   const accToken= jwt.sign({email},
      process.env.TOKEN_KEY,
      {expiresIn:"2m"}
      )
      res.status(200).send({token:accToken})
  }
  else{
    res.status(401).send('Unauthorized')
  }
  }
  catch(err)
  {
    console.log(err)
  }
})






app.post("/welcome",verifyToken ,(req, res) => {
  res.status(200).send("Welcome 🙌 ");
});
// module.exports = router ;
module.exports = app;