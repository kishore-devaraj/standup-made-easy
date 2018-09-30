'use strict'

window.addEventListener('load', () => {
    const app = document.getElementById('app')
    const homeTemplate = Handlebars.compile(document.getElementById('main-page').innerHTML)
    const scrumMinCard = document.getElementById('scrum-min').innerHTML
    const homeTemplateHtml = homeTemplate({
        'scrum': [1, 2, 3, 4, 5, 6, 7, 8, 9]
    })
    app.innerHTML = homeTemplateHtml
})