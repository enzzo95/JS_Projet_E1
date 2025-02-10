function createDiv() {
    // Créer le div
    const div = document.createElement("div");

    // Créer l'élément li
    const li = document.createElement("li");

    // recuperer valeur form
    const name = document.getElementById("name").value

    //lier a li
    li.textContent = name;

    //creation checkbox
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    // creer bouton supp
    const button = document.createElement("button");
    button.textContent = "Supprimer";
    button.addEventListener("click", function() {
        div.remove();
    });


    div.appendChild(checkbox)
    div.appendChild(li);
    div.appendChild(button);


    document.getElementById("liste").appendChild(div);
}



function update_check()
{
    const liste = document.querySelectorAll("ul>input")
 
    liste.forEach(items => {
        if(items.checked)
        {
            console.log("CheckBox Cliqué")
        }
    })
}
 