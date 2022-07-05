let selectedpixel = null
let clientPixels = []
let ws = null


window.onload = function(){

    populateGrid(50)
    connect()



    document.getElementById("place").onclick = async function(){

        let fixedselectedpixel = selectedpixel
    

        if(fixedselectedpixel == null)
        {
            alert("Please select a pixel!")
        }
        else{
            let newTime = new Date();
            var response = await fetch("https://r-place-backend.vercel.app/updatepixel/1?pos=" + fixedselectedpixel + "&colour=" + document.getElementById("colour").value.toString().replace(/#/g, ""))
            const data = await response.json()
            ws.send(JSON.stringify({type: "PIXEL_UPDATE", pos: fixedselectedpixel, colour: document.getElementById("colour").value, timestamp: newTime.toUTCString()}))
            alert("Placed successfully!")
            }
    }

    document.getElementById("cancel").onclick = async function(){
        selectedpixel = null
        document.getElementById("selectedPixelColour").innerText = "None"
        document.getElementById("selectedPixel").innerText = "None"

for (let i = 0; i < document.getElementById("grid").children.length; i++) {
    if(i != selectedpixel && document.getElementById(i).classList.value == "pixel selected")
    {
        document.getElementById(i).classList.remove("selected")
        document.getElementById(i).style.border = "1px solid black"

         let index = clientPixels.findIndex(function(item, z) {
        return item.pos === i.toString()
      });

        if(index != -1)
        {
            document.getElementById(i).style.backgroundColor = "#" + clientPixels[index].colour
        }
        else{
document.getElementById(i).style.backgroundColor = "white"
        }
        
        
    }

    }
}


    document.getElementById("colour").addEventListener("input", function() {
        

        if(selectedpixel != null)
        {
            document.getElementById(selectedpixel.toString()).style.backgroundColor = this.value
        }
        
      })
   

}



function connect() {
    ws = new WebSocket("wss://r-place.absq.repl.co", "packrunner");
   ws.onmessage = messageHandler;
   ws.onclose = connect;
   ws.onopen = open;
   }

function open(){
    document.getElementById("loadingScreen").style.display = "none"
}


function messageHandler(msg){

let json = JSON.parse(msg.data)

switch(json.type){
    case "PIXEL_UPDATE":

        document.getElementById(json.pos).style.backgroundColor = json.colour
        
        let index = clientPixels.findIndex(function(item, z) {
            return item.pos === json.pos.toString()
          });
    
          if (index == -1) {
            clientPixels.push({ timestamp: json.timestamp, pos: json.pos.toString(), colour: json.colour })
    
          }
          else {
            clientPixels[index] = { timestamp: json.timestamp, pos: json.pos.toString(), colour: json.colour }
    
          }
          
}

}





async function populateGrid(amount){

var response = await fetch("https://r-place-backend.vercel.app/getpixels/1")
const data = await response.json()
clientPixels = data.pixels

    document.getElementById("grid").innerHTML = ""
document.getElementById("grid").style.setProperty('--size', amount)
for (let i = 0; i < amount * amount; i++) {


  
    let div = document.createElement('div')
    div.id = i
    div.classList.add('pixel')
    div.addEventListener('click', function(){

        highlight(i)
    })


    if(i == selectedpixel){
      div.style.backgroundColor = document.getElementById("colour").value
    }
    let index = data.pixels.findIndex(function(item, z) {
        return item.pos === i.toString()
      });


      if(index != -1){
          div.style.backgroundColor = "#" + data.pixels[index].colour
      }

      

      

    document.getElementById("grid").appendChild(div)
  

}
}




function highlight(pos){

selectedpixel = pos
let colour = document.getElementById(selectedpixel.toString()).style.backgroundColor
if(colour == "")
{
    colour = "None"
}
document.getElementById("selectedPixelColour").innerText = colour


for (let i = 0; i < document.getElementById("grid").children.length; i++) {
    if(i != selectedpixel && document.getElementById(i).classList.value == "pixel selected")
    {
        document.getElementById(i).classList.remove("selected")
        document.getElementById(i).style.border = "1px solid black"

         let index = clientPixels.findIndex(function(item, z) {
        return item.pos === i.toString()
      });

        if(index != -1)
        {
            document.getElementById(i).style.backgroundColor = "#" + clientPixels[index].colour
        }
        else{
document.getElementById(i).style.backgroundColor = "white"
        }
        
        
    }
}


document.getElementById(selectedpixel.toString()).classList.add("selected")
document.getElementById(selectedpixel.toString()).style.backgroundColor = document.getElementById("colour").value
document.getElementById(selectedpixel.toString()).style.border = "1px solid white"
document.getElementById("selectedPixel").innerText = selectedpixel





}



