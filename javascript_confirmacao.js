Swal.fire({
    title: "Passo 1: escreva o seu nome na caixa de texto.\nPasso 2: Clique no seu nome.\nPasso 3: Insira o nome e pelo menos um sobrenome dos seus convidados.\nPasso 4: Clique em 'Confirmar!' para confirmar a sua presença e a de seus convidados.",
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

inputSearch.oninput = () => {
    ul.innerHTML = ""

    conv
        .filter(item => item.nome.toLowerCase().includes(inputSearch.value.toLowerCase()))
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

const div_inputs = document.querySelector("[inputs]")
const div_convites = document.querySelector("div.convites")
const form = document.querySelector("form")

function convidados(ele) {
    div_convites.innerHTML = ""
    form.innerHTML = ""
    ul.innerHTML = ""
    addHTML(ele)

    const p = document.createElement("p")
    p.innerText = `Você tem ${ele.convites} convites:`
    div_convites.append(p)
    for( let i = 0 ; i < ele.convites ; i++ ) {
            const span = document.createElement("span")
            span.classList.add("material-symbols-outlined")
            span.innerText = "local_activity"
            div_convites.append(span)

            const input = document.createElement("input")
            input.setAttribute("type", "text")
            input.setAttribute("name", i+1)
            input.setAttribute("id", i+1)
            input.setAttribute("placeholder", `Convidado 0${i+1}`)
            form.append(input)
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
    str = str.concat(`${ele.nome} confirmou a presença e levará consigo os seguintes convidados: `)
    for( let i = 0 ; i < ele.convites ; i++ ) {
        let val = document.getElementById(`${i+1}`).value
        if(i <= ele.convites-1) {
            str = str.concat(val)
            str = str.concat(", ")
        }else {
            str = str.concat("e ")
            str = str.concat(val)
        }
    }

    setTimeout(() => {
        window.location.href = str
    }, 5050);
}