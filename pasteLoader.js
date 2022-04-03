var faunadb = window.faunadb
var q = faunadb.query
var client = new faunadb.Client({
  secret: 'fnAEjNKghaAAyCZZe7ZgA-O13nskfGnq5mrUaSCb',
  domain: 'db.eu.fauna.com',
  scheme: 'https',
})

window.addEventListener('load', function(event) {

    let allTable = ""
    let pinnedTable = ""
    client
    .query(
      q.Map(
        q.Paginate(q.Documents(q.Collection("pastes")), { size: 1000 }),
        q.Lambda("X", q.Get(q.Var("X")))
      )
    )
    .then(function (x) {
        x.data.reverse()
        for (let i = 0; i < x.data.length; i++) {
        if(x.data[i].data.pinned == true)
        {
            pinnedTable += `
            <tr>
              <td style="width:70%"><a target="_blank" href="p.html?id=` + x.data[i].data.id + `" class="link">` + x.data[i].data.title.replace(/</g, "").replace(/>/g, "") + `</a></td>
              <td style="width: 20%;">` +  x.data[i].data.timestamp + `</td>
              <td style="width: 10%;">` +  x.data[i].data.views + `</td>
              </tr>`
        }
        else if(x.data[i].data.pinned == false)
        {
            allTable += `
            <tr>
              <td style="width:70%"><a target="_blank" href="p.html?id=` + x.data[i].data.id + `" class="link">` + x.data[i].data.title + `</a></td>
              <td style="width: 20%;">` +  x.data[i].data.timestamp + `</td>
              <td style="width: 10%;">` +  x.data[i].data.views + `</td>
              </tr>`
        }
        else{
            console.log("Unknown")
        }
    }

    this.document.getElementById("allTable").innerHTML = ` <tr style="border-bottom: solid 2px gray;">
    <th style="width:70%" >Title</th>
    <th  style="width: 20%;">Date</th>
    <th  style="width: 10%;">Views</th>
    </tr>` + allTable

    this.document.getElementById("pinnedTable").innerHTML = ` <tr style="border-bottom: solid 2px gray;">
    <th style="width:70%" >Title</th>
    <th  style="width: 20%;">Date</th>
    <th  style="width: 10%;">Views</th>
    </tr>` + pinnedTable

    });

    


})


function redir(){
    window.location.href = "upload.html"
}
