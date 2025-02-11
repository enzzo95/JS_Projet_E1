/*
    Eden : récupérer valeur du formulaire, gestion de la date, listener du button tri, Fonction : update_check(), get_date(), tri_date(asc_or_desc)
    Enzo : listener du button add, Fonction : createDiv(), edit(div), CSS
*/

// Constante du bouton créer
const button_add = document.getElementById("add")
const button_tri = document.getElementById("tri")

let compteur_tri = 0;

// Actions si le bouton créer est cliqué
button_add.addEventListener("click", function() {
    // Si le contenu de la tache n'est pas vide
    if (document.getElementById("name").value) {
        createDiv()
        update_check()
    }
})

button_tri.addEventListener("click", function() {
    compteur_tri += 1;
    
    (compteur_tri % 2 == 0) ? tri_date("asc") : tri_date("desc");
})

// Fonction créer une tache
function createDiv() {
    // Créer le div et li
    const div = document.createElement("div");
    const li = document.createElement("li");

    // Récupérer valeur du form (texte de la tache)
    const name = document.getElementById("name").value;

    // Ajout valeur du form dans le li
    li.textContent = name;

    // Création checkbox + eventListener
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    checkbox.addEventListener("change", function() {
        update_check()
    })

    // Création bouton de suppression + eventListener
    const button_delete = document.createElement("button");
    button_delete.textContent = "Supprimer";
    button_delete.addEventListener("click", function() {
        div.remove();
        update_check();
    });

    // Création bouton edit + eventListener
    const button_edit = document.createElement("button");
    button_edit.textContent = "Modifier"
    button_edit.addEventListener("click", function() {
        edit(div);
    });

    let date = new Date()
    const p_date = document.createElement("p")
    p_date.id = "date"
    p_date.innerText = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - " 
                        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds()

    // Ajout des éléments au div
    div.appendChild(checkbox);
    div.appendChild(li);
    div.appendChild(button_edit);
    div.appendChild(button_delete);

    // Ajout du div dans le ul "liste"
    document.getElementById("liste").appendChild(div);
    div.appendChild(p_date)
}

function update_check() {
    const liste = document.querySelectorAll("ul > div > input")
    const p = document.getElementById("compteur")

    let compteur = 0
    let max = 0

    liste.forEach(items => {
        max += 1

        if (items.checked) {
            compteur += 1
        }
    })

    p.innerText = "Tache(s) " + compteur + " / " + max
}

// Fonction modifier tache
function edit(div) {
    // Récupere le li
    const li = div.querySelector("li");

    // Création zone de texte
    const newText = document.createElement("input");
    newText.type = "text";
    newText.value = li.textContent;   

    // Création bouton de validation + eventListener
    const saveButton = document.createElement("button");
    saveButton.textContent = "Valider";
    saveButton.addEventListener("click", function() {
        if (newText.value) {
            let new_date = new Date()

            const p_date = div.querySelector("p")

            li.textContent = newText.value;
            newText.replaceWith(li)
            p_date.innerText = new_date.getDate() + "/" + (new_date.getMonth() + 1) + "/" + new_date.getFullYear() + " - " 
                        + new_date.getHours() + ":" + new_date.getMinutes() + ":" + new_date.getSeconds()

            saveButton.remove();
        }
    });

    // Remplace li par zone de texte et ajoute bouton validation
    li.replaceWith(newText);
    div.appendChild(saveButton);
}

function get_date()
{
    const liste = document.querySelectorAll("ul > div > p")
    let dates = [];

    liste.forEach(items => {
        let temp  = []

        let dateSplitParts = items.innerText.split(" - ")
        let datePart = dateSplitParts[0].split("/")
        let timePart = dateSplitParts[1].split(":")

        for (let i = datePart.length - 1; i >= 0; i--)
        {
            temp.push(datePart[i]);
        }
        
        for (let j = 0; j < timePart.length; j++)
        {
            temp.push(timePart[j])
        }

        dates.push(temp)
    })

    return dates
}

function tri_date(asc_or_desc)
{
    const liste = document.querySelectorAll("ul > div > p")
    const ul = document.querySelector("ul")

    let task = get_date()   
    let order_task = []

    task.sort((a, b) => {
        let dateA = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5])
        let dateB = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5])

        if (asc_or_desc == 'asc')
        {
            button_tri.innerHTML = "Tri par date ascendant"
            return dateA - dateB
        }
        
        else
        {
            button_tri.innerHTML = "Tri par date descendant"
            return dateB - dateA
        }
    })

    for (let i = 0; i < task.length; i++) {
        let date = task[i][2] + "/" + task[i][1] + "/" + task[i][0] + " - " + task[i][3] + ":" + task[i][4] + ":" + task[i][5]

        liste.forEach(item => {
            if (date == item.innerText) {
                order_task.push(item.parentElement)
            }
        })
    }

    ul.innerHTML = ""
    order_task.forEach(item => {
        ul.appendChild(item)
    })
}