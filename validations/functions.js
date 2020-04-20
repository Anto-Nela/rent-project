function passwordValidation(password) {
    var message = "";
    if (password.length === 0) {
        message = "Password Cannot be empty!";
    }
    else if (password.length > 0 && password.length < 6) {
        message = "6 Characters minimum!";
    }
    else if (!password.match(/[0-9]/g)) {
        message = "Password should contain a number.";
    }
    return message;
}

function userNameValidation(username) {
    var message = "";
    if (username === "") {
        this.showValidationErr("user", "Username is required!");
    }
    else if (username.length > 0 && username.length < 4) {
        this.showValidationErr("user", "Username too short")
    }
    return message;
}
function emailValidation(email) {
    var re = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()\\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase()) ? '' : "Email is not valid!";
}

module.exports.emailValidation=emailValidation;
module.exports.passwordValidation=passwordValidation;
module.exports.userNameValidation=userNameValidation;