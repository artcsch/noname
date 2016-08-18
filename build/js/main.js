require('jquery');
var page = require('page');
var main = document.getElementById('nav-mobile');

$(".button-collapse").sideNav();

page('/', function(ctx, next){
  main.innerHTML = 'Inicio <a href="/Datos">Datos</a>';
});

page();
