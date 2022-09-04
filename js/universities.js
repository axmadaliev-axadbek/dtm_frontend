var otmSelect = document.getElementById('otm')
var selectedUniversities = document.getElementById('selectedList')
var selectedTemplate = document.getElementById('selectedTemplate').content

var selectedBox = document.getElementById('selectedBox')
var delayBtn = document.getElementById('delayBtn')


let token = localStorage.getItem('token')
if(!token) window.location.replace('login.html')

var firstSubject = localStorage.getItem('firstSubject') 
var secondSubject = localStorage.getItem('secondSubject') 

const API = 'https://dtm-backend.herokuapp.com'
// const API = 'http://localhost:7000'

async function renderSelect () {
    try {
        let res = await fetch( API + '/' + `universities?firstSubject=${firstSubject}&secondSubject=${secondSubject}`)
        let {data} = await res.json()

        otmSelect.innerHTML = null
        data.forEach(i => {
                    var opt = document.createElement('option');

                    opt.innerHTML = i.university_name;
                    opt.classList.add('select__title')
                    otmSelect.appendChild(opt);
                    let uns = i.faculties
                    uns.forEach(x => {
                        var opt = document.createElement('option');
                        opt.value = x.faculty_id;
                        opt.innerHTML = x.faculty_name;
                        opt.classList.add('subject__select1')
                        otmSelect.appendChild(opt);
                    })
                })
        return res
    } catch (error) {
        console.log(error.message);
    }
}

renderSelect()

otmSelect.addEventListener('change', async e => {
    e.preventDefault()

    let res = await fetch( API + '/' + `faculties`)
    let {data} = await res.json()
    var selected = otmSelect.value
    let faculted = data.find(x => x.faculty_id == selected)
    window.localStorage.setItem('yonalish', JSON.stringify(faculted))
    
    let yonalish = window.localStorage.getItem('yonalish')
    yonalish = JSON.parse(yonalish)
    selectedBox.textContent = yonalish.faculty_name
    selectedBox.appendChild(delayBtn)

    otmRegion.textContent = yonalish.region_name
    otmName.textContent = yonalish.university_name

    grantCount.textContent = yonalish.grant_count
    grantScore.textContent = yonalish.grant_score
    contractCount.textContent = yonalish.contract_count
    contractScore.textContent = yonalish.contract_score

})

delayBtn.addEventListener('click', (e) => {
    e.preventDefault()
    window.localStorage.removeItem('yonalish')
})


nextBtn.addEventListener('click', e => {
    e.preventDefault()    
    let res = otmSelect.value

    if(res.length == 1 || res.length == 2){
        window.open('tests.html')
    }
    else return alert('Yonalishni tanlang')

})

