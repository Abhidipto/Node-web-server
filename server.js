const express=require("express")
const hbs=require("hbs")
const fs=require("fs")
const port = process.env.PORT || 3000
var app=express()

hbs.registerPartials(__dirname+"/views/partials")
app.set("view engine","hbs")
app.use(express.static(__dirname+"/public"))

app.use((req,resp,next)=>{
  now=new Date().toString()
  var log=`${now}:${req.method} ${req.url}`
  fs.appendFile("server-log.txt",log+"\n",(err)=>{
    if(err){
      console.log("Unable to append to server-log")
    }
  })

  next()
})

// app.use((req,resp,next)=>{
//   resp.render("maintainance.hbs",{
//     pageTitle:"Maintainance Page",
//     content:"The site is being updated, We'll be right back"
//   })
//   next()
// })


hbs.registerHelper("getCurrentYear",()=>{
  return new Date().getFullYear()
})

hbs.registerHelper("screamIt",(text)=>{
  return text.toUpperCase()
})

app.get("/",(req,resp)=>{
  // resp.send({
  //   name:"Abhi",
  //   likes:["Biking","Travelling"]
  // })

  resp.render("home.hbs",{
    pageTitle:"Home Page",
//    currentYear:new Date().getFullYear(),
    welcomeMessage:"Welcome to Hell!"
  })
})


app.get("/about",(req,resp)=>{
//  resp.send("About page")
//render any of templates set up with current view engine
resp.render("about.hbs",{
  pageTitle:"About Page",
  //currentYear:new Date().getFullYear()
})
})

app.get("/projects",(req,resp)=>{
  resp.render("projects.hbs",{
    pageTitle:"Projects Page",
    content:"This page displays Projects"
  })
})



app.listen(port,()=>{
  console.log(`Server is up on ${port}`)
})
