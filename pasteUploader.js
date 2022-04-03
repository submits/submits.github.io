var faunadb = window.faunadb
var q = faunadb.query
var client = new faunadb.Client({
  secret: 'fnAEjNKghaAAyCZZe7ZgA-O13nskfGnq5mrUaSCb',
  domain: 'db.eu.fauna.com',
  scheme: 'https',
})

function generateId(length) {
    var result           = '';
    var characters       = '0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

function uploadPaste(){

    if(document.getElementById("title").value == "" || document.getElementById("content").value == "")
    {
      alert("Please enter a title and content!")
  
    }
    else{
      
      let date = new Date();

      const dateTimeFormat = new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

      client.query(
          q.Create(
            q.Collection('pastes'),
            { data: {id: generateId(6), title: document.getElementById("title").value, content: document.getElementById("content").value, timestamp: dateTimeFormat.format(date), pinned: false, views: 0} },
          )
        )
        .then(function(ret){
        
      
         document.getElementById("pastes").innerHTML = `<label>` + ret.data.title + ` - <a target="_blank" href="p.html?id=` + ret.data.id + `">https://absq.xyz/p?id=` + ret.data.id + `</a></label><br>` + document.getElementById("pastes").innerHTML
            })
    }

}