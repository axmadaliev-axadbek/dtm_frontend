let token = localStorage.getItem('token')
if(!token) window.location.replace('login.html')
let line1 = document.querySelector('.result__line1')
let line1Procent = document.querySelector('.result__line1__num')

let line2 = document.querySelector('.result__line2')
let line2Procent = document.querySelector('.result__line2__num')

let resultId = localStorage.getItem('resultId')


const API = 'https://dtm-backend.herokuapp.com'
// const API = 'http://localhost:7000'

async function redneResult() {
    let res = await fetch( API + '/result' + `?resultId=${resultId}`)
    let {data} = await res.json()
    data = data[0]
    console.log(data);
    let firstScore = data.first_tests_result*10
    firstSubjectTitle.textContent = data.first_subject_name
    firstSubjectProcent.textContent = firstScore + '%'
    firstSubjectScore.textContent = `${data.first_tests_result}/10`
    line1.style.background = ` -webkit-linear-gradient(left, #3575f4 ${firstScore}%, #ffffff  ${firstScore}%)`
    line1Procent.style.left = ( firstScore - 9) + '%'

    let secondScore = data.second_tests_result*10
    seondSubjectTitle.textContent = data.second_subject_name
    secondSubjectProcent.textContent = secondScore + '%'
    secondSubjectScore.textContent = `${data.second_tests_result}/10`
    line2.style.background = ` -webkit-linear-gradient(left, #3575f4 ${secondScore}%, #ffffff  ${secondScore}%)`
    line2Procent.style.left = ( secondScore - 9) + '%'
    
    let scoreBall = data.first_tests_result*3.1 + data.second_tests_result*3.1

    if(data.score_ball > data.contract_score) {
        recomendation.textContent = 'Tavsiya etildi'
        university.textContent = data.university_name
        faculty.textContent = data.faculty_name
        typeEducation.textContent = scoreBall >= data.grant_score ? 'Davlat granti' : 'Kontract Asosida'
        natija2.style.display = 'none'
    } else {
        natija.innerHTML = null
        recomendation2.textContent = 'Tavsiya etilmadi'
    }

}

redneResult()