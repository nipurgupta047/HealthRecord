//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const homeStartingContent = "Welcome to your Health Record. This page contains all of your Health Record Updates. Click on ADD to enter your further updates";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get('/', function(req,res){
  res.render("home", {startingContent: homeStartingContent, post: posts});
})

app.get('/about', function(req,res){
  res.render("about", {startingContent: aboutContent});
})

app.get('/contact', function(req,res){
  res.render("contact", {startingContent: contactContent});
})

app.get('/compose', function(req,res){
  res.render("compose");
})

app.get('/posts/:postName',function(req,res){
  let t=false;
  posts.forEach(function(post){
    if(post.title === req.params.postName && t===false)
      {
        t=true;
        res.render("post", {post: post});
      }
  })


})

app.post('/compose', function(req,res){
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody,
    date: req.body.date,
    medicine: req.body.medicine,
  }
  posts.push(post);
  res.redirect('/');
})










app.listen(3000, function() {
  console.log("Server started on port 3000");
});
