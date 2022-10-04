
const drumBtn = document.querySelectorAll(".drum");
console.log(drumBtn);
for (let i = 0; i < drumBtn.length; i++) {
    
    drumBtn[i].addEventListener("click", function(e) {
        console.log(e);
        makeSound(e.target.innerHTML);
    });
}

document.addEventListener("keypress", function(e) {
    makeSound(e.key);
});

function makeSound(key) {
    const drum = document.querySelector("." + key);

    if (drum) {

        const fileName = getComputedStyle(drum).backgroundImage.split("/").pop().split(".").shift();
        
        const audioSrc = "./sounds/"+fileName+".mp3";

        const sound = new Audio(audioSrc);
        sound.play();

        drum.classList.add("pressed");
        delay(()=> { drum.classList.remove("pressed"); }, 100);
    
    } else {
        console.log("Not a drum key!!");
    }

}

const delay = (function() {
    let timer = 0;
    return function(callback, ms) {
       clearTimeout(timer);
       timer = setTimeout(callback, ms);
    }
})();
   