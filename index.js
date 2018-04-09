let btns = document.querySelectorAll(".menu-btn")
let menuBtnRect = document.querySelector(".hamburger").getBoundingClientRect()
let menuRect = document.querySelector(".menu").getBoundingClientRect()
let svg = document.querySelector(".wires")

let btnOuts = Array.from(btns).map((e)=>{
  let rect = e.getBoundingClientRect()
  return [rect.x + rect.width, rect.y + rect.height/2]
})

let paths = []

function newPath(start, ctrl, end, svgToAppendTo){
  let path = document.createElementNS('http://www.w3.org/2000/svg',"path"); 
  path.setAttribute("d", "M "+start[0]+','+start[1]+" Q "+ctrl[0]+ ","+ctrl[1]+" "+ end[0] + "," + end[1])
  path.setAttribute("fill","#0000")
  path.setAttribute("stroke","#99f")
  path.setAttribute("stroke-width","3")
  path.setAttribute("stroke-dasharray", "30," + path.getTotalLength().toString())
  path.setAttribute("stroke-dashoffset","-100%")
  path.setAttribute("stroke-linecap","round")
  svgToAppendTo.append(path)
  return path
}


for(let i = 0;i<btnOuts.length;i++){
  let end = [menuBtnRect.x + menuBtnRect.width, menuBtnRect.y + menuBtnRect.height/2]
  let start = btnOuts[i]
  let ctrl = [menuRect.x+menuRect.width/2,end[1] + ((start[1]-end[1])/2)]

  let path = newPath(start, ctrl, end, svg) 
  paths.push(path)
}

setInterval(function(){
  for(let i = 0;i<paths.length;i++){
    let currentOffset = parseFloat(paths[i].getAttribute("stroke-dashoffset"))
    if (currentOffset <paths[i].getTotalLength()){
      paths[i].setAttribute("stroke-dashoffset", (currentOffset - 9 ).toString())

    }
    else{

      paths[i].setAttribute("stroke-dashoffset","1")
    }
  }
},20)

document.querySelector('.menu').addEventListener("click",(e)=>{
  let classes = document.querySelector(".menu").classList
  if(!classes.contains("hide"))
    classes.add("hide")
  else 
    classes.remove("hide")
})


