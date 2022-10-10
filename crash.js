window.onload = async function(){
    var response = await fetch("https://api.bloxflip.com/games/crash")
    var data = await response.json()
    console.log(data)
    document.getElementById("stats").innerHTML = ""
    let profitableGames = 0
    for (let i = 0; i< data.history.length; i++) {
        let playersProfited = 0
        let players = ``
        for (let j = 0; j < data.history[i].players.length; j++) {
            let cashout = data.history[i].players[j].stoppedAt
            if(cashout == -1)
            {
                cashout = "None"

            }
            else{
                playersProfited += 1
                cashout = data.history[i].players[j].stoppedAt / 100 + "x"
            }
            let profit = (Math.round((data.history[i].players[j].winningAmount - data.history[i].players[j].betAmount) * 100) / 100)
            if(profit < 0.01)
            {
                players +=  ` <div class="userStats">
                <div class="wrapper">
                    <div class="left">
                        <img class="userImage" src="` + data.history[i].players[j].avatar + `">
                    </div>
                    <div class="right">
                        <label class="username">` + data.history[i].players[j].username + `</label>
                        <label class="betInfo">Cashed Out: <label class="info">` + cashout
 +                         `</label></label>
                        <label class="betInfo">Bet: <label class="info">` + data.history[i].players[j].betAmount + `</label></label>
                        <label class="betInfo">Won: <label class="info">` + data.history[i].players[j].winningAmount + `</label></label>
                        <label class="betInfo">Profit: <label class="info" style="color:red">` + profit + `</label></label>
                    </div>
                </div>
            </div>`
            }
            else{
                players +=  ` <div class="userStats">
                <div class="wrapper">
                    <div class="left">
                        <img class="userImage" src="` + data.history[i].players[j].avatar + `">
                    </div>
                    <div class="right">
                        <label class="username">` + data.history[i].players[j].username + `</label>
                        <label class="betInfo">Cashed Out: <label class="info">` + cashout
 +                         `</label></label>
                        <label class="betInfo">Bet: <label class="info">` + data.history[i].players[j].betAmount + `</label></label>
                        <label class="betInfo">Won: <label class="info">` + data.history[i].players[j].winningAmount + `</label></label>
                        <label class="betInfo">Profit: <label class="info" style="color:rgb(5, 211, 221)">+` + profit + `</label></label>
                    </div>
                </div>
            </div>`            

            }



               
        }

        players = `<details><summary class="ok2">Players <label style="font-weight:bold">[` + data.history[i].players.length + `]</label></summary><p style="display:block; margin-left: 100px">` + players + `</p></summary></details>`
        let percentage = ((playersProfited / data.history[i].players.length) * 100)
        if(percentage >= 50)
        {  
            profitableGames += 1
        }

        document.getElementById("stats").innerHTML += `<div class="gameDiv"><h2>Game ` + data.history[i]._id.split("-")[0] + `</h2><label class="ok">Created At: <label style="font-weight:bold">` + new Date(data.history[i].createdAt).toGMTString() + `</label></label>
        <label class="ok">Started At: <label style="font-weight:bold">` + new Date(data.history[i].startedAt).toGMTString() + `</label></label>
        <label class="ok">Crashed At: <label style="font-weight:bold; color:` + crashToColour(data.history[i].crashPoint) + `">` + data.history[i].crashPoint + `</label></label>
        <label class="ok3">Players Profited: <label style="font-weight:bold">` + playersProfited + `/` + data.history[i].players.length + ` <label style="color:` + percentageToColour(percentage) + `">` + (Math.round(percentage * 100) / 100) + `%</label></label></label><br><br>
        ` + players + `
        
        </div><br><br>`
    }

    document.getElementById("profitedGames").innerHTML = "<label style=\"font-weight:bold\">" + profitableGames + "<label style=\"color:" + percentageToColour(((profitableGames / data.history.length) * 100)) + "\"> " + (Math.round(((profitableGames / data.history.length) * 100) * 100) / 100) + "%</label></label>"
  //  document.getElementById("notprofitedGames").innerHTML = "<label style=\"font-weight:bold\">" + (data.history.length - profitableGames) + "<label style=\"color:" + percentageToColour((((data.history.length - profitableGames) / data.history.length) * 100)) + "\"> " + (Math.round((((data.history.length - profitableGames) / data.history.length) * 100) * 100) / 100) + "%</label></label>"

    if(profitableGames >= 0 && profitableGames < 20)
    {
        document.getElementById("advice").innerHTML = `<label><b>Payout less than usual</b></label>`
    }
    else if(profitableGames >= 20 && profitableGames < 25)
    {
        document.getElementById("advice").innerHTML = `<label><b>Payout is average</b></label>`
    }
    else if(profitableGames >= 25 && profitableGames < 30)
    {
        document.getElementById("advice").innerHTML = `<label><b>Payout is above average</b></label>`
    }

    else if(profitableGames >= 30 && profitableGames < 35)
    {
        document.getElementById("advice").innerHTML = `<label><b>Payout is well above average</b></label>`
    }
}


function percentageToColour(percentage)
{
    if(percentage >= 0 && percentage < 10)
    {
        return "#ff0000"
    }
    else if(percentage >= 10 && percentage < 20)
    {
        return "#fe4400"
    }
    else if(percentage >= 20 && percentage < 30)
    {
        return "#f86600"
    }
    else if(percentage >= 30 && percentage < 40)
    {
        return "#ee8200"
    }
    else if(percentage >= 40 && percentage < 50)
    {
        return "#df9b00"
    }
    else if(percentage >= 50 && percentage < 60)
    {
        return "#cdb200"
    }
    else if(percentage >= 60 && percentage < 70)
    {
        return "#b6c700"
    }
    else if(percentage >= 70 && percentage < 80)
    {
        return "#98db00"
    }
    else if(percentage >= 80 && percentage < 90)
    {
        return "#6fed00"
    }
    else if(percentage >= 90 && percentage <= 100)
    {
        return "#00ff00"
    }
}


function crashToColour(crash)
{
    if(crash >= 1 && crash < 1.10)
    {
        return "#ff0000"
    }
    else if(crash >= 1.10 && crash < 1.20)
    {
        return "#fe4400"
    }
    else if(crash >= 1.20 && crash < 1.50)
    {
        return "#f86600"
    }
    else if(crash >= 1.50 && crash < 1.70)
    {
        return "#ee8200"
    }
    else if(crash >= 1.70 && crash < 1.90)
    {
        return "#df9b00"
    }
    else if(crash >= 1.90 && crash < 2.10)
    {
        return "#cdb200"
    }
    else if(crash >= 2.10 && crash < 2.50)
    {
        return "#b6c700"
    }
    else if(crash >= 2.50 && crash < 5.00)
    {
        return "#98db00"
    }
    else if(crash >= 5.00 && crash < 50.00)
    {
        return "#6fed00"
    }
    else if(crash >= 50.00 && crash <= 100.00)
    {
        return "#00ff00"
    }
    else{

        return "#2712F4"

    }
}
