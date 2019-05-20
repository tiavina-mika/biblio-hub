import validator from 'validator'

export const validateBook = (data) => {
    let errors = {}

    if(validator.isEmpty(data.title)) {
        errors.EMPTY_TITLE = "Title is empty"
    }
    if(validator.isEmpty(data.summary)) {
        errors.EMPTY_SUMMARY = "Summary is empty"
    }
    if(validator.isEmpty(data.author)) {
        errors.EMPTY_AUTHOR = "Author is empty"
    }
    if(!validator.isLength(data.title, {max: 100})) {
        errors.TITLE_LENGTH = "Title must be under 100 caracters"
    }
    if(!validator.isLength(data.date_publication, {max: 75})) {
        errors.DATE_PUBLICATION_LENGTH = "Title must be under 75 caracters"
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export const validateAuthor = (data) => {
    let errors = {}

    if(validator.isEmpty(data.first_name)) {
        errors.EMPTY_FIRST_NAME = "First name is empty"
    }
    if(!validator.isLength(data.first_name, {max: 100})) {
        errors.LENGTH_FIRST_NAME = "First name must be under 100 caracters"
    }
    if(validator.isEmpty(data.family_name)) {
        errors.EMPTY_FAMILY_NAME = "Family name is empty"
    }
    if(!validator.isLength(data.family_name, {max: 100})) {
        errors.LENGTH_FAMILY_NAME = "Family name must be under 100 caracters"
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export const validateGenre = (data) => {
    let errors = {}

    if(validator.isEmpty(data.name)) {
        errors.EMPTY_GENRE = "Genre name is empty"
    }
    if(!validator.isLength(data.name, {min: 3, max: 50})) {
        errors.GENRE_NAME_LENGTH = "Genre name must be between 3 and 50 caracters"
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export const validateSignup = (data) => {
    let errors = {}

    if(validator.isEmpty(data.name)) {
        errors.EMPTY_NAME = "User name is empty"
    }
    if(!validator.isLength(data.name, {min: 5, max: 100})) {
        errors.NAME_LENGTH = "User name must be between 5 and 100 caracters"
    }
    if(validator.isEmpty(data.email)) {
        errors.EMPTY_EMAIL = "Email is required"
    }
    if(!validator.isEmail(data.email)) {
        errors.INVALID_EMAIL = "Email is invalid"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export const validateUser = (data) => {
    let errors = {}

    if(validator.isEmpty(data.name)) {
        errors.EMPTY_NAME = "User name is empty"
    }
    if(!validator.isLength(data.name, {min: 5, max: 100})) {
        errors.NAME_LENGTH = "User name must be between 5 and 100 caracters"
    }
    if(validator.isEmpty(data.email)) {
        errors.EMPTY_EMAIL = "Email is required"
    }
    if(!validator.isEmail(data.email)) {
        errors.INVALID_EMAIL = "Email is invalid"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}


export const validateSignin = (data) => {
    let errors = {}

    if(validator.isEmpty(data.email)) {
        errors.EMPTY_EMAIL = "User email is empty"
    }
    if(!validator.isEmail(data.email)) {
        errors.INVALID_EMAIL = "Email is invalid"
    }
    if(validator.isEmpty(data.password)) {
        errors.EMPTY_PASSWORD = "User password is empty"
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

export const validateContact = (data) => {
    let errors = {}

    if(validator.isEmpty(data.email)) {
        errors.EMPTY_EMAIL = "User email is empty"
    }
    if(!validator.isEmail(data.email)) {
        errors.INVALID_EMAIL = "Email is invalid"
    }
    if(validator.isEmpty(data.name)) {
        errors.EMPTY_CONTACT_NAME = "Name is empty"
    }
    if(validator.isEmpty(data.message)) {
        errors.EMPTY_CONTACT_MESSAGE = "Message is empty"
    }
    if(!validator.isLength(data.message, {min: 10, max: 2000})) {
        errors.CONTACT_NAME_LENGTH = "User name must be between 10 and 2000 caracters"
    }
    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}

