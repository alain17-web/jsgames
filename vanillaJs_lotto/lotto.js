var chiffresCliqués = []

function afficher() {
    var tbl = document.createElement('table')
    var chiffre = 0

    //Create table
    for (i = 0; i < 7; i++) {
        var tr = document.createElement('tr')

        for (j = 0; j < 7; j++) {
            var td = document.createElement('td')
            td.style.width = '24px'
            td.style.height = '24px'
            td.style.border = "2px solid teal"
            td.style.fontWeight = "500"
            td.style.textAlign = "center"
            td.style.cursor = "pointer"


            chiffre++


            td.setAttribute('class', 'chiffreTd')
            td.setAttribute('id', chiffre)
            td.innerHTML = chiffre

            tr.appendChild(td)

        }

        tbl.appendChild(tr)
    }
    document.getElementById('grille').appendChild(tbl)

    //Make letters clickable + handle style
    var tdChiffres = document.querySelectorAll('.chiffreTd')
    tdChiffres.forEach(tdChiffre => {
        tdChiffre.addEventListener('click', function () {
            traiterClick(tdChiffre.id)
            if(chiffresCliqués.includes(tdChiffre.id) && chiffresCliqués.length < 7){
                tdChiffre.style.fontWeight = '900'
                tdChiffre.style.backgroundColor = "teal"
                tdChiffre.style.color = "white"
            } else {
                tdChiffre.style.fontWeight = '500'
                tdChiffre.style.backgroundColor = "white"
                tdChiffre.style.color = "black"
            }
        })
    })
    
}

//Show message when 6 letters clicked
function traiterClick(nombre) {
    var index = chiffresCliqués.indexOf(nombre)

    if (chiffresCliqués.length < 7 ) {
        
            if(chiffresCliqués.indexOf(nombre) !== -1){
                chiffresCliqués.splice(index,1)
            }else {
                chiffresCliqués.push(nombre)
                
            }
 
    } 
    afficherResultats()
   
}

function afficherResultats(){
    if(chiffresCliqués.length === 6){
        document.getElementById('message').innerHTML = "Votre grille : " + chiffresCliqués.join(' - ')
    } else {
        document.getElementById('message').innerHTML = ''
    }
    
}


