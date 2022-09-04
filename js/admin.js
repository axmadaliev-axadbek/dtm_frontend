var resultTemplate = document.getElementById('resultTemplate').content
var restultsList = document.querySelector('.restultsList')
var exitBtn = document.getElementById('exitBtn')

const API = 'https://dtm-backend.herokuapp.com'
// const API = 'http://localhost:7000'


var firstSubjectScore = 0
var secondSubjectScore = 0

let token = localStorage.getItem('token')
if(!token) window.location.replace('login.html')

var admin = localStorage.getItem('user')
async function  renderResults() {
    admin = JSON.parse(admin)
    let userId = admin.user_id
    let res = await fetch( API + '/result/' + userId)
    let {data} = await res.json()
    if(!data.length) {
        restultsList.textContent = 'Resust\'s not found'
        return  
    }  
    console.log(data);
    restultsList.innerHTML = null
    
    let order = 0
    data.forEach(res => {
        order = order + 1
        let template = resultTemplate.cloneNode(true)

        let testOrder = template.getElementById('testOrder')
        let testDate = template.getElementById('testDate')
        let testScore = template.getElementById('testScore')
        let faculty = template.getElementById('faculty')
        let typeTraining = template.getElementById('typeTraining')
        let test1Score = template.getElementById('test1Score')
        let test2Score = template.getElementById('test2Score')

        let dateForm = new Date( res.date)
        let month = Number(dateForm.getMonth()) + 1
        month = month > 9 ? month : '0' + month
        var formatted_date = dateForm.getDate() + "/" + month  + "/" + dateForm.getFullYear()

        testOrder.textContent = 'Test # '+ order
        testDate.textContent = formatted_date
        testScore.textContent = res.score_ball 
        faculty.textContent = res.faculty_name + ' ' + `(${res.university_name})`
        if(res.contract_score >= res.score_ball) {
            typeTraining.textContent = 'Tavsiya etilmadi'
        } else {
            typeTraining.textContent = res.type_of_education 
        }

        test1Score.textContent = res.first_tests_result + '/' + 10 
        test2Score.textContent = res.second_tests_result + '/' + 10 

        restultsList.append(template)

    });
    
}

renderResults()

exitBtn.addEventListener('click', (e) => {
    localStorage.removeItem('token')
    window.location.replace('login.html')
})

