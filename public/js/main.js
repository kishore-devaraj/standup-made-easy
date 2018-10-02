'use strict'

window.addEventListener('load', () => {
    const app = document.getElementById('app')
    const homeTemplate = Handlebars.compile(document.getElementById('main-page').innerHTML)
    const scrumMinCard = document.getElementById('scrum-min').innerHTML
    const homeTemplateHtml = homeTemplate({
        'scrum': [{
            'organiserName': 'Kishore Devaraj',
            'membersPresent' : 8,
            'date': '8th Sept, 2018'
        },{
            'organiserName': 'Kishore Devaraj',
            'membersPresent' : 8,
            'date': '8th Sept, 2018'
        },{
            'organiserName': 'Kishore Devaraj',
            'membersPresent' : 8,
            'date': '8th Sept, 2018'
        },{
            'organiserName': 'Kishore Devaraj',
            'membersPresent' : 8,
            'date': '8th Sept, 2018'
        },{
            'organiserName': 'Kishore Devaraj',
            'membersPresent' : 8,
            'date': '8th Sept, 2018'
        },{
            'organiserName': 'Kishore Devaraj',
            'membersPresent' : 8,
            'date': '8th Sept, 2018'
        },{
            'organiserName': 'Kishore Devaraj',
            'membersPresent' : 8,
            'date': '8th Sept, 2018'
        },{
            'organiserName': 'Kishore Devaraj',
            'membersPresent' : 8,
            'date': '8th Sept, 2018'
        },{
            'organiserName': 'Kishore Devaraj',
            'membersPresent' : 8,
            'date': '8th Sept, 2018'
        }]
    })
    app.innerHTML = homeTemplateHtml
})