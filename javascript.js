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