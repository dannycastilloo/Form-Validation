const firebaseConfig = {
    apiKey: "AIzaSyDIXMeGjoVKV-ojNpWIuQiUg8AEI2wRqLs",
    authDomain: "form-validation-bc4a3.firebaseapp.com",
    projectId: "form-validation-bc4a3",
    storageBucket: "form-validation-bc4a3.appspot.com",
    messagingSenderId: "339594005124",
    appId: "1:339594005124:web:ff9e7b7f5771f04bf250d1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

document.getElementById('form').addEventListener('submit', (event) => {
    event.preventDefault()

    // Validate name
    let nameEntry = document.getElementById('name')
    let nameError = document.getElementById('nameError')

    if (nameEntry.value.trim() === '') {
        nameError.textContent = 'Insert a name'
        nameError.classList.add('error-mesage')
    } else {
        nameError.textContent = ''
        nameError.classList.remove('error-message')
    }

    // Validate email
    let emailEntry = document.getElementById('email')
    let emailError = document.getElementById('emailError')
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(emailEntry.value)) {
        emailError.textContent = 'Insert a valid email'
        emailError.classList.add('error-mesage')
    } else {
        emailError.textContent = ''
        emailError.classList.remove('error-message')
    }

    // Validate password
    let passwordEntry = document.getElementById('password')
    let passwordError = document.getElementById('passwordError')
    let passwordPattern = /^[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!passwordPattern.test(passwordEntry.value)) {
        passwordError.textContent = 'Insert a password with uppercase, lowercase, special characters, numbers and more than 7 characters'
        passwordError.classList.remove('error-message')
    } else {
        passwordError.textContent = ''
        passwordError.classList.remove('error-message')
    }

    // If all fields are ok
    if (!nameError.textContent && !emailError.textContent && !passwordError.textContent) {

        db.collection("users").add({
            name: nameEntry.value,
            email: emailEntry.value,
            password: passwordEntry.value
        })
        .then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });

        alert('Form has been validated.');
        document.getElementById('form').reset();
    }
})