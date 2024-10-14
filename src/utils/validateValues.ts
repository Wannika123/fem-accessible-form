import type { KeyNames } from "../components/Form"

function validateEmail(val: string) {
    if (/^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$/.test(val)) {
        return true
    }
    return false
}

export function validateValues(
    val: string | boolean, 
    key: KeyNames
) {
    if (key === 'email' && typeof val === 'string') {
        return validateEmail(val)
    }

    // just check if it's empty string or false
    if (val) {
        return true
    } else {
        return false
    }
}