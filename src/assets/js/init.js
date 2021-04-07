const dm = new DarkMode({
  light: 'assets/css/bulma/default.min.css',
  dark: 'assets/css/bulma/cyborg.min.css',
  checkSystemScheme: true
});

function setLocalizations() {
  $('[data-localize]').localize('app', {
    skipLanguage: /^en/, 
    pathPrefix: 'assets/i18n'
  })
}