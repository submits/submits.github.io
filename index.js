window.onload = function(){
    var file = document.getElementById("actual-btn");
    let text = ""
file.addEventListener('change', function () {

let reader = new FileReader();
reader.onload = function(e) {
text = reader.result
if(file.files[0].name.split('.').pop() != "html")
{
    alert("Please select a .html file.")
}
else{
document.getElementById("fileInfo").style.display = "block"
document.getElementById("result").style.display = "none"
document.getElementById("selected").innerText = file.files[0].name
document.getElementById("hostButton").disabled = false
document.getElementById("hostButton").style.cursor = "pointer"
document.getElementById("hostButton").style.color = "white"
    document.getElementById("hostButton").innerText = "Host"
    document.getElementById("meta-title").value = ""
    document.getElementById("meta-title").value = ""
    
    let parser = new DOMParser();
const doc = parser.parseFromString(text, 'text/html');
try{
    document.getElementById("meta-title").value = doc.querySelector('meta[property="og:title"]').content;
}
catch{
    console.log("No title detected.")
}

try{
    document.getElementById("meta-title").value = doc.querySelector('meta[property="og:description"]').content;
}
catch{
    console.log("No description detected.")
}
}

}
reader.readAsText(file.files[0]);

});

document.getElementById("hostButton").onclick = async function(){

    if(document.getElementById("meta-title").value != "")
    {
        text +=  `<meta property="og:title" content="` + document.getElementById("meta-title").value + `"></meta>`
    }

    if(document.getElementById("meta-title").value != "")
    {
        text +=  `<meta property="og:description" content="` + document.getElementById("meta-description").value + `"></meta>`
    }

    var response = await fetch("https://vs.vercel.app/upload?file=" + escape(text))
    const data = await response.json()
    document.getElementById("result").style.display = "block"
    document.getElementById("href").href = "https://vs.now.sh/" + data.file
    document.getElementById("href").innerText = "vs.now.sh/" + data.file
    document.getElementById("hostButton").disabled = true
    document.getElementById("hostButton").style.cursor = "not-allowed"
document.getElementById("hostButton").style.color = "gray"
    document.getElementById("hostButton").innerText = "Already Hosted"
}

}
