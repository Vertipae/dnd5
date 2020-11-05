## dnd5 (In development)

This application is implemented with Reactjs, Node.js, Express and MongoDB.

With this application you can keep track of your characters & games.

Done:

- Login/Register with your username (validates username & password)
- Create characters(name, level, race, class, alignment) and see them listed
- Edit & delete characters

Todo:

- Create games as a dungeon master
- Add players to join your game
- Dark mode
- Lots of features for characters

![dnd5-front](https://raw.githubusercontent.com/Vertipae/dnd5/master/img/dnd5_front.png)

### Development Environment:

Make a new file called default.json inside folder called /config

```
module.exports = {
"mongoURI":  "yourmongoDBURI",
"jwtSecret": "This is for JSON web token"
}
```

How to open:

```
npm install
```

```
npm run devv
```

Navigate to http://localhost:3000/
