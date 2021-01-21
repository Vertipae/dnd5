## dnd5 (In development)

This application is implemented with Reactjs, Node.js, Express and MongoDB.

Classes / Spells comes from https://www.dnd5eapi.co/docs/#intro

With this application you can keep track of your characters & games.

Done:

- Login/Register with your username (validates username & password)
- Create characters(name, level, race, class, alignment) and see them listed
- When creating a character you can select your class spells
- Edit & delete characters
- Dungeon master can create/delete games and share a join link (with a secret string)
- Dungeon master can upload a picture to a game

Todo:

- Dark mode

![dnd5-front](https://raw.githubusercontent.com/Vertipae/dnd5/master/img/dnd5_front.PNG)

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
