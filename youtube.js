// ====== YOUTUBE ======
function start(){
  // 2. Initialise the Javascript client library.
  gapi.client.init({
    'apiKey': 'AIzaSyBgZKpd7ZZg0At28xQzjQ3WE0QEu_oALys'
  }).then(function(){
    var search = document.getElementById("search").value;
    var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + search + '&maxResults=6&type=video&videoEmbeddable=true';
    // 3. Initialise and make the API request.
    return gapi.client.request({
      'path': url,
    });
  }).then(function(response){
    console.log(response.result);

    var mainVid = document.getElementById("mainVid");
    mainVid.setAttribute("src", "https://www.youtube.com/embed/" +  response.result.items[0].id.videoId);
    document.getElementById("result").innerHTML = response.result.items[0].snippet.title;

    // loop through results array and create thumbnails for each
    var searchResults = response.result.items;
    var resultsList = document.createElement("div");
    resultsList.setAttribute("id", "resultsList");

    for (i = 0; i < searchResults.length; i++) {
      var videoTitle = response.result.items[i].snippet.title;
      var channelTitle = response.result.items[i].snippet.channelTitle;
      var imgURL = response.result.items[i].snippet.thumbnails.default.url;
      var videoID = response.result.items[i].id.videoId;


      var resultsThumbnails = document.createElement("div");
      resultsThumbnails.className = "resultsThumbnails";
      resultsThumbnails.innerHTML = "<img class=\"thumbnail\" src=\"" + imgURL + "\" alt=\"result thumbnail\">" +
      "<div id=\"vidDetails\">" +
        "<p class=\"title\">" + videoTitle + "</p>" +
        "<p class=\"channelTitle\">" + channelTitle + "</p>";
        resultsThumbnails.setAttribute("onclick", "select(\"" + videoID + "\",\"" + videoTitle + "\")");
        resultsList.appendChild(resultsThumbnails);
        document.getElementById("resultsContainer").appendChild(resultsList);
    }
  }, function(reason){
    console.log('Error: ' + reason.result.error.message);
    document.getElementById("result").innerHTML = 'Error: ' + reason.result.error.message;
  });
}

function select(videoID, videoTitle) {
  var mainVidSelect = document.getElementById("mainVid");
  mainVidSelect.setAttribute("src", "https://www.youtube.com/embed/" + videoID);

  document.getElementById("result").innerHTML = videoTitle;
}
// Remove existing results from previous search
function newSearch(){
  document.getElementById("resultsContainer").innerHTML = "";
  start();
}

gapi.load('client', start);
