/*
    Eden : récupérer valeur du formulaire, gestion de la date, listener du button tri, Fonction : update_check(), get_date(), tri_date(asc_or_desc)
    Enzo : Fonctionnalités : ajouter, supprimer, modifier, barrer et mettre en bas si check. CSS
*/

// Constante du bouton créer et du tri
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

    // Ajout de la date
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

// Met a jour le compteur de tache
function updateCheck()
{
    const liste = document.querySelectorAll("ul > div > input");
    const p = document.getElementById("compteur");

    let compteur = 0;
    let max = 0;

    liste.forEach(items => {
        max += 1;

        if (items.checked)
        {
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

// Récupération d'un tableau des dates
function getDate()
{
    // Récupération de toute les date
    const liste = document.querySelectorAll("ul > div > p");
    let dates = [];

    // Parcourt des dates
    liste.forEach(items => {
        let temp  = [];

        // Séparation en 2 tableaux de date sans affichage
        let dateSplitParts = items.innerText.split(" - "); // [[13/02/2025], [10:10:10]]
        let datePart = dateSplitParts[0].split("/"); // [[13, 02, 2025]
        let timePart = dateSplitParts[1].split(":"); // [[10, 10, 10]

        // Ajout dans dates au format [YYYY, MM, JJ, HH, MM, SS]
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

// Tri des dates
function sortDate(asc_or_desc)
{
    // Récupération des dates et du ul
    const liste = document.querySelectorAll("ul > div > p");
    const ul = document.querySelector("ul");

    // Création du tableau avec les dates et création d'un tableau vide
    let task = getDate();
    let orderTask = [];

    // Fonction de tri
    task.sort((a, b) => {
        // Création de la date et passage en miliseconde
        let dateA = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
        let dateB = new Date(b[0], b[1] - 1, b[2], b[3], b[4], b[5]);

        // Cas ascendant
        if (asc_or_desc == 'asc')
        {
            // Change l'affichage dans le boutton et renvoie le plus petit
            sortButton.innerHTML = "Tri par date ascendant";
            return dateA - dateB;
        }
        
        // Cas descendant
        else
        {
            // Change l'affichage dans le boutton et renvoie le plus grand
            sortButton.innerHTML = "Tri par date descendant";
            return dateB - dateA;
        }
    });

    // Parcours des taches pour remettre l'affichage a jour
    for (let i = 0; i < task.length; i++)
    {
        let date = task[i][2] + "/" + task[i][1] + "/" + task[i][0] + " - " + task[i][3] + ":" + task[i][4] + ":" + task[i][5];

        // Parcours des éléments
        liste.forEach(item => {
            // Si l'affichage des dates triés est egale a une des taches du tableau 
            if (date == item.innerText)
            {
                // Alors on ajoute l'élément equivalent a la date
                orderTask.push(item.parentElement);
            }
        });
    }

    // Suppréssion de tout les éléments et ajout des éléments dans le ul
    ul.innerHTML = "";
    orderTask.forEach(item => {
        ul.appendChild(item);
    });
} 
