var postTitleElement = document.querySelector('.post-title a').textContent;
const gameName = postTitleElement;

const requestOptions = {
  method: 'POST',
  headers: {
    'Client-ID': 'key',
    'Authorization': 'Bearer secret',
  },
  body: `fields age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites; where name = "${gameName}";`,
};

fetch('https://cors-anywhere.herokuapp.com/https://api.igdb.com/v4/games', requestOptions)
  .then(response => response.json())
  .then(data => {
    // Process the received data here
    displayData(data);
  })
  .catch(error => {
    console.error(error);
  });

function displayData(data) {
  // Get a reference to the HTML element where you want to display the data
  const resultElement = document.getElementById('result');

  // Create HTML elements to display the data
  const gameNameElement = document.createElement('h2');
  gameNameElement.textContent = data[0].name;

  const summaryElement = document.createElement('p');
  summaryElement.textContent = data[0].summary;

  // Append the elements to the result element
  resultElement.appendChild(gameNameElement);
  resultElement.appendChild(summaryElement);
}
