/* fetch('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=616CF48C2A8F113FF7C87EB9B0AC8950&steamids=76561198202138235')
  .then(function(response) {
    response.json()
  .then(function(data) {
    console.log(data.response.response.players[0].personaname);
  });

})
 */
let queryString = 'http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=616CF48C2A8F113FF7C87EB9B0AC8950&steamids=76561198202138235'

    //http GET Request
    var request = new XMLHttpRequest();
    request.open('GET', queryString, true);
    request.addEventListener("load", function() {
      if (request.status >= 200 && request.status < 400) {
        var response = JSON.parse(request.responseText); //JSON Object
        console.log(response);
        $('#avatar').attr('src', response.response.players[0].avatarfull)
        $('#nickname').append(response.response.players[0].personaname)
        $('#dono').append('Nome Real: ' + response.response.players[0].realname)
        if(response.response.players[0].personastate === 0){
            $('#status').append('Offline')
        }
        if(response.response.players[0].personastate === 1){
            $('#status').append('Online')
        }
        //0 - Offline, 1 - Online, 2 - Busy, 3 - Away, 4 - Snooze, 5 - looking to trade, 6 - looking to play
        //console.log(response); //Console Print (F12)
      } else {
        console.log("Error in network request: " + request.statusText);
      }
    });
    request.send();

    let queryString2 = 'http://api.steampowered.com/ISteamUserStats/GetPlayerAchievements/v0001/?appid=730&key=616CF48C2A8F113FF7C87EB9B0AC8950&steamid=76561198202138235&l=portuguese'
    var request2 = new XMLHttpRequest();
    request2.open('GET', queryString2, true);
    request2.addEventListener("load", function() {
      if (request2.status >= 200 && request2.status < 400) {
        var response2 = JSON.parse(request2.responseText); //JSON Object
        console.log(response2);
        
            for(let conquista in response2.playerstats.achievements){
                $('#conquistas').append(`<p>${response2.playerstats.achievements[conquista].name} - ${response2.playerstats.achievements[conquista].description} </p>`)
            }
        
        
      } else {
        console.log("Error in network request: " + request2.statusText);
      }
    });
    request2.send();

  