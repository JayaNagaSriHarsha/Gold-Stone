let formData = {
    name: "",
    email: "",
    status: "Active",
    gender: "Male"
}

let emailErrorMsggEl = document.getElementById('emailErrorMsg');
let nameErrorMsgEl = document.getElementById('nameErrorMsg');


let WorkingStatusEl = document.getElementById('status');
WorkingStatusEl.addEventListener('change', function(event) {
    formData.status = event.target.value;
    console.log(formData);
})

let genderMale = document.getElementById('male');
genderMale.addEventListener('change', function(event) {
    formData.gender = event.target.value;
});


let genderFemale = document.getElementById('female');
genderFemale.addEventListener('change', function(event) {
    formData.gender = event.target.value;
});

let genderTrans = document.getElementById('Transgender');
genderTrans.addEventListener('change', function(event) {
    formData.gender = event.target.value;
});




let nameEl = document.getElementById('name');
nameEl.addEventListener('change', function(event) {
    if (event.target.value === '') {
        nameErrorMsgEl.textContent = 'Required*';
    } else {
        nameErrorMsgEl.textContent = '';
    }
    formData.name = event.target.value;
});


let emailEl = document.getElementById('email');
emailEl.addEventListener('change', function(event) {
    if (event.target.value === '') {
        emailErrorMsggEl.textContent = 'Required*';
    } else {
        emailErrorMsggEl.textContent = '';
    }
    formData.email = event.target.value;
});

function validateFormData(formData) {

    let {
        name,
        email
    } = formData;
    if (name === '') {
        nameErrorMsgEl.textContent = 'Required*';
    }
    if (email === '') {
        emailErrorMsggEl.textContent = 'Required*';
    }

}

function submitformData(formData) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: 'Bearer 1f904387f96fea832db1718fdf6e1a0e667a174ef03da4689aeedaf1b034bde7'

        },
        body: JSON.stringify(formData)
    };
    let url = 'https://gorest.co.in/public-api/users';

    fetch(url, options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            if (jsonData.code === 422) {
                if (jsonData.data[0].message === 'has already been taken') {
                    emailErrorMsggEl.textContent = 'Email Already Exists';
                }
            }
        });
}

let myFormEl = document.getElementById('myForm');
myFormEl.addEventListener('submit', function(event) {
    event.preventDefault();
    validateFormData(formData);
    submitformData(formData);
});