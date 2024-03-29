function changeLanguage(language) {
    // Update form labels based on the selected language
    var formTitle = document.getElementById('form-title');
    var usernameLabel = document.getElementById('username-label');
    var passwordLabel = document.getElementById('password-label');

    switch (language) {
        case 'english':
            formTitle.textContent = 'Login Form';
            usernameLabel.textContent = 'Username:';
            passwordLabel.textContent = 'Password:';
            break;
        case 'hindi':
            formTitle.textContent = 'लॉगिन फॉर्म';
            usernameLabel.textContent = 'उपयोगकर्ता नाम:';
            passwordLabel.textContent = 'पासवर्ड:';
            break;
        case 'tamil':
            formTitle.textContent = 'உள் நுழைவு படிவம்';
            usernameLabel.textContent = 'பயனர் பெயர்:';
            passwordLabel.textContent = 'கடவுச்சொல்:';
            break;
        case 'malayalam':
            formTitle.textContent = 'ലോഗിൻ ഫോർമ';
            usernameLabel.textContent = 'ഉപയോക്താവിന്റെ പേര്:';
            passwordLabel.textContent = 'പാസ്വേഡ്:';
            break;
        case 'kannada':
            formTitle.textContent = 'ಲಾಗಿನ್ ಫಾರ್ಮ್';
            usernameLabel.textContent = 'ಬಳಕೆದಾರರ ಹೆಸರು:';
            passwordLabel.textContent = 'ಪಾಸ್ವರ್ಡ್:';
            break;
        case 'telugu':
            formTitle.textContent = 'లాగిన్ ఫారం';
            usernameLabel.textContent = 'వాడుకరి పేరు:';
            passwordLabel.textContent = 'పాస్వర్డ్:';
            break;
        default:
            break;
    }
}

function validateLogin() {
    // Get the entered username and password
    var enteredUsername = document.getElementById('username').value;
    var enteredPassword = document.getElementById('password').value;

    // Check if the entered username and password are correct
    if (enteredUsername.toLowerCase() === 'swarnakar' && enteredPassword === 'gdsc') {
        // Delay the redirection for 2 seconds (adjust as needed)
        setTimeout(function() {
            // Redirect to the external HTML file after a successful login
            window.location.href = 'details.html';
        }, 2000);
        
        return false; // Prevent the form from submitting (since we're redirecting manually)
    } else {
        // Display error message for incorrect login details
        var errorMessage = document.getElementById('error-message');
        errorMessage.textContent = 'Incorrect login details';
        return false;
    }
}
