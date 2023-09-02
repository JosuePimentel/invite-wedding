const conv = new Array

fetch("./convidados.json")
    .then(response => {
        return response.json()
    })
    .then(jsondata => {
        jsondata.forEach(ele => {
            // addHTML(ele)
            conv.push(ele)
        })
    })

const ul = document.querySelector("ul")
const inputSearch = document.querySelector("[type='search']")

inputSearch.oninput = () => {
    ul.innerHTML = ""

    conv
        .filter(item => item.nome.toLowerCase().includes(inputSearch.value.toLowerCase()))
        .forEach(item => addHTML(item))

}

function addHTML(item) {
    const li = document.createElement("li")
    li.innerText = item.nome
    for(let i = 0 ; i < item.convites ; i++) {
        const span = document.createElement("span")
        span.classList.add("material-symbols-outlined")
        span.innerText = "local_activity"
        li.append(span)
    }

    ul.append(li)
}