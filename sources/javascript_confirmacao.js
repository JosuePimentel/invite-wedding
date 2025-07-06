Swal.fire({
    title: "Passo 1: escreva o seu nome na caixa de texto.\nPasso 2: Clique no seu nome.\nPasso 3: Desmarque/Marque os convidados que não irão ao evento.\nPasso 4: Clique em 'Confirmar!' para confirmar a presença.",
    showClass: {
        popup: 'animate__animated animate__fadeInDown'
    },
    hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
    }
})

const conv = new Array

fetch("https://invite-wedding-api.onrender.com/guests/no-accepted")
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
        .forEach(item => { addHTML(item) })

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

    let convidados = eval(ele.guests);
    convidados = convidados.filter(e => e?.length)

    addHTML(ele)

    const p = document.createElement("p")
    p.innerText = `Você tem ${convidados.length} convites:`
    div_convites.append(p)
    for (let i = 0; i < convidados.length; i++) {
        const conv = convidados[i];
        const isAccepted = conv[0] === 'V';

        const span = document.createElement("span")
        span.classList.add("material-symbols-outlined")
        span.innerText = "local_activity"
        div_convites.append(span)

        const div = document.createElement("div")
        const checkbox = document.createElement("input")
        checkbox.setAttribute('type', 'checkbox')
        checkbox.classList.add('accept-invite')

        if(isAccepted) {
          checkbox.setAttribute('checked', 'true')
        }

        const span1 = document.createElement("span")
        span1.innerText = conv.slice(2, conv.length)

        div.append(checkbox)
        div.append(span1)
        form.append(div)
    }
    const submit = document.createElement("input")
    submit.setAttribute("type", "submit")
    submit.setAttribute("value", "Confirmar!")
    submit.addEventListener('click', e => {
        e.preventDefault()
        let guests = eval(ele.guests)
        guests = guests.filter(e => e?.length)
        document.querySelectorAll('.accept-invite').forEach((input, index) => {
          if (guests[index][0] === 'V') {
            guests[index] = guests[index].replace('V', input.checked ? 'V' : 'X')
          } else {
            guests[index] = guests[index].replace('X', input.checked ? 'V' : 'X')
          }
        })

        fetch(`https://invite-wedding-api.onrender.com/guests/accept-invite/${ele.id}`, { method: 'post', body: JSON.stringify({ guests: guests }), headers: { 'Content-Type': 'application/json' }, })

        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Presença confirmada com sucesso!!',
          showConfirmButton: false,
          timer: 5000
        }).then(() => window.location.href = 'https://invite-wedding-pi.vercel.app/')
    })
    form.append(submit)
    div_inputs.classList.add("clicked")
}
