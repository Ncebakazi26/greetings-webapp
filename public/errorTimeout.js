document.addEventListener('DOMContentLoaded', function() {
let errorElem = document.querySelector('.Error')
let reloadElem = document.querySelector('.button')
if(errorElem!==""){
    setTimeout(()=>{
        errorElem.innerHTML ='' 
    },2000)
}
reloadElem.addEventListener(click, function(){
reloadElem.innerHTML = "Page have been reloaded"
})



});