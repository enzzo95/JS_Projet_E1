const button_add = document.getElementById("add")
const check = document.getElementById("checkbox")

button_add.addEventListener("click", function() {
    createDiv()
    update_check()
})

function createDiv() {
    // Créer le div
    const div = document.createElement("div");

    // Créer l'élément li
    const li = document.createElement("li");

    // Récupérer la valeur du formulaire
    const name = document.getElementById("name").value;

    // Lier à li
    li.textContent = name;

    // Création de la checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";

    checkbox.addEventListener("change", function() {
        update_check()
    })

    // Création du bouton de suppression
    const button = document.createElement("button");
    button.textContent = "Supprimer";
    button.addEventListener("click", function() {
        div.remove();
        update_check();
    });

    div.appendChild(checkbox);
    div.appendChild(li);
    div.appendChild(button);

    document.getElementById("liste").appendChild(div);
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
