let imbbtn = document.querySelectorAll('.imbbtn');
let btn1 = document.querySelector('.btn1');
let slidImages = document.querySelector('.slidImages');
let sliderBox = document.querySelector('.sliderBox');
let previousBtn = document.querySelector('.previousBtn');
let nextBtn = document.querySelector('.nextBtn');
let movedBy = slidImages.clientWidth;
let totalWidth = movedBy * (imbbtn.length)
let endWidth = movedBy * (imbbtn.length-2)
let isRunnign = false;
slidImages.style.transition = "0.5s ease-out";
// console.log(totalWidth)

function getTranslateX() {
  var style = window.getComputedStyle(slidImages);
  var matrix = new WebKitCSSMatrix(style.transform);
  return matrix.m41;
  // console.log('translateX: ', matrix.m41);
}

let hideBtn = ()=>{
  if( getTranslateX() == 0 ){
    // Hide Previous button for first Images
    nextBtn.style.visibility = "visible";
    previousBtn.style.visibility = "hidden";
  }else if( -1*getTranslateX() == totalWidth-movedBy ){
    // Hide next btn for last image
    nextBtn.style.visibility = "hidden";
    previousBtn.style.visibility = "visible";
  }else{
    nextBtn.style.visibility = "visible";
    previousBtn.style.visibility = "visible";
  }
}
hideBtn();

let activeImagIndex = ()=> -1*getTranslateX()/movedBy ;
let active = ()=>{
      let e = imbbtn[activeImagIndex()];
      let x =  e.getAttribute('value');
      if(activeImagIndex() == x){
        e.style.transition = "0.3s ease-out";
        e.style.backgroundColor = "#000000";
        e.style.border = "3px solid #ffffff"
      }
}
active();
slidImages.ontransitionrun = ()=>{
  isRunnign = true;
}
slidImages.ontransitionstart = ()=>{
    for(var e of imbbtn) {
    e.style.backgroundColor = "#ffffff";
    e.style.border = "3px solid #000000"
  };
}
slidImages.ontransitionend = ()=>{
  isRunnign = false;
  // console.log(activeImagIndex())
  active();
  hideBtn();
}

let next = ()=>{
      nextBtn.onclick = ()=>{
        if(!isRunnign && -1*getTranslateX() <= endWidth) {
          slidImages.style.transform += "translateX(-"+ movedBy +"px)";
        }
      // console.log(activeImagIndex())
      }
}
let prev = ()=>{
    previousBtn.onclick = ()=>{
      if(!isRunnign && -1*getTranslateX() > 0){
      slidImages.style.transform += "translateX("+ movedBy +"px)";
    }
    // console.log(activeImagIndex())
    }
}

let click = (e)=>{
  e.onclick = ()=>{
    let value = e.getAttribute('value');
    slidImages.style.transform = "translateX(-"+ value*movedBy +"px)";
    // console.log(value)
  }
}
next()
prev()

for(var e of imbbtn) {
     // console.log(e)
  click(e);
 };


// console.log(getTranslateX()%500 )

setInterval(()=>{
  if( -1*getTranslateX() >= totalWidth-movedBy ){
    slidImages.style.transform = "translateX( 0px)";

  }else{
    slidImages.style.transform += "translateX(-"+ movedBy +"px)"
  }
},2000)
