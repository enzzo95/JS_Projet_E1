/*
    Eden : récupérer valeur du formulaire, gestion de la date, listener du button tri, Fonction : update_check(), get_date(), tri_date(asc_or_desc)
    Enzo : Fonctionnalités : ajouter, supprimer, modifier, barrer et mettre en bas si check. CSS
*/

// Constante du bouton créer
const addButton = document.getElementById("add");
const sortButton = document.getElementById("tri");

let sortCounter = 0;

// Actions si le bouton créer est cliqué
addButton.addEventListener("click", function() {
    // Si le contenu de la tache n'est pas vide
    if (document.getElementById("name").value) {
        createDiv();
        updateCheck();
    }
});

sortButton.addEventListener("click", function() {
    sortCounter += 1;
    
    (sortCounter % 2 == 0) ? sortDate("asc") : sortDate("desc");
});

// Fonction créer une tache
function createDiv() {

    const list = document.getElementById("liste");

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
        updateCheck();
        checkbox.checked ? (li.style.textDecoration = "line-through", list.appendChild(div))
                        : li.style.textDecoration = "none";
    });

    // Création bouton de suppression + eventListener
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.id = "supprimer";
    deleteButton.addEventListener("click", function() {
        div.remove();
        updateCheck();
    });

    // Création bouton edit + eventListener
    const editButton = document.createElement("button");
    editButton.textContent = "Modifier";
    editButton.id = "modifier";
    editButton.addEventListener("click", function() {
        edit(div);
    });

    let date = new Date();
    const pDate = document.createElement("p");
    pDate.id = "date";
    pDate.innerText = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + " - " 
                        + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

    // Ajout des éléments au div
    div.appendChild(checkbox);
    div.appendChild(li);
    div.appendChild(pDate);
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    // Ajout du div dans le ul "liste"
    list.appendChild(div);

}

function updateCheck() {
    const liste = document.querySelectorAll("ul > div > input");
    const p = document.getElementById("compteur");

    let compteur = 0;
    let max = 0;

    liste.forEach(items => {
        max += 1;

        if (items.checked) {
            compteur += 1;
        }
    });

    p.innerText = "Tache(s) " + compteur + " / " + max;
}

// Fonction modifier tache
function edit(div) {
    // Récupere le li et modifyButton
    const li = div.querySelector("li");
    const modifyButton = div.querySelector("#modifier");

    // Création zone de texte
    const input = document.createElement("input");
    input.type = "text";
    input.value = li.textContent;   

    // Création bouton de validation + eventListener
    const saveButton = document.createElement("button");
    saveButton.textContent = "Valider";
    saveButton.addEventListener("click", function() {
        if (input.value) {
            let newDate = new Date();

            const pDate = div.querySelector("p");

            li.textContent = input.value;
            input.replaceWith(li);
            pDate.innerText = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear() + " - " 
                        + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();

            saveButton.replaceWith(modifyButton);
        }
    });

    // Remplace li par zone de texte et ajoute bouton validation
    li.replaceWith(input);
    modifyButton.replaceWith(saveButton);
}

function getDate()
{
    const liste = document.querySelectorAll("ul > div > p");
    let dates = [];

    liste.forEach(items => {
        let temp  = [];

        let dateSplitParts = items.innerText.split(" - ");
        let datePart = dateSplitParts[0].split("/");
        let timePart = dateSplitParts[1].split(":");

        for (let i = datePart.length - 1; i >= 0; i--)
        {
            temp.push(datePart[i]);
        }
        
        for (let j = 0; j < timePart.length; j++)
        {
            temp.push(timePart[j]);
        }

        dates.push(temp);
    });

    return dates;
}

function sortDate(asc_or_desc)
{
    const liste = document.querySelectorAll("ul > div > p");
    const ul = document.querySelector("ul");

    let task = getDate()   ;
    let orderTask = [];

    task.sort((a, b) => {
        let dateA = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
        let dateB = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);

        if (asc_or_desc == 'asc')
        {
            sortButton.innerHTML = "Tri par date ascendant";
            return dateA - dateB;
        }
        
        else
        {
            sortButton.innerHTML = "Tri par date descendant";
            return dateB - dateA;
        }
    });

    for (let i = 0; i < task.length; i++) {
        let date = task[i][2] + "/" + task[i][1] + "/" + task[i][0] + " - " + task[i][3] + ":" + task[i][4] + ":" + task[i][5];

        liste.forEach(item => {
            if (date == item.innerText) {
                orderTask.push(item.parentElement);
            }
        });
    }

    ul.innerHTML = "";
    orderTask.forEach(item => {
        ul.appendChild(item);
    });
}