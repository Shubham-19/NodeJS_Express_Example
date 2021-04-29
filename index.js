//imports
const express = require('express');

//Configs
const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

//logic
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/echo:msg', (req, res) => {
    res.send(req.params.msg);
});


app.post('/echo/', (req, res) => {
    res.send(req.body);
});

let USERS = [];

app.get('/users', (req, res) => {
    // res.send(`Users are: ${USERS[0].name},  ${USERS[0].age}`);
    list_data = '';
    for (const user of USERS){
        list_data += `{name:${user.name}, age:${user.age}}`;
    }
    res.send(`Users are: ${list_data}`);
    console.log(`${list_data}`);
});

app.post('/users', (req, res) => {
    let userData = {
        name: req.body.name,
        age: req.body.age,
    }
    USERS.push(userData);

    res.send('User has been added');
});

app.put('/users', (req, res) => {
    let userData ={}
    userData.name = req.body.name;
    userData.age = req.body.age;
    USERS.push(userData);
    res.send(`Users has been updated, total users are: ${USERS.length}`);
});

app.delete('/users', (req, res) => {
    USERS.splice(0, 1);
    res.send(`A user has been deleted, last user in the list is: ${USERS[USERS.length-1].name}`)
});

//listen
app.listen(port, () => {
    console.log(`App is listening at: http://localhost:${port}`);
});