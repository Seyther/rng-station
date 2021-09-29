var $lineDisplay = $('#lineDisplay');
var $nameDisplay = $('#nameDisplay');

$lineDisplay.flapper({
  width: 6,
  chars_preset: 'alphanum',
  align: 'left',
  timing: 1000,
  min_timing: 250
});

$nameDisplay.flapper({
  width: 33,
  chars_preset: 'alpha',
  align: 'left',
  timing: 1000,
  min_timing: 250
});

function updateDisplay() {
  const result = pick();
  $('#lineDisplay')
    .val('LINE-' + result.line)
    .change();
  $('#nameDisplay').val(result.name).change();
}
