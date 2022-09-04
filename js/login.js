var form = document.getElementById('login-form')


var genders = document.getElementsByName('gender')
var fullname = document.getElementById('fullnameInput')

const API = 'https://dtm-backend.herokuapp.com'
// const API = 'http://localhost:7000'

form.onsubmit = async function (event){
    event.preventDefault()
    let pol 
    for (var x of genders)
    {
        if (x.checked) {
            pol = x
        }
    }
    try {        
        let obj = JSON.stringify({
            password : passwordInput.value,
            contact: contactInput.value
        })
        let options = {
            method: 'POST',
            body : obj,
            headers : {
                "Content-Type": "application/json"
            }
        }
        let res = await fetch(`${API}/users/login`, options)
        res = await res.json()
        if(res.status == 200){
            localStorage.setItem('token', res.token)
            localStorage.setItem('user', JSON.stringify(res.data))
            window.location.replace('admin.html')
        } else {
            alert(res.message)
        }

    } catch (error) {
        console.log(error);
    }
}