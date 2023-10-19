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
const div_inputs = document.querySelector("[inputs]")
const div_convites = document.querySelector("div.convites")
const form = document.querySelector("form")

inputSearch.oninput = () => {
    div_inputs.classList.remove("clicked")

    conv
        .filter(item => inputSearch.value.toLowerCase() == "" ? null : item.nome.toLowerCase().includes(inputSearch.value.toLowerCase()))
        .forEach(item => addHTML(item))

}

function addHTML(item) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.setAttribute("index", item.index)
    a.innerText = item.nome
    a.addEventListener("click", e => {
        convidados(item)
    })
    li.append(a)
    ul.append(li)
}

function convidados(ele) {
    div_convites.innerHTML = ""
    form.innerHTML = ""
    ul.innerHTML = ""
    // addHTML(ele)

    const p = document.createElement("p")
    p.innerText = `${ele.nome} tem ${ele.nconvidados ? ele.nconvidados : "nenhum"} convites`
    div_convites.append(p)
    for( let i = 0 ; i < ele.nconvidados ; i++ ) {
            const span = document.createElement("span")
            span.classList.add("material-symbols-outlined")
            span.innerText = "local_activity"
            div_convites.append(span)

            const p1 = document.createElement("p")
            p1.innerText = `${i+1}. ${ele.convidados[i]}`

            form.append(p1)

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

        conf_whats(ele)
    })
    form.append(submit)
    div_inputs.classList.add("clicked")
}

// https://wa.me/5564981721535?text=

function conf_whats(ele) {
    let str = "https://wa.me/5564981120169?text="
    let strCPY = ""
    for( let i = 0 ; i < ele.nconvidados ; i++ ) {
        strCPY = strCPY.concat(ele.convidados[i], ", ")
    }

    str = str.concat(`${ele.nome} confirmou a presença e levará consigo o(s) seguinte(s) convidado(s): `)

    str = str.concat(strCPY)

    setTimeout(() => {
        div_inputs.classList.remove("clicked")
        window.location.href = str
    }, 5050);
}