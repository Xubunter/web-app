var express = require('express');
var bodyParser = require('body-parser');
var {Pool} = require('pg');


var conString = 'postgres://postgres:2na2bydet@localhost/Users';

var app = express();

var session = require('express-session');

var users = [];


app.use(session({
    secret: 'aaa2C44-4D44-WppQ38Siuyiuy',
    cookie: {maxAge: new Date(Date.now() + (60 * 1000 * 1))},
    resave: true,
    saveUninitialized: true
}));


var urlencoedParser = bodyParser.urlencoded({extended: false});

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'Users',
  password: '2na2bydet',
  port: 5432,
});

function getAllUsers(){ // Получение всех пользователей из базы данных.
	pool.query('SELECT * FROM users', (err, res) => {
		users = res.rows;
	});
}

function getRandomInt(min, max) 
{
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genetatorID(){ 
	return getRandomInt(10000,100000);
}

function generatorIMG(){
	return getRandomInt(1,20) + '.png';
}

function addUser(user){	
	var u = "'" + user.login + "', '" + user.pass + "', '" + user.email + "', '" + genetatorID() + "', '" + generatorIMG() + "'";
	pool.query('INSERT INTO users (login, pass, email, rik_or_morti_id, img) VALUES(' + u + ');' , (err, res) => {});
}

function checkUser(user){ // Проверка пользователя для входа.
	getAllUsers();
	var valid = false;
	var curUser = '';
	users.forEach(function(item){
		if(item.email == user.email && item.pass == user.pass){
			valid = true;
			curUser = item;
			break;
		}
	});
	return valid ? curUser : undefined; // Если данные пользователя совпадают, возвращаем его данные
}

function checkUserForRegister(user){ // Проверка пользователя для регистрации
	getAllUsers();
	var invalid = false;
	var curUser = '';
	users.forEach(function(item){
		if(item.email == user.email && item.login == user.login){
			invalid = true;
		}
	});
	return !invalid; // Если email и login ранее не использовались, возвращаем True.
}




app.set('view engine', 'ejs');
app.use('/css', express.static('css'));
app.use('/img', express.static('img'));
app.use(bodyParser.urlencoded({extended: false}));
getAllUsers();

app.get('/', function(req, res){
	// Проверяем текущую сессию, если пользователь авторизовался, то выводим его ник на странице.
	if (typeof req.session.user == 'undefined') res.render('index', {username : 'Anonymous', users: users});
	else res.render('index', {username : req.session.user, users: users});
});

app.get('/login', function(req, res){
	res.render('login');
});


app.get('/register', function(req, res){
	res.render('register');
});


app.post('/login', function(req, res){
	var curUser = checkUser({email : req.body.email, pass : req.body.pass});
	if(typeof curUser != 'undefined'){
		// Записываем в сессию логин пользователя.
		req.session.user = curUser.login;
		res.redirect('/');		
	}else{
		// Если не прошли авторизацию, то выводим ошибку.
		res.render('login', {err : 'error'});;
	}

});

app.get('/signout', function(req, res){	// Выход из аккаунта
	req.session.destroy(function(err) {
	})
	res.redirect('/');
});


app.post('/register', urlencoedParser , function(req, res){
	var newUser = {
		login : req.body.login,
		pass  : req.body.pass,
		email : req.body.email
	};
	if(checkUserForRegister(newUser)){
		req.session.user = newUser.login;
		addUser(newUser);
		getAllUsers();
		res.redirect('/');
	}else{
		res.render('register', {err : 'error'});
	}

});

app.post('/' ,urlencoedParser, function(req, res){
	if(!req.body) return res.sendStatus(400);
});

app.listen(3000);


