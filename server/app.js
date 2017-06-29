var express = require("express");
var app = express();
var path = require("path");
var nodeMailer = require("nodemailer");
var bodyParser = require("body-parser");
var contactForm = require('./routes/contactform.js');

var port = 5000;
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/contact', function(req, res){
  res.send('hey');
});

app.post('/contact/', function(req, res) {
  console.log(req.body);

  var transporter = nodeMailer.createTransport({

  service : 'Gmail',
  auth :
  {
    user:'youremail@gmail.com',
    pass:'password'
  }

  });

var mailOptions =
  {
    from:'Name <youremail@gmail.com>',
    to: 'whereToSend@gmail.com',
    subject:'A simple test',
    text:'this a a simple test from Name:'+ req.body.name+' Email:'+req.body.email+' Message:'+req.body.message,
    html:'<p><ul><li>this a a simple test from Name:'+ req.body.name+'</li><li> Email:'+req.body.email+'</li><li>Message:'+req.body.message+'</li></ul>',
  }

  transporter.sendMail(mailOptions, function (err, info)
  {
    if(err)
    {
      console.log(err);
      res.redirect('/');
    }else
    {
      console.log('Message send');
      res.redirect('/');
    }
  });

});


app.get('/*', function(req, res){
  var filename = req.params[0] || 'views/contact.html';
  res.sendFile(path.join(__dirname, '/public/', filename));
});

app.listen(port, function(){
  console.log('Listening for requests on port: ', port);
});
