var faunadb = window.faunadb
var q = faunadb.query
var client = new faunadb.Client({
  secret: 'fnAEjNKghaAAyCZZe7ZgA-O13nskfGnq5mrUaSCb',
  domain: 'db.eu.fauna.com',
  scheme: 'https',
})

let urlParams = new URLSearchParams(window.location.search);



window.addEventListener('load', function(event) {

    client.query(
        q.Get(
          q.Match(q.Index('paste_by_id'), urlParams.get("id"))
        )
      )
            
      .then(function(ret) {
       

        let views = ret.data.views
        views += 1
        client.query(
          q.Update(q.Ref(q.Collection("pastes"), ret.ref.value.id), {
          data: {
            views: views
    
          },
          })
          ).then(function(ret){ 
          
            console.log(ret)
    
          })


        document.getElementById("title").innerText = ret.data.title
        document.getElementById("views").innerText = ret.data.views + 1
        document.getElementById("created").innerText = ret.data.timestamp
        document.getElementById("content").innerText = ret.data.content
        
    console.log(ret)

      })
      .catch(function(e){
       document.write(`<body style="text-align:center; width:50%; margin:auto; padding-top:50px; padding-bottom:50px; font-family:monospace"><h1>404</h1><hr><p>Not found.</p></body>`)
         console.error(e)
      });

      if(urlParams.get("theme") != null){
        if(urlParams.get("theme") == "dark"){
        document.body.style.backgroundColor = "black"
        document.body.style.color = "white"
        }
        }

})


function copyText(text){
    try{
    document.body.innerHTML += `<input value="` + text + `" style="display:none; width: 1px; height: 1px;" id="copyText">`
    var copyText = document.getElementById("copyText");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    document.getElementById("copyText").remove()
    }
    catch(e){
        alert("Unable to copy: " + e)
    }
    
}

function copy(){
    copyText(document.getElementById("content").innerText)
}