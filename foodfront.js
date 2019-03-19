function afficher(element) {
    element.forEach(function (el) {


        var food = document.createElement('div');
        food.setAttribute('id', el.name);
        container.appendChild(food);

        var imgFood = document.createElement('div');
        imgFood.setAttribute('url', el.url);
        food.appendChild(imgFood);

        var descriptionFood = document.createElement('div');
        descriptionFood.setAttribute('p', el.description);
        food.appendChild(descriptionFood);

    })
}

// var log = document.getElementById("login");
// log.addEventListener('click', function () {
//     $.post("")
// })


var sel = document.getElementById("sel");
sel.addEventListener('click', function () {
    $.get("http://localhost:5000/salé", function (response, error) {

        afficher(response);
    })
});

var sucre = document.getElementById("sucre");
sucre.addEventListener('click', function () {
    $.get("http://localhost:5000/sucré", function (response, error) {

        afficher(response);
    })
});

var article = document.getElementById("art");
article.addEventListener('click', function () {
    $.get("http://localhost:5000/article", function (response, error) {

        afficher(response);
    })
});

var bien = document.getElementById("be");
bien.addEventListener('click', function () {
    $.get("http://localhost:5000/be", function (response, error) {

        afficher(response);
    })
});



var log = document.getElementById("login");
log.addEventListener('click', function openForm() {

    document.getElementById("formulaire").style.display = "block";

})


//L'UTILISATEUR CREER UN NOUVEAU COMPTE
function newClient() {
    var name = document.querySelector('#name').value;
    var firstname = document.querySelector('#firstname').value;
    var mail = document.querySelector('#mail').value;
    var password = document.querySelector('#password').value;
    $.post('http://localhost:5000/client',
        {
            name: name,
            firstname: firstname,
            mail: mail,
            password: password,
        },
        function (response) {
            console.log(response);
        });
}



function closeForm() {
    document.getElementById("formulaire").style.display = "none";
}