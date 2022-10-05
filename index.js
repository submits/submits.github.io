let studentDB;
// server side :)


  window.onload = async function(){


 if(localStorage.getItem("sitePassword") == null)
    {
      window.location.href = "/auth"
    }
    else{
      if(CryptoJS.MD5(localStorage.getItem("sitePassword")).toString() != "0762ee587976f941fc791eef8a3b609a")
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
    document.getElementById("results").innerHTML = ""
    for (let i = 0; i < data.length; i++) {

        document.getElementById("results").innerHTML += `<div class="a">
        <p>
        AD: <b>` + data[i].AD + `</b><br>
        DOB: <b>` + data[i].DOB + `</b><br>
        DisplayName: <b>` + data[i].DisplayName + `</b><br>
        DisplayNameLegal: <b>` + data[i].DisplayNameLegal + `</b><br>
        Email: <b>` + data[i].Email + `</b><br>
        EmailAddress: <b>` + data[i].EmailAddress + `</b><br>
        ExamNumber: <b>` + data[i].ExamNumber + `</b><br>
        FirstName: <b>` + data[i].FirstName + `</b><br>
        FirstNameLegal: <b>` + data[i].FirstNameLegal + `</b><br>
        House: <b>` + data[i].House + `</b><br>
        ID: <b>` + data[i].ID + `</b><br>
        LastName: <b>` + data[i].LastName + `</b><br>
        LastNameLegal: <b>` + data[i].LastNameLegal + `</b><br>
        Main: <b>` + data[i].Main + `</b><br>
        Reg: <b>` + data[i].Reg + `</b><br>
        UPN: <b>` + data[i].UPN + `</b><br>
        Year: <b>` + data[i].Year + `</b><br>
        Year_x0020_of_x0020_entry: <b>` + data[i].Year_x0020_of_x0020_entry + `</b><br>
        primary_id: <b>` + data[i].primary_id + `
        </p>
    </div>`

    }
  }

  function dbSearch(name, type){

    let results = []
    for (let i = 0; i < studentDB.SuperStarReport.Record.length; i++) {


        if(type == "name")
        {
            if(studentDB.SuperStarReport.Record[i].DisplayName.toUpperCase().startsWith(name.toUpperCase()))
            {
                results.push(studentDB.SuperStarReport.Record[i])
            }
        }

        else if(type == "form")
        {
            try{
            if(studentDB.SuperStarReport.Record[i].Reg.toUpperCase().startsWith(name.toUpperCase()))
            {
                results.push(studentDB.SuperStarReport.Record[i])
            }
        }
        catch{
            console.log("idk")
        }
        }

        else if(type == "house")
        {
            try{
            if(studentDB.SuperStarReport.Record[i].House.toUpperCase().startsWith(name.toUpperCase()))
            {
                results.push(studentDB.SuperStarReport.Record[i])
            }
        }
        catch{
             console.log("Selected student has no data!")
        }
        }

        else if(type == "dob")
        {
            try{
            if(studentDB.SuperStarReport.Record[i].DOB.toUpperCase().startsWith(name.toUpperCase()))
            {
                results.push(studentDB.SuperStarReport.Record[i])
            }
        }
            catch{
                 console.log("Selected student has no data!")
            }
        }

        else if(type == "email")
        {
            try{
            if(studentDB.SuperStarReport.Record[i].EmailAddress.toUpperCase().startsWith(name.toUpperCase()))
            {
                results.push(studentDB.SuperStarReport.Record[i])
            }
        }
            catch{
                 console.log("Selected student has no data!")
            }
        }

        else if(type == "exam")
        {
            try{
            if(studentDB.SuperStarReport.Record[i].ExamNumber.toString().toUpperCase().startsWith(name.toUpperCase()))
            {
                results.push(studentDB.SuperStarReport.Record[i])
            }
        }
            catch{
                 console.log("Selected student has no data!")
            }
        }

        else if(type == "upn")
        {
            try{
            if(studentDB.SuperStarReport.Record[i].UPN.toUpperCase().startsWith(name.toUpperCase()))
            {
                results.push(studentDB.SuperStarReport.Record[i])
            }
        }
            catch{
                 console.log("Selected student has no data!")
            }
        }

        else if(type == "entry")
        {
            try{
            if(studentDB.SuperStarReport.Record[i].Year_x0020_of_x0020_entry.toString().toUpperCase().startsWith(name.toUpperCase()))
            {
                results.push(studentDB.SuperStarReport.Record[i])
            }
        }
            catch{
                console.log("Selected student has no data!")
            }
        }
        
        
    }
    return results;

  }
