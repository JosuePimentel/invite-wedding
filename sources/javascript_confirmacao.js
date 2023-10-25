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
        .filter(item => inputSearch.value.toLowerCase() == "" ? null : item.nome.toLowerCase().includes(inputSearch.value.toLowerCase()))
        .forEach(item => addHTML(item))

}

function addHTML(item) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.setAttribute("index", item.index)
    a.innerText = item.nome
    a.addEventListener("click", e => convidados(item))
    li.append(a)
    ul.append(li)
}

function convidados(ele) {
    div_convites.innerHTML = ""
    form.innerHTML = ""
    ul.innerHTML = ""
    addHTML(ele)

    const p = document.createElement("p")
    p.innerText = `Você tem ${ele.nconvidados} convites:`
    div_convites.append(p)
    for( let i = 0 ; i < ele.nconvidados ; i++ ) {
            const span = document.createElement("span")
            span.classList.add("material-symbols-outlined")
            span.innerText = "local_activity"
            div_convites.append(span)

            const div = document.createElement("div")
            const input = document.createElement("input")
            const span1 = document.createElement("span")
            input.setAttribute("type", "checkbox")
            input.setAttribute("checked", "true")
            input.setAttribute("id", i+1)

            if(i == ele.nconvidados-1) {
                input.setAttribute("name", ele.nome)
                span1.innerText = ele.nome
            } else {
                input.setAttribute("name", ele.convidados[i])
                span1.innerText = ele.convidados[i]
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

        conf_whats(ele)
    })
    form.append(submit)
    div_inputs.classList.add("clicked")
}

// https://wa.me/5564981721535?text=

function conf_whats(ele) {
    let str = "https://wa.me/5564981120169?text="
    let strCPY = ""
    let aux = 0
    for( let i = 0 ; i < ele.nconvidados ; i++ ) {
        let val = document.getElementById(`${i+1}`)
        if(val.checked) {
            if(val.name == ele.nome)
                aux++
            else
                strCPY = strCPY.concat(val.name, ", ")
        }
    }

    if(aux) {
        str = str.concat(`${ele.nome} confirmou a presença e levará consigo o(s) seguinte(s) convidado(s): `)
    } else {
        str = str.concat(`${ele.nome} não ira, mas confirmou a presença do(s) seguinte(s) convidado(s): `)
    }

    str = str.concat(strCPY)
    console.log(str)

    setTimeout(() => {
        window.location.href = str
    }, 5050);
}