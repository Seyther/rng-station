var $lineDisplay = $('#lineDisplay');
var $nameDisplay_English = $('#nameDisplay_English');
var $nameDisplay_Hangul = $('#nameDisplay_Hangul');
var $nameDisplay_Location1 = $('#nameDisplay_Location1');
var $nameDisplay_LocationN = $('#nameDisplay_LocationN');

var $stationTextEnglish = $('#stationTextEnglish');
var $stationTextHangul = $('#stationTextHangul');

var $button_english_wikipedia = $('#button_english_wikipedia');
var $button_hangul_wikipedia = $('#button_hangul_wikipedia');

var station_name_hangul = "";
var station_name_english = "";

var station_name_hangul_url = "";
var station_name_english_url = "";

var subway_data;


function visitEnglishWikipedia() {
  window.open(station_name_english_url, '_blank');
}

function visitHangulWikipedia() {
  window.open(station_name_hangul_url, '_blank');
}

function disable_wikipedia_button(b) {
  b.css('background-color', 'lightgrey');
  b.css('color', 'white');
  b.prop('disabled', true);
}

function enable_wikipedia_button(b) {
  b.css('background-color', 'green');
  b.css('color', 'white');
  b.prop('disabled', false);
}

var onAnimStartHangulURL = function(e) {
  disable_wikipedia_button($button_hangul_wikipedia);
  $stationTextHangul.text('');
}

var onAnimStartEnglishURL = function(e) {
  disable_wikipedia_button($button_english_wikipedia);
  $stationTextEnglish.text('');
}

var onAnimEndHangulURL = function(e) {
  if (station_name_hangul_url) {
    enable_wikipedia_button($button_hangul_wikipedia);
    $stationTextHangul.text(station_name_hangul);
    return;
  }
  disable_wikipedia_button($button_hangul_wikipedia);
  $stationTextHangul.text('');
}

var onAnimEndEnglishURL = function(e) {
  if (station_name_english_url) {
    enable_wikipedia_button($button_english_wikipedia);
    $stationTextEnglish.text(station_name_english);
    return;
  }
  disable_wikipedia_button($button_english_wikipedia);
  $stationTextEnglish.text('');
}


// flapper digit width = 50
// flapper left margin = 4
// flapper spacing? = 4

var flapper_digit_width = Math.ceil(window.innerWidth / (50 + 4 + 4));
console.log('flapper_digit_width = ' + flapper_digit_width);

$lineDisplay.flapper({
  width: flapper_digit_width,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 500,
  min_timing: 250
});

$nameDisplay_English.flapper({
  width: flapper_digit_width,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 1000,
  min_timing: 150,
  on_anim_start: onAnimStartEnglishURL,
  on_anim_end: onAnimEndEnglishURL,
});

$nameDisplay_Hangul.flapper({
  width: flapper_digit_width,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 1000,
  min_timing: 150,
  on_anim_start: onAnimStartHangulURL,
  on_anim_end: onAnimEndHangulURL,
});

$nameDisplay_Location1.flapper({
  width: flapper_digit_width,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 1000,
  min_timing: 150,
});

$nameDisplay_LocationN.flapper({
  width: flapper_digit_width,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 1000,
  min_timing: 150,
});




function random(range) {
  return Math.floor(Math.random() * range);
}

function center(x) {
   let len = x.length;
   let pad = (flapper_digit_width - len) / 2;
   if (pad < 0) { pad = 0; }
   let padding = " ".repeat(pad);
   return padding + x;
}

async function bodyLoadFunction() {
  const response = await fetch('js/seoul-subway-stations.json');
  subway_data = await response.json();
  // console.log(subway_data);

  writeDisplay(
   {line:                 center("RNG STATION"),
    station_name_english: center("PUSH ROLL"),
    station_name_hangul:  center("!"),
    location_level_1:     center("!"),
    location_level_n:     center("V"),
    station_name_english_url: "",
    station_name_hangul_url: "" }
  );
}


function newpick() {
  let elements = document.getElementById("location-list-form").elements;
  const subset = [];

  for (let j = 0, element; element = elements[j]; j++) {
    if (! element.checked) {
      continue;
    }
    for (let i = 0; i < subway_data.length; i++) {
      if (! (subway_data[i].location_level_1 === element.value)) {
        continue;
      }
      subset.push(subway_data[i]);
    }
  }

  // console.log("subset = " + subset);

  if (subset.length == 0) {
    return { line: "",
    station_name_english_url: "",
    station_name_hangul_url: "",
    station_name_english: "  NO PLACES",
    station_name_hangul: "  ARE SELECTED",
    location_level_1: "",
    location_level_n: ""};
  };

  var id = random(subset.length);
  var station = subset[id];

  var x = { line: 'Line ' + station.subway_line,
    station_name_english_url: station.station_name_english_url,
    station_name_hangul_url: station.station_name_hangul_url,
    station_name_english: station.station_name_english,
    station_name_hangul: station.station_name_hangul,
    location_level_1: station.location_level_1,
    location_level_n: station.location_level_n
  };

  // console.log(x);

  return x;
}

function Roll() {
  const result = newpick();

  station_name_english = result.station_name_english;
  station_name_hangul = result.station_name_hangul;

  station_name_english_url = result.station_name_english_url;
  station_name_hangul_url = result.station_name_hangul_url;
  console.log("Roll: result.station_name_english_url " + result.station_name_english_url);
  console.log("Roll: result.station_name_hangul_url " + result.station_name_hangul_url);

  writeDisplay(result);
}

function writeDisplay(result) {
  console.log("updateDisplay: result.line " + result.line);
  console.log("updateDisplay: result.station_name_english " + result.station_name_english);
  console.log("updateDisplay: result.station_name_hangul " + result.station_name_hangul);
  console.log("updateDisplay: result.location_level_1 " + result.location_level_1);
  console.log("updateDisplay: result.location_level_n " + result.location_level_n);

  $lineDisplay.val(result.line).change();
  $nameDisplay_English.val(result.station_name_english).change();
  $nameDisplay_Hangul.val(result.station_name_hangul).change();
  $nameDisplay_Location1.val(result.location_level_1).change();
  $nameDisplay_LocationN.val(result.location_level_n).change();
}
