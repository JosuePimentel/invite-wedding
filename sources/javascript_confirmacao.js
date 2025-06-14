Swal.fire({
    title: "Passo 1: escreva o seu nome na caixa de texto.\nPasso 2: Clique no seu nome.\nPasso 3: Verifique se seus convidados estão certos.\nPasso 4: Clique em 'Confirmar!' para confirmar a sua presença e a de seus convidados.",
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    }
})

const conv = new Array

fetch("http://localhost:8080/guests/no-accepted")
    .then(response => {
        return response.json()
    })
    .then(jsondata => {
        jsondata.data.forEach(ele => {
            conv.push(ele)  
        })
    })

const ul = document.querySelector("ul")
const inputSearch = document.querySelector("[type='search']")
const div_inputs = document.querySelector("[inputs]")
const div_convites = document.querySelector("div.convites")
const form = document.querySelector("form")

inputSearch.oninput = () => {
    div_inputs.classList.remove("clicked")
    ul.innerHTML = ''

    conv
        .filter(item => inputSearch.value.toLowerCase() == "" ? null : item.name.toLowerCase().includes(inputSearch.value.toLowerCase()))
        .forEach(item => {
            if(!item.accepted)
                addHTML(item)
        })

}

function addHTML(item) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.setAttribute("index", item.id)
    a.innerText = item.name
    a.addEventListener("click", e => convidados(item))
    li.append(a)
    ul.append(li)
}

function convidados(ele) {
    div_convites.innerHTML = ""
    form.innerHTML = ""
    ul.innerHTML = ""

    const convidados = eval(ele.guests);

    addHTML(ele)

    const p = document.createElement("p")
    p.innerText = `Você tem ${convidados.length} convites:`
    div_convites.append(p)
    for (let i = 0; i <= convidados.length; i++) {
        const span = document.createElement("span")
        span.classList.add("material-symbols-outlined")
        span.innerText = "local_activity"
        div_convites.append(span)

        const div = document.createElement("div")
        const input = document.createElement("input")
        const span1 = document.createElement("span")
        input.setAttribute("type", "checkbox")
        input.setAttribute("checked", "true")
        input.setAttribute("id", i + 1)

        if (i == convidados.length) {
            input.setAttribute("name", ele.name)
            span1.innerText = ele.name
        } else {
            input.setAttribute("name", convidados[i])
            span1.innerText = convidados[i]
        }
        div.append(input)
        div.append(span1)
        form.append(div)

    }
    const submit = document.createElement("input")
    submit.setAttribute("type", "submit")
    submit.setAttribute("value", "Confirmar!")
    submit.addEventListener('click', e => {
        e.preventDefault()
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Presença confirmada com sucesso.\n\nVocê sera redirecionado ao whatsapp em segundos!',
            showConfirmButton: false,
            timer: 5000
        })

        fetch(`http://localhost:8080/guests/accept-invite/${ele.id}`, { method: 'post' })

    })
    form.append(submit)
    div_inputs.classList.add("clicked")
}