

  

# Hitplay WhatsChat 

  
  Quick Links:

*  [Introduction](#intro)
*  [Set up](#setup)
*  [Done list](#done)
*  [Follow-ups](#followup)


## <a name="intro"></a> Introduction

A single page chat application in React, Redux, Nodejs and MongoDB.


## <a name="setup"></a> Set up

```sh
$ git clone https://github.com/Jjunxi/whatschat.git

# server
$ cd whatschat/web/server
$ npm install
$ npm start

# mongoDB
$ cd whatschat/web/server
$ sh ./mongoimport.sh

# client
$ cd whatschat/web/client
$ npm install
$ npm start
```

Then open [http://localhost:3000/](http://localhost:3000/) to see the app.
One of the existing user in database:
**Username: jack**
**Password: jack**

  

## <a name="done"></a> Done list

- [x] Login and Signup
<img  src="https://github.com/Jjunxi/whatschat/blob/master/screenshots/Screen%20Shot%202018-05-18%20at%2011.43.28%20PM.png?raw=true" />
<img  src="https://github.com/Jjunxi/whatschat/blob/master/screenshots/Screen%20Shot%202018-05-18%20at%2011.56.27%20PM.png?raw=true" />
- [x] Contacts
<img  src="https://github.com/Jjunxi/whatschat/blob/master/screenshots/Screen%20Shot%202018-05-18%20at%2011.43.51%20PM.png?raw=true" />
- [x] Messages
- Chat history stored in MongoDB
- Real time unread messages notification
- Messages sorted by time
<img  src="https://github.com/Jjunxi/whatschat/blob/master/screenshots/Screen%20Shot%202018-05-18%20at%2011.44.14%20PM.png?raw=true" />
<img  src="https://github.com/Jjunxi/whatschat/blob/master/screenshots/Screen%20Shot%202018-05-18%20at%2011.48.04%20PM.png?raw=true" />
<img  src="https://github.com/Jjunxi/whatschat/blob/master/screenshots/Screen%20Shot%202018-05-18%20at%2011.52.07%20PM.png?raw=true" />


## <a name="followup"></a> Follow-ups
- [ ] User Auth by using Cognito
- [ ] DynamoDB chat history storage
- [ ] S3 image storage
- [ ] AWS Lambda serverless backend
  
  

## Author  

*  **Andy Liu**

  

License

----
MIT

  

Good Luck! 🚀