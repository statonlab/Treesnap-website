window._ = require('lodash')

/**
 * We'll load the axios HTTP library which allows us to easily issue requests
 * to our Laravel back-end. This library automatically handles sending the
 * CSRF token as a header based on the value of the "XSRF" token cookie.
 */

window.axios = require('axios')

window.axios.defaults.headers.common = {
    'X-CSRF-TOKEN'    : window.Laravel.csrfToken,
    'X-Requested-With': 'XMLHttpRequest',
    'Accept'          : 'application/json'
}

window.Laravel.renewToken = () => {
    axios.get('/api/_token').then(response => {
        window.Laravel.csrfToken             = response.data.data
        window.axios.defaults.headers.common = {
            'X-CSRF-TOKEN'    : window.Laravel.csrfToken,
            'X-Requested-With': 'XMLHttpRequest',
            'Accept'          : 'application/json'
        }

        const _tokens = document.querySelectorAll('input[name="_token"]')
        if (_tokens) {
            _token.forEach(token => {
                token.value = response.data.data
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
setInterval(window.Laravel.renewToken, 60 * 60 * 30)

/**
 * Echo exposes an expressive API for subscribing to channels and listening
 * for events that are broadcast by Laravel. Echo and event broadcasting
 * allows your team to easily build robust real-time web applications.
 */

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//     broadcaster: 'pusher',
//     key: 'your-pusher-key'
// });
