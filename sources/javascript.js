const bg = document.querySelector(".bgImage")

bg.addEventListener("click", e => {
    bg.style.zIndex = -1
    document.querySelector('main').classList.add("clicked")
    document.querySelector('.bgImage').classList.add("clicked")
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

setTimeout(() => {
    const sect_children = document.querySelector("section#Third").children
    let i = 0
    setInterval(() => {
    // pointer.classList.toggle("animate")
        if(i%2 == 0) {
            sect_children.item(1).innerHTML = "left_click"
        } else {
            sect_children.item(1).innerHTML = "ads_click"
        } 

        if(i == 5) {
            sect_children.item(0).style.opacity = 1
            sect_children.item(2).style.opacity = 1
        }
        i++
    }, 1000)
}, 2000)