/*
    Eden : récupérer valeur du formulaire, gestion de la date, listener du button tri, Fonction : update_check(), get_date(), tri_date(asc_or_desc)
    Enzo : Fonctionnalités : ajouter, supprimer, modifier, barrer et mettre en bas si check. CSS
*/

const addButton = document.getElementById("add");
const sortButton = document.getElementById("tri");

let sortCounter = 0;

addButton.addEventListener("click", function() {
    if (document.getElementById("name").value) {    // Si value du form non vide
        createDiv();
        updateCheck();
    }
});

sortButton.addEventListener("click", function() {
    sortCounter += 1;
    
    (sortCounter % 2 == 0) ? sortDate("asc") : sortDate("desc");
});

// Créer une tache
function createDiv() {

    const list = document.getElementById("liste");
    const name = document.getElementById("name").value;

    const div = document.createElement("div");
    const li = document.createElement("li");
    li.textContent = name;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    checkbox.addEventListener("change", function() {
        updateCheck();
        checkbox.checked ? (li.style.textDecoration = "line-through", list.appendChild(div)) // re appendChild pour mettre a la fin si checked
                        : li.style.textDecoration = "none";
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Supprimer";
    deleteButton.id = "supprimer";
    deleteButton.addEventListener("click", function() {
        div.remove();   // Supprime le div parent
        updateCheck();  // Update compteur
    });

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

    // Append les éléments au div puis le div au ul
    div.appendChild(checkbox);
    div.appendChild(li);
    div.appendChild(pDate);
    div.appendChild(editButton);
    div.appendChild(deleteButton);

    list.appendChild(div);

}

function updateCheck() {
    const liste = document.querySelectorAll("ul > div > input");
    const p = document.getElementById("compteur");

    let compteur = 0;
    let max = 0;

    liste.forEach(items => {
        max += 1;   // cCompter tâches totales

        if (items.checked) {    // Compter tâches faites (checked)
            compteur += 1;
        }
    });

    p.innerText = "Tache(s) " + compteur + " / " + max;
}

// Div en paramètre pour permettre de modifier tous les éléments
function edit(div) {

    const li = div.querySelector("li");
    const pDate = div.querySelector("p");
    const modifyButton = div.querySelector("#modifier");

    const input = document.createElement("input");
    input.id = "editInput"
    input.type = "text";
    input.value = li.textContent;   

    const saveButton = document.createElement("button");
    saveButton.id = "save"
    saveButton.textContent = "Valider";
    saveButton.addEventListener("click", function() {
        if (input.value) {
            let newDate = new Date();

            // Re remplace les élément + actualisation date
            li.textContent = input.value;
            input.replaceWith(li);
            pDate.innerText = newDate.getDate() + "/" + (newDate.getMonth() + 1) + "/" + newDate.getFullYear() + " - " 
                        + newDate.getHours() + ":" + newDate.getMinutes() + ":" + newDate.getSeconds();

            saveButton.replaceWith(modifyButton);
        }
    });

    // Remplacer éléments à l'appel de la fonction
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

    let task = getDate();
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