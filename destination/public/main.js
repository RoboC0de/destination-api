// Foursquare API Info
const clientId = "PP3X3LMAXL4LQKWRRF2045QG251OW3PQHANX5QWG3EKEDZQU";
const clientSecret = "JYF0C2YJEFX51J4FQC4WZZXUL2OUHUTQC4NNM31POS4QNISN";
const url = "https://api.foursquare.com/v2/venues/explore?near=";

// APIXU Info
const apiKey = "531fdf188c87436e83f170501192507   ";
const forecastUrl = "https://api.apixu.com/v1/forecast.json?key=";

// Page Elements
const $input = $("#city");
const $submit = $("#button");
const $destination = $("#destination");
const $container = $(".container");
const $venueDivs = [$("#venue1"), $("#venue2"), $("#venue3"), $("#venue4")];
const $weatherDivs = [
  $("#weather1"),
  $("#weather2"),
  $("#weather3"),
  $("#weather4")
];
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

// Add AJAX functions here:
const getVenues = async () => {
  const city = $input.val();
  const urlToFetch = `${url}${city}&limit=10&client_id=${clientId}&client_secret=${clientSecret}&v=20190725`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      console.log(response);
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const venues = jsonResponse.response.groups[0].items.map(
        item => item.venue
      );
      console.log(venues);
      return venues;
    } else {
      throw new Error("Request failed!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

const getForecast = async () => {
  const urlToFetch = `${forecastUrl}${apiKey}&q=${$input.val()}&days=4&hour=12`;
  try {
    const response = await fetch(urlToFetch);
    if (response.ok) {
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const days = jsonResponse.forecast.forecastday;
      return days;
    } else {
      throw new Error("Request failed!");
    }
  } catch (error) {
    console.log(error.message);
  }
};

// Render functions
const renderVenues = venues => {
  $venueDivs.forEach(($venue, index) => {
    // Add your code here:
    const venue = venues[index];
    const venueIcon = venue.categories[0].icon;
    const venueImgSrc = `${venueIcon.prefix}bg_64${venueIcon.suffix}`;

    let venueContent = createVenueHTML(venue.name, venue.location, venueImgSrc);
    $venue.append(venueContent);
  });
  $destination.append(`<h2>${venues[0].location.city}</h2>`);
};

const renderForecast = days => {
  $weatherDivs.forEach(($day, index) => {
    // Add your code here:
    const currentDay = days[index];

    let weatherContent = createWeatherHTML(currentDay);
    $day.append(weatherContent);
  });
};

const executeSearch = () => {
  $venueDivs.forEach(venue => venue.empty());
  $weatherDivs.forEach(day => day.empty());
  $destination.empty();
  $container.css("visibility", "visible");
  getVenues().then(venues => renderVenues(venues));
  getForecast().then(forecast => renderForecast(forecast));
  return false;
};

$submit.click(executeSearch);
