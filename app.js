const button = document.getElementById("add")

button.addEventListener("click", function () {
    const ul = document.getElementById("liste")
    const li = document.createElement("li")

    li.innerText = "Bonjour"
    ul.append(li)
})