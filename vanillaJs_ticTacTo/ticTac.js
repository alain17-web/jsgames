var player1 = "Paul (0)"
var player2 = "Pierre (X)"
var chiffre = 0
var locations
var casesCliquéesParPaul = []
var casesCliquéesParPierre = []
var click = 0
var caseNum



function start() {

    //Create table
    var tbl = document.createElement("table")
    for (var i = 0; i < 3; i++) {
        var tr = document.createElement('tr')

        for (var j = 0; j < 3; j++) {
            var td = document.createElement('td')
            td.style.width = "52px"
            td.style.height = "52px"
            td.style.cursor = 'pointer'
            td.style.textAlign = 'center'
            td.style.fontSize = '42px'
            td.style.fontWeight = '900'

            chiffre++
            td.setAttribute('id', chiffre)
            td.setAttribute('class', 'cases')

            tr.appendChild(td)
        }

        tbl.appendChild(tr)
    }
    document.getElementById('grille').appendChild(tbl)


    //Style each td
    document.getElementById('2').style.borderRight = '1px solid black'
    document.getElementById('2').style.borderLeft = '1px solid black'
    document.getElementById('2').style.borderBottom = '1px solid black'

    document.getElementById('1').style.borderBottom = '1px solid black'

    document.getElementById('3').style.borderBottom = '1px solid black'

    document.getElementById('4').style.borderBottom = '1px solid black'

    document.getElementById('5').style.borderRight = '1px solid black'
    document.getElementById('5').style.borderLeft = '1px solid black'
    document.getElementById('5').style.borderBottom = '1px solid black'

    document.getElementById('6').style.borderBottom = '1px solid black'

    document.getElementById('8').style.borderLeft = '1px solid black'
    document.getElementById('8').style.borderRight = '1px solid black'

    afficherMsg()


    //Make each td clickable
    locations = document.querySelectorAll('.cases')
    locations.forEach(location => {
        location.addEventListener('click', function () {
            jouer(location.id)
        })
    })

}

//Message at start of game
function afficherMsg() {
    var msg = document.createElement('p')
    msg.innerHTML = "C'est au tour de " + player1 + " de jouer."
    document.getElementById('message').appendChild(msg)
}

//handleClick 
function jouer(caseId) {

    var caseCliquée = document.getElementById(caseId)

    if (caseCliquée.hasChildNodes()) {
        return;
    }

    click++

    var joueur = (click % 2 != 0) ? player2 : player1

    var signe = document.createElement('span')
    signe.textContent = (click % 2 != 0) ? "O" : "X"
    var couleur = (click % 2 != 0) ? "green" : "blue"
    signe.style.color = couleur

    caseCliquée.appendChild(signe)

    var msgDiv = document.getElementById('message')
    msgDiv.querySelector('p').innerHTML = "C'est au tour de " + joueur + " de jouer."

    if (joueur === player1) {
        casesCliquéesParPierre.push(caseCliquée)
    } else {
        casesCliquéesParPaul.push(caseCliquée)
    }

    var gagnant = false

    var combinaisonsGagnantes = [

        ['1', '2', '3'],
        ['4', '5', '6'],
        ['7', '8', '9'],
        ['1', '4', '7'],
        ['2', '5', '8'],
        ['3', '6', '9'],
        ['1', '5', '9'],
        ['3', '5', '7']
    ]

    for (var i = 0; i < combinaisonsGagnantes.length; i++) {
        var [a, b, c] = combinaisonsGagnantes[i];

        var caseA = document.getElementById(a);
        var caseB = document.getElementById(b);
        var caseC = document.getElementById(c);

        if (
            caseA.hasChildNodes() &&
            caseB.hasChildNodes() &&
            caseC.hasChildNodes()
        ) {
            var samePlayer = false;

            if (
                casesCliquéesParPierre.includes(caseA) &&
                casesCliquéesParPierre.includes(caseB) &&
                casesCliquéesParPierre.includes(caseC)
            ) {
                samePlayer = true;
            }

            if (
                casesCliquéesParPaul.includes(caseA) &&
                casesCliquéesParPaul.includes(caseB) &&
                casesCliquéesParPaul.includes(caseC)
            ) {
                samePlayer = true;
                
            }

            if(samePlayer){
                gagnant = true
            }
            
        }

    }

    //Handle win - draw
    if (click === 9 && !gagnant) {
        msgDiv.querySelector('p').innerHTML = "Match Nul !";

        var btn = document.createElement('button')
        btn.style.backgroundColor = "teal";
        btn.style.color = "white";
        btn.style.width = '120px'
        btn.style.height = '30px'
        btn.style.borderRadius = '8px'
        btn.style.marginLeft = "10px"
        btn.style.cursor = "pointer"

        btn.innerHTML = "Une autre ?"

        msgDiv.querySelector('p').appendChild(btn)

        btn.addEventListener('click', function () {
            location.reload()
        })

    } else if (gagnant && samePlayer) {
        var vainqueur = (joueur == player1) ? player2 : player1
        msgDiv.querySelector('p').innerHTML = "BRAVO " + vainqueur + " !";


        var btn = document.createElement('button')
        btn.style.backgroundColor = "teal";
        btn.style.color = "white";
        btn.style.width = '120px'
        btn.style.height = '30px'
        btn.style.borderRadius = '8px'
        btn.style.marginLeft = "10px"
        btn.style.cursor = "pointer"

        btn.innerHTML = "Une autre ?"

        msgDiv.querySelector('p').appendChild(btn)

        btn.addEventListener('click', function () {
            location.reload()
        })

    }

}

