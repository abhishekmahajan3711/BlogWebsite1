
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose=require("mongoose");
var _=require('lodash');


//connecting with mongodb database
const uri="mongodb+srv://abhimahajan:abhi@abhi.o2dflsk.mongodb.net/?retryWrites=true&w=majority";
async function connect(){
  try{
    await mongoose.connect(uri);
    // console.log("Successful connection to mongodb");
  }
  catch(error){
    console.log(error);
  }
}
connect();

//making schema and creating model
const PostSchema=({
  Title:String,
  PostDescription:String
});
const Post=mongoose.model("Post",PostSchema);



const homeStartingContent = "Welcome to our Home section, where you'll embark on a captivating journey through a diverse collection of blogs. From thought-provoking articles to engaging personal narratives, our carefully curated selection covers a wide range of topics. Discover insightful analyses of current events, inspiring stories, and practical advice to expand your knowledge and perspective. Each blog is crafted by talented contributors from various backgrounds, providing a rich and rewarding reading experience for all.";
const aboutContent = "In our About section, we invite you to learn more about the heart and soul of our blog website. Dive into the story behind our creation, the inspiration that fuels our passion for sharing engaging content, and the dedicated team behind the scenes. We're driven by a commitment to providing you with high-quality, informative, and thought-provoking blogs. Discover our core values, guiding principles, and the vision that propels us forward in creating a platform that inspires and connects.";
const contactContent = "Connecting with our readers is of utmost importance to us, which is why we provide a Contact section where you can easily reach out and engage with us. Whether you have feedback, suggestions, or simply want to share your thoughts on our blogs, we welcome your input. Connect with us through our contact form, send us an email, or reach out via our social media channels. We value the vibrant community we're building and cherish the opportunity to interact with our readers.";

const app = express();



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){

  Post.find().then(function(posts){

    res.render("home.ejs",{information:homeStartingContent,array:posts});
  });

});

app.get("/about",function(req,res){
  res.render("about.ejs",{informataion:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact.ejs",{information:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose.ejs");
});


app.get("/post/:postName",function(req,res){
var p=_.lowerCase(req.params.postName);
Post.findOne({Title:p}).then((foundPost)=>{

   res.render("post",{Title:foundPost.Title,Content:foundPost.PostDescription});
});


});

app.post("/compose",function(req,res){
  var t1=_.lowerCase(req.body.text1);
  var t2=req.body.text2;

  const post=new Post({
    Title:t1,
    PostDescription:t2
  });
  post.save();

  res.redirect("/");

})


app.listen(3000, function() {
  // console.log("Server started on port 3000");
});
