window._ = require('lodash')

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */
window.axios = require('axios')

window.axios.defaults.headers.common = {
  'X-CSRF-TOKEN'    : window.TreeSnap.csrfToken,
  'X-Requested-With': 'XMLHttpRequest',
  'Accept'          : 'application/json'
}

window.renewLaravelToken = () => {
  axios.get('/web/_token').then(response => {
    let data = response.data.data

    window.TreeSnap.csrfToken            = data._token
    window.axios.defaults.headers.common = {
      'X-CSRF-TOKEN'    : data._token,
      'X-Requested-With': 'XMLHttpRequest',
      'Accept'          : 'application/json'
    }

    const _tokens = document.querySelectorAll('input[name="_token"]')
    if (_tokens) {
      _token.forEach(token => {
        token.value = data._token
      })
    }
  }).catch(error => {
    if (error.response && (error.response.status === 302 || error.response.status === 401)) {
      if (confirm('You have been logged out due to inactivity.')) {
        window.location.replace('/login')
      } else {
        window.location.replace('/login')
      }
    }
  })
}

// Renew the CSRF token every 30 minutes
setInterval(window.renewLaravelToken, 1000 * 60 * 30)
