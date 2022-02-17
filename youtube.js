// ====== YOUTUBE ======
function start(id){

    var videoid;

    if (typeof id == 'undefined') {
      videoid = "Kt-tLuszKBA";
    } else {
      videoid = id;
    }

  // 2. Initialise the Javascript client library.
  gapi.client.init({
    'apiKey': 'AIzaSyA3Tswr1mFOlEHLK4xPxQfHYaeQaV6nS8Q'
  }).then(function(){

      var url = 'https://www.googleapis.com/youtube/v3/videos?part=snippet&id=' + videoid ;

    // 3. Initialise and make the API request.
    return gapi.client.request({

      'path': url,

    });
  }).then(function(response){

      var mainVid = document.getElementById("mainVid");

      mainVid.setAttribute("src", "https://www.youtube.com/embed/" +  response.result.items[0].id);
      document.getElementById("result").innerHTML = response.result.items[0].snippet.title;

  }, function(reason){

      console.log('Error: ' + reason.result.error.message);
      document.getElementById("result").innerHTML = 'Error: ' + reason.result.error.message;

  });
}

function changeDecade(decade){

  switch (decade){

    case 50:
    id = "5LmppKojtWI";
    break;

    case 60:
    id = "WStvRDdxdWY";
    break;

    case 70:
    id = "5_-DqyiBng0";
    break;

    case 80:
    id = "c40SjIZEfcg";
    break;

    case 90:
    id = "AuIKwMGsNlU";
    break;

    case 00:
    id = "S4bqUlpnF20";
    break;

    case 2010:
    id = "nRYTrpQHJJk";
    break;

    case 2020:
    id = "mnc9pvuvSuk";
    break;

    default:
    id = "Kt-tLuszKBA";
  }
  start(id);
}

gapi.load('client', start);
