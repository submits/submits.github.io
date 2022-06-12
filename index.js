let ids = ["https://z.zz.fo/UQvMT.mp3",
"https://z.zz.fo/cL8oq.mp3",
"https://z.zz.fo/FhgVO.mp3",
 ]

 function sleep(milisec) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('')
        }, milisec);
    })
}


window.onload = async function(){
    document.getElementById("audio").src = ids[Math.floor(Math.random()*ids.length)]
    document.getElementById("audioAlert").style.display = "block"
    document.getElementById("interactionButton").onclick = function(){
        document.getElementById("audioAlert").style.display = "none"
        document.getElementById("audio").play()
        document.getElementById("audio").volume = 0.05
        document.getElementById("name").classList.add("animationClass")
        document.getElementById("name").classList.add("animationClass")
        document.getElementById("description").classList.add("rgbTextClass")
        document.getElementById("name").classList.add("rgbTextClass")
        document.getElementById("tiktok").classList.add("rgbTextClass")
        document.getElementById("twitch").classList.add("rgbTextClass")
        document.getElementById("github").classList.add("rgbTextClass")
    }
}
