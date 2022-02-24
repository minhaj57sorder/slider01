let image = document.getElementsByClassName('Images');
let slidImages = document.querySelector('.slidImages');
let previousBtn = document.getElementById('previousBtn');
let nextBtn = document.getElementById('nextBtn');
let btnCont = document.querySelectorAll('.btnCont button');
let moveBy = slidImages.offsetWidth;
let totalWidhtOfSlider = (moveBy * (image.length-1));
let endWidth = (moveBy * (image.length-2));
let isStatic = true;
slidImages.style.transition = "1s ease-out";

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
  }else if( -1*getTranslateX() == totalWidhtOfSlider ){
    // Hide next btn for last image
    nextBtn.style.visibility = "hidden";
    previousBtn.style.visibility = "visible";
  }else{
    nextBtn.style.visibility = "visible";
    previousBtn.style.visibility = "visible";
  }
}
hideBtn();

slidImages.ontransitionrun = ()=>{
  isStatic = false;
}
slidImages.ontransitionend = ()=>{
  isStatic = true;
  hideBtn();
}

nextBtn.onclick = ()=> {
  if( isStatic && -1*getTranslateX() <= endWidth ){
    slidImages.style.transform += "translateX(-"+ moveBy +"px)";
  }
}
previousBtn.onclick = ()=> {
  if( isStatic && getTranslateX() < 0 ){
    slidImages.style.transform += "translateX("+ moveBy +"px)";
  }
}

setInterval(()=>{
  if( -1*getTranslateX() >= totalWidhtOfSlider ){
    slidImages.style.transform = "translateX( 0px)";

  }else{
    slidImages.style.transform += "translateX(-"+ moveBy +"px)"
  }
},2000)
