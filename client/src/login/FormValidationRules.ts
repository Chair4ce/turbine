import {
    EMAIL_MAX_LENGTH, NAME_MAX_LENGTH, NAME_MIN_LENGTH, PASSWORD_MAX_LENGTH,
    PASSWORD_MIN_LENGTH,
    USERNAME_MAX_LENGTH,
    USERNAME_MIN_LENGTH
} from "../store/users/constants";




export function validateEmail(email: string) {
    if(!email) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email may not be empty'
        }
    }

    if(!/\S+@\S+\.\S+/.test(email)) {
        return {
            validateStatus: 'error',
            errorMsg: 'Email not valid'
        }
    }

    if(email.length > EMAIL_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Email is too long (Maximum ${EMAIL_MAX_LENGTH} characters allowed)`
        }
    }

    return {
        validateStatus: null,
        errorMsg: null
    }
}

export function validateUsername(username: string) {

    console.log(USERNAME_MIN_LENGTH + ":" + username.length);
    if(username.length < USERNAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Username is too short (Minimum ${USERNAME_MIN_LENGTH} characters needed.)`
        }
    } else if (username.length > USERNAME_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Username is too long (Maximum ${USERNAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: "success",
            errorMsg: null
        }
    }
}

export function validatePassword(password: string) {
    if(password.length < PASSWORD_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Password is too short (Minimum ${PASSWORD_MIN_LENGTH} characters needed.)`
        }
    } else if (password.length > PASSWORD_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Password is too long (Maximum ${PASSWORD_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }
}

export const validateName = (name: string) => {
    if(name.length < NAME_MIN_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Name is too short (Minimum ${NAME_MIN_LENGTH} characters needed.)`
        }
    } else if (name.length > NAME_MAX_LENGTH) {
        return {
            validateStatus: 'error',
            errorMsg: `Name is too long (Maximum ${NAME_MAX_LENGTH} characters allowed.)`
        }
    } else {
        return {
            validateStatus: 'success',
            errorMsg: null,
        };
    }
}
