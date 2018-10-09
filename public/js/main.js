'use strict'

window.addEventListener('load', () => {

    const app = document.getElementById('app')
    const errorTemplate = Handlebars.compile(document.getElementById('error-template').innerHTML)
    const loginTemplate = Handlebars.compile(document.getElementById('login-template').innerHTML)
    const homeTemplate = Handlebars.compile(document.getElementById('main-page').innerHTML)


    let router = new Router({
        mode: 'history',
        page404: function (path) {
            app.innerHTML = errorTemplate({
                "title": "Page Not Found",
                "message": `Path '/${path}' is not found`
            })
        }
    });

    router.add('/', () => {
        const scrumMinCard = document.getElementById('scrum-min').innerHTML
        const homeTemplateHtml = homeTemplate({
            'scrum': [1, 2, 3, 4, 5, 6, 7, 8, 9]
        })
        app.innerHTML = homeTemplateHtml
    })

    router.add('/login', () => {
        app.innerHTML = loginTemplate({})
    })

    // Navigate the router to the current location
    router.navigateTo(window.location.pathname)
})