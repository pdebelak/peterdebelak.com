(function() {
  var shortcutMode = false;
  function toggleShortcutMode() {
    shortcutMode = !shortcutMode;
  }

  var A_KEY = 65;
  var B_KEY = 66;
  var G_KEY = 71;
  var H_KEY = 72;
  var J_KEY = 74;
  var K_KEY = 75;
  var N_KEY = 78;
  var O_KEY = 79;
  var R_KEY = 82;
  function linkShortcut(e) {
    switch(keyDown(e)) {
      case A_KEY:
        document.getElementById("about").click();
      break;
      case B_KEY:
        document.getElementById("blog").click();
      break;
      case G_KEY:
        document.getElementById("github").click();
      break;
      case H_KEY:
        document.getElementById("home").click();
      break;
      case J_KEY:
        window.scrollBy(0,75);
      break;
      case K_KEY:
        window.scrollBy(0,-75);
      break;
      case N_KEY:
        document.getElementById("previous").click();
      break;
      case O_KEY:
        document.getElementById("next").click();
      break;
      case R_KEY:
        document.getElementById("resume").click();
      break;
    }
  }

  var ESCAPE_KEY = 27;
  function escapePressed(e) {
    return keyDown(e) === ESCAPE_KEY;
  }

  var SLASH_KEY = 191;
  function questionMarkPressed(e) {
    return keyDown(e) === SLASH_KEY && e.shiftKey;
  }

  function keyDown(e) {
    return e.keyCode || e.which;
  }

  document.addEventListener('keydown', function(e){
    if (questionMarkPressed(e)) {
      window.location = "/help/"
    } else if (escapePressed(e)) {
      toggleShortcutMode();
    } else if (shortcutMode) {
      linkShortcut(e);
    }
  });
})();
