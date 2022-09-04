var firstSubject = document.getElementById('firstSubjectSelect')
var secondSubject = document.getElementById('secondSubjectSelect')
var nextBtn = document.getElementById('nextBtn')
const API = 'https://dtm-backend.herokuapp.com'
// const API = 'http://localhost:7000'

let token = localStorage.getItem('token')
if(!token) window.location.replace('login.html')

async function getData(name) {
    try {
        let res = await fetch( API + '/' + `${name}`)
        res = await res.json()
        return res
    } catch (error) {
        console.log(error.message);
    }
}



firstSubject.addEventListener('change', async (e) => {
    e.preventDefault()
    let all = await getData('subjects')
    let subjects = all.data
    let res = []
    if(firstSubject.value == 1 ) {
        res = subjects.filter(x => x.subject_id == 2 || x.subject_id == 3 )
    } else {
        res = subjects.filter (x => x.subject_id == 4)
    }
    secondSubject.innerHTML = null
    res.forEach(i => {
        var opt = document.createElement('option');
        opt.value = i.subject_id;
        opt.innerHTML = i.subject_name;
        secondSubject.appendChild(opt);
    })
})


nextBtn.addEventListener('click', (e) => {
    e.preventDefault()    
    let firstValue = firstSubject.value
    let secondValue = secondSubject.value 
    
    if(firstValue.length == 1 && secondValue.length == 1 ){
        localStorage.removeItem('firstSubject')
        localStorage.removeItem('secondSubject')
        localStorage.removeItem('resultId')
        localStorage.setItem('firstSubject', firstValue)
        localStorage.setItem('secondSubject', secondValue)
        window.location.replace('university.html')
    }
    else return alert('Fanlarni tanlang')


})