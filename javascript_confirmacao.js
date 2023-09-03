// alert("Passo 1: escreva o seu nome na caixa de texto.\nPasso 2: Clique o seu nome.\nPasso 3: Insira o nome e pelo menos um sobrenome dos seus convidados.")
// Swal.fire({
//     title: "Passo 1: escreva o seu nome na caixa de texto.\nPasso 2: Clique o seu nome.\nPasso 3: Insira o nome e pelo menos um sobrenome dos seus convidados.",
//     showClass: {
//       popup: 'animate__animated animate__fadeInDown'
//     },
//     hideClass: {
//       popup: 'animate__animated animate__fadeOutUp'
//     }
// })

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
        .forEach((item, index) => addHTML(item, index))

}

function addHTML(item, index) {
    const li = document.createElement("li")
    const a = document.createElement("a")
    a.setAttribute("index", index)
    a.innerText = item.nome
    a.addEventListener("click", e => {
        convidados(e.target)
    })
    li.append(a)
    // for(let i = 0 ; i < item.convites ; i++) {
    //     const span = document.createElement("span")
    //     span.classList.add("material-symbols-outlined")
    //     span.innerText = "local_activity"
    //     li.append(span)
    // }

    ul.append(li)
}
    
function convidados(ele) {
    const div_inputs = document.querySelector("[inputs]")
    const div_convites = document.querySelector("div.convites")
    div_convites.innerHTML = ""
    const form = document.querySelector("form")
    form.innerHTML = ""
    const index_ele = ele.getAttribute("index")
    ul.innerHTML = ""
    addHTML(conv[index_ele].nome, index_ele)

    const p = document.createElement("p")
    p.innerText = `Você tem ${conv[index_ele].convites}:`
    div_convites.append(p)
    for( let i = 0 ; i < conv[index_ele].convites ; i++ ) {
            const span = document.createElement("span")
            span.classList.add("material-symbols-outlined")
            span.innerText = "local_activity"
            div_convites.append(span)

            const input = document.createElement("input")
            input.setAttribute("type", "text")
            input.setAttribute("name", i)
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
            title: 'Presença confirmada com sucesso.\n\nVocê Sera redirecionado ao convite em alguns segundos!',
            showConfirmButton: false,
            timer: 3500
          })

        conf_whats(index_ele)
    })
    form.append(submit)
    div_inputs.classList.toggle("clicked")
}

// https://wa.me/5564981721535?text=

function conf_whats(index) {
    let str = "https://wa.me/5564981721535?text="
    str = str.concat(`${conv[index].nome} confirmou a presença e levará consigo os seguintes convidados:\n`)

    for( let i = 0 ; i < conv[index].convites ; i++ ) {
        let val = document.getElementById(`${i+1}`).value
        if(i != conv[index].convites-1) {
            str = str.concat(val)
            str = str.concat(",")
        }else {
            str = str.concat(" e ")
            str = str.concat(val)
        }
    }

    window.location.href = str
}