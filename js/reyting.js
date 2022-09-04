var reytingTemplate = document.getElementById('reyting-template').content
var reytingList = document.getElementById('reytingList')


const API = 'https://dtm-backend.herokuapp.com'
// const API = 'http://localhost:7000'

var firstSubjectScore = 0
var secondSubjectScore = 0

async function  renderResults() {
    let res = await fetch( API + '/results/' + `highest`)
    let {data} = await res.json()
    if(!data.length) {
        reytingList.textContent = 'Resust\'s not found'
        return
    }  
    reytingList.innerHTML = null
    data.forEach(res => {
        let template = reytingTemplate.cloneNode(true)
        let reytingId = template.getElementById('reytingId')
        let username = template.getElementById('username')
        let faculty = template.getElementById('faculty')
        let reytingDate = template.getElementById('reytingDate')
        let scoreBall = template.getElementById('scoreBall')
        let time = template.getElementById('time')
        
        let dateForm = new Date( res.date)
        let month = Number(dateForm.getMonth()) + 1
        let date = Number(dateForm.getDate())
        month = month > 9 ? month : '0' + month
        date = date > 9 ? date : '0' + date
        var formatted_date = date + "/" + month  + "/" + dateForm.getFullYear()

        reytingId.textContent = res.result_id
        username.textContent = res.fullname
        faculty.textContent = res.faculty_name
        reytingDate.textContent = formatted_date
        scoreBall.textContent = res.score_ball
        time.textContent = res.time
        reytingList.append(template)

    });
}


renderResults()
