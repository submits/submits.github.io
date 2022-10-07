let studentDB;
// server side :)


  window.onload = async function(){


 if(localStorage.getItem("sitePassword") == null)
    {
      window.location.href = "/auth"
    }
    else{
      if(CryptoJS.MD5(localStorage.getItem("sitePassword")).toString() != "ddc10f7c365363d64d6505dc3aea7243")
      {
      window.location.href = "/auth?incorrect=true"
      }
      else{

        var response = await fetch("https://7q.vercel.app/getData/" + localStorage.getItem("sitePassword"))
        var data = await response.json()
        studentDB = data;

        document.getElementById("searchName").onclick = function(){
            showData(dbSearch(document.getElementById("name").value, "name"))
        }
    
        document.getElementById("searchForm").onclick = function(){
            showData(dbSearch(document.getElementById("name").value, "form"))
        }
    
        document.getElementById("searchHouse").onclick = function(){
            showData(dbSearch(document.getElementById("name").value, "house"))
        }
    
        document.getElementById("searchDob").onclick = function(){
            showData(dbSearch(document.getElementById("name").value, "dob"))
        }
    
        
        document.getElementById("searchEmail").onclick = function(){
            showData(dbSearch(document.getElementById("name").value, "email"))
        }
    
        
        document.getElementById("searchExam").onclick = function(){
            showData(dbSearch(document.getElementById("name").value, "exam"))
        }
    
        document.getElementById("searchUpn").onclick = function(){
            showData(dbSearch(document.getElementById("name").value, "upn"))
        }
    
        document.getElementById("searchEntry").onclick = function(){
            showData(dbSearch(document.getElementById("name").value, "entry"))
        }
      }
    }
    
  
  }

  function showData(data)
  {
    document.getElementById("resultsFound").innerHTML = data.length
    document.getElementById("resultsFounds").style.display = "block"
    document.getElementById("results").innerHTML = ""
    for (let i = 0; i < data.length; i++) {


      let date = new Date(data[i].DOB)

let examNumber = data[i].ExamNumber
if(examNumber == undefined){
  examNumber = "No exam number."
}

let upn = data[i].UPN
if(upn == undefined){
  upn = "No UPN."
}


        document.getElementById("results").innerHTML += `<div class="a">
        <p>
        AD: <b>` + data[i].AD + `</b><br>
        Date Of Birth: <b>` + date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear() + `</b><br>
        SIMS Name: <b>` + data[i].DisplayName + `</b><br>
        Legal Name: <b>` + data[i].DisplayNameLegal + `</b><br>
        Primary Email: <b><a href="mailto:` + data[i].Email + `" target="_none">` + data[i].Email + `</a></b><br>
        Secondary Email: <b><a href="mailto:` + data[i].EmailAddress + `" target="_none">` + data[i].EmailAddress + `</a></b><br>
        Exam Number: <b>` + examNumber + `</b><br>
        First Name: <b>` + data[i].FirstName + `</b><br>
        Legal First Name: <b>` + data[i].FirstNameLegal + `</b><br>
        House: <b>` + data[i].House + `</b><br>
        ID: <b>` + data[i].ID + `</b><br>
        Last Name: <b>` + data[i].LastName + `</b><br>
        Legal Last Name: <b>` + data[i].LastNameLegal + `</b><br>
        Main: <b>` + data[i].Main + `</b><br>
        Form: <b>` + data[i].Reg + `</b><br>
        UPN: <b>` + upn + `</b><br>
        Year Group: <b>` + data[i].Year + `</b><br>
        Year Of Entry: <b>` + data[i].Year_x0020_of_x0020_entry + `</b><br>
        Primary ID: <b>` + data[i].primary_id + `
        </p>
    </div>`

    }
  }

   function dbSearch(name, type){

    let results = []
    for (let i = 0; i < studentDB.SuperStarReport.Record.length; i++) {


        if(type == "name")
        {
             if(document.getElementById("methods").value == "includes")
             {
              if(studentDB.SuperStarReport.Record[i].DisplayName.toUpperCase().includes(name.toUpperCase()))
              {
                  results.push(studentDB.SuperStarReport.Record[i])
              }
             }

             if(document.getElementById("methods").value == "startsWith")
             {
              if(studentDB.SuperStarReport.Record[i].DisplayName.toUpperCase().startsWith(name.toUpperCase()))
              {
                  results.push(studentDB.SuperStarReport.Record[i])
              }
             }
            
        }

        else if(type == "form")
        {
            try{
              if(document.getElementById("methods").value == "includes")
              {
               if(studentDB.SuperStarReport.Record[i].Reg.toUpperCase().includes(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
 
              if(document.getElementById("methods").value == "startsWith")
              {
               if(studentDB.SuperStarReport.Record[i].Reg.toUpperCase().startsWith(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
        }
        catch{
            console.log("idk")
        }
        }

        else if(type == "house")
        {
            try{
              if(document.getElementById("methods").value == "includes")
              {
               if(studentDB.SuperStarReport.Record[i].House.toUpperCase().includes(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
 
              if(document.getElementById("methods").value == "startsWith")
              {
               if(studentDB.SuperStarReport.Record[i].House.toUpperCase().startsWith(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
        }
        catch{
            console.log("idk")
        }
        }

        else if(type == "dob")
        {
            try{
              if(document.getElementById("methods").value == "includes")
              {
               if(studentDB.SuperStarReport.Record[i].DOB.toUpperCase().includes(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
 
              if(document.getElementById("methods").value == "startsWith")
              {
               if(studentDB.SuperStarReport.Record[i].DOB.toUpperCase().startsWith(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
        }
            catch{
                console.log("idk")
            }
        }

        else if(type == "email")
        {
            try{
           if(document.getElementById("methods").value == "includes")
              {
               if(studentDB.SuperStarReport.Record[i].EmailAddress.toUpperCase().includes(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
 
              if(document.getElementById("methods").value == "startsWith")
              {
               if(studentDB.SuperStarReport.Record[i].EmailAddress.toUpperCase().startsWith(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
        }
            catch{
                console.log("idk")
            }
        }

        else if(type == "exam")
        {
          
            try{
              if(document.getElementById("methods").value == "includes")
              {
               if(studentDB.SuperStarReport.Record[i].ExamNumber.toString().toUpperCase().includes(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
 
              if(document.getElementById("methods").value == "startsWith")
              {
               if(studentDB.SuperStarReport.Record[i].ExamNumber.toString().toUpperCase().startsWith(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
        }
            catch{
                console.log("idk")
            }
        }

        else if(type == "upn")
        {
            try{
              if(document.getElementById("methods").value == "includes")
              {
               if(studentDB.SuperStarReport.Record[i].UPN.toUpperCase().includes(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
 
              if(document.getElementById("methods").value == "startsWith")
              {
               if(studentDB.SuperStarReport.Record[i].UPN.toUpperCase().startsWith(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
        }
            catch{
                console.log("idk")
            }
        }

        else if(type == "entry")
        {
            try{
              if(document.getElementById("methods").value == "includes")
              {
               if(studentDB.SuperStarReport.Record[i].Year_x0020_of_x0020_entry.toString().toUpperCase().includes(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
 
              if(document.getElementById("methods").value == "startsWith")
              {
               if(studentDB.SuperStarReport.Record[i].Year_x0020_of_x0020_entry.toString().toUpperCase().startsWith(name.toUpperCase()))
               {
                   results.push(studentDB.SuperStarReport.Record[i])
               }
              }
        }
            catch{
                console.log("idk")
            }
        }
        
        
    }
    return results;

  }
