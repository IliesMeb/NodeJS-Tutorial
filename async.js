var a = 0;

setInterval(function(){
    //console.log(Math.random());
    console.log(a);
}, 1000);

setTimeout(function(){
    a = a + 1
}, 2500);