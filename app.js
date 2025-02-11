/*
    Eden : Formulaire, Fonction qui verifie les box check
    Enzo : Fonction création div, supprime et modifie
*/



// Constante du bouton créer
const button_add = document.getElementById("add")

// Actions si le bouton créer est cliqué
button_add.addEventListener("click", function() {

    // Si le contenu de la tache n'est pas vide
    if (document.getElementById("name").value)
    {
        createDiv()
        update_check()
    }
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

function update_check()
{
    const liste = document.querySelectorAll("ul > div > input")
    const p = document.getElementById("compteur")

    let compteur = 0
    let max = 0

    liste.forEach(items => {
        max += 1

        if (items.checked)
        {
            compteur += 1
        }
    })

    p.innerText = "Tache(s) " + compteur + " / " + max
}

// Fonction modifier tache
function edit(div)
{
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
        if (newText.value) 
        {
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
