const button = document.getElementById("add")

button.addEventListener("click", function () {
    const ul = document.getElementById("liste")
    const li = document.createElement("li")
    const checkbox = document.createElement("input")
    checkbox.type = "checkbox"

    const name = document.getElementById("name").value

    li.innerText = name

    ul.append(checkbox)
    ul.append(li)
})