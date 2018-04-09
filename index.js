let btns = document.querySelector("menu-btn"),
    svg = document.querySelector("wires")

let btnsCenterPts = btns.map((e)=>{
  return e.getBoundingClientRect() + window.scrollY()
})
