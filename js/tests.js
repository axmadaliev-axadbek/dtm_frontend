var testTemplate = document.getElementById('testList-template').content
var questionsList = document.getElementById('questions')
var finishBtn = document.getElementById('finishBtn')

const API = 'https://dtm-backend.herokuapp.com'
// const API = 'http://localhost:7000'

let token = localStorage.getItem('token')
if(!token) window.location.replace('login.html')

let admin = localStorage.getItem('user')
admin = JSON.parse(admin)

var firstSubject = localStorage.getItem('firstSubject')
var secondSubject = localStorage.getItem('secondSubject')
var yonalish = localStorage.getItem('yonalish')
var testScore = 0
var firstSubjectScore = 0
var secondSubjectScore = 0

async function getData(name) {
    try {
        // let res = await fetch(`${API}/${name}`)
        let res = await fetch( API + '/' + `${name}`)
        res = await res.json()
        return res
    } catch (error) {
        console.log(error.message);
    }
}

async function  renderTests() {
    let res = await fetch( API + '/' + `tests?firstSubject=${firstSubject}&secondSubject=${secondSubject}`)
    let {data} = await res.json()
    if(!data.length) {
        questions.textContent = 'Test\'s not found'
        return
    }  
    questionsList.innerHTML = null
    var correctAns = []
    data.forEach(test => {
        if(test.subject_id == 1 || test.subject_id == 5){
            let subjectTitle = document.createElement('h3')
            subjectTitle.classList.add('questions__title')
            subjectTitle.textContent = test.subject_name
            let questionArr = test.tests
        
            questionsList.append(subjectTitle)
            
        

            questionArr.forEach( t => {
                let divBox = document.createElement('div')
                
                divBox.classList.add('savol')
                // let questions = .getElementById('questionTitle')
                let questionTitle = document.createElement('h3')
                questionTitle.classList.add('savol__intro')
                questionTitle.textContent = t.question 

                var variantsList = document.createElement('ul')
                variantsList.classList.add('test')
                let variantsArr =t.question_variants
                variantsArr = Object.entries(variantsArr)            
                variantsList.dataset.correctAns = variantsArr[4][1]
                
                variantsArr.forEach(v => {
                    if((variantsList.getElementsByTagName("li").length) <= 3)  {
                        var variant = document.createElement('li')
                        variant.classList.add('test__block')
                        var answer = document.createElement('input')
                        answer.type = 'radio'
                        answer.name = 'answer'
                        // answer.classList.add('answer')
                        answer.id = v[1]
                        answer.value = v[0]
                        var answerlabel = document.createElement('label')
                        answerlabel.classList.add('options')
                        answerlabel.textContent = v[1]
                        answerlabel.htmlFor = v[1]
                        variant.append(answer)
                        variant.append(answerlabel)
                        
                        variant.addEventListener('click', (e) => {
                            
                            if(variantsList.dataset.correctAns == answer.value) {
                                answer.dataset.type = 'correct'

                                correctAns.push(t.question_id)
                                variant.classList.add('notActive')
                                variant.classList.remove('test__block')
                                variant.classList.add('correctAns')
                                firstSubjectScore = firstSubjectScore + 1
                                variantsList.addEventListener('click', (e) => {
                                    answer.checked = true
                                    e.preventDefault()
                                    // variantsList.classList.remove('savol')
                                    variantsList.classList.add('notActive')
                                    divBox.classList.add('notActive')
                                })
                            } else {
                                answer.dataset.type = 'wrong'
                                variant.classList.remove('test__block')
                                variant.classList.add('wrongAns')
                                variantsList.addEventListener('click', (e) => {
                                    answer.checked = true
                                    e.preventDefault()
                                    variantsList.classList.remove('savol')
                                    variantsList.classList.add('notActive')
                                    divBox.classList.add('notActive')
                                })
                                e.preventDefault()
                            }
                            answer.classList.add('answer')
                        })
                    if(answer.dataset.type == 'correct' || answer.dataset.type == 'wrong' ) {
                            answer.checked = true
                    }
                        
                        
                        variantsList.append(variant)
                    }
                })
                

                divBox.append(questionTitle)
                divBox.append(variantsList)
            
                questionsList.append(divBox)
            })


        // questionsList.append(template)
    
        } else if (test.subject_id == 2  || test.subject_id == 3 || test.subject_id == 4){
            let subjectTitle = document.createElement('h3')
            subjectTitle.classList.add('questions__title')
            subjectTitle.textContent = test.subject_name
            let questionArr = test.tests
           
            questionsList.append(subjectTitle)
            
            
    
            questionArr.forEach( t => {
                let divBox = document.createElement('div')
                 
                divBox.classList.add('savol')
                let questionTitle = document.createElement('h3')
                questionTitle.classList.add('savol__intro')
                questionTitle.textContent = t.question 
    
                var variantsList = document.createElement('ul')
                variantsList.classList.add('test')
                let variantsArr =t.question_variants
                variantsArr = Object.entries(variantsArr)            
                variantsList.dataset.correctAns = variantsArr[4][1]
                
                variantsArr.forEach(v => {
                    if((variantsList.getElementsByTagName("li").length) <= 3)  {
                        var variant = document.createElement('li')
                        variant.classList.add('test__block')
                        var answer = document.createElement('input')
                        answer.type = 'radio'
                        answer.name = 'answer'
                        // answer.classList.add('answer')
                        answer.id = v[1]
                        answer.value = v[0]
                        var answerlabel = document.createElement('label')
                        answerlabel.classList.add('options')
                        answerlabel.textContent = v[1]
                        answerlabel.htmlFor = v[1]
                        variant.append(answer)
                        variant.append(answerlabel)
                        
                        variant.addEventListener('click', (e) => {
                            
                            if(variantsList.dataset.correctAns == answer.value) {
                                answer.dataset.type = 'correct'
    
                                correctAns.push(t.question_id)
                                variant.classList.add('notActive')
                                variant.classList.remove('test__block')
                                variant.classList.add('correctAns')
                                secondSubjectScore = secondSubjectScore + 1
                                variantsList.addEventListener('click', (e) => {
                                    answer.checked = true
                                    e.preventDefault()
                                    // variantsList.classList.remove('savol')
                                    variantsList.classList.add('notActive')
                                    divBox.classList.add('notActive')
                                })
                            } else {
                                answer.dataset.type = 'wrong'
                                
                                variant.classList.remove('test__block')
                                variant.classList.add('wrongAns')
                                variantsList.addEventListener('click', (e) => {
                                    answer.checked = true
                                    e.preventDefault()
                                    variantsList.classList.remove('savol')
                                    variantsList.classList.add('notActive')
                                    divBox.classList.add('notActive')
                                })
                                e.preventDefault()
                            }
                            answer.classList.add('answer')
                        })
                       if(answer.dataset.type == 'correct' || answer.dataset.type == 'wrong' ) {
                            answer.checked = true
                       }
                        
                        
                        variantsList.append(variant)
                    }
                })
                
                divBox.append(questionTitle)
                divBox.append(variantsList)
               
                questionsList.append(divBox)
            })
            }

    });
}

renderTests()


yonalish = JSON.parse(yonalish)
finishBtn.addEventListener('click', async (e) => {
    e.preventDefault()
    console.log(admin);
    let allScore = firstSubjectScore + secondSubjectScore
    try {        

        let obj = JSON.stringify({
            first_subject: firstSubject,
            second_subject : secondSubject,
            score_ball : allScore*3.1,
            time: 120,
            faculty_id: yonalish.faculty_id,
            first_tests_result: firstSubjectScore,
            second_tests_result: secondSubjectScore,
            first_subject_id: yonalish.first_subject,
            second_subject_id: yonalish.second_subject,
            user_id: admin.user_id
        })
        let options = {
            method: 'POST',
            body : obj,
            headers : {
                "Content-Type": "application/json"
            }
        }
        let res = await fetch(`${API}/result`, options)
        res = await res.json()
        console.log(res);
        if(res.status == 200){
            let {data} = res
            localStorage.removeItem('resultId')
            localStorage.setItem('resultId', data[0].result_id)
            window.location.replace('results.html')
        } else {
            alert(res.message)
        }

    } catch (error) {
        console.log(error);
    }

})
finishBtn.onsubmit = async function (event){}