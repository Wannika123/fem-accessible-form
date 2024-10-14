import React, { useState } from 'react';
import './Form.css';
import { validateValues } from '../utils/validateValues';

const INITIAL_DATA = {
    firstName: '',
    lastName: '',
    email: '',
    queryType: '',
    message: '',
    consent: false
}

export type KeyNames = keyof typeof INITIAL_DATA

type ErrMessageType = {
    [index in KeyNames]: string
}

const ERR_MESSAGES: ErrMessageType = {
    firstName: 'This field is required',
    lastName: 'This field is required',
    email: 'Please enter a valid email address',
    queryType: 'Please select a query type',
    message: 'This field is required',
    consent: 'To submit this form, please consent to being contacted'
}

type FormProps = {
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Form({ setSubmitted }: FormProps) {
    const keys = Object.keys(INITIAL_DATA)

    const [formData, setFormData] = useState(INITIAL_DATA);
    const [errMessage, setErrMessage] = useState<ErrMessageType>(() => {
        const value = keys.reduce((obj: any, key) => {
            obj[key] = ''
            return obj
        }, {})
        return value
    })

    const handleChange = (
        key: KeyNames, 
        value: string | boolean
    ) => {  
        // remove error message if the input value is valid
        if (errMessage[key] && validateValues(value, key)) {    
            setErrMessage(state => ({
                ...state, [key]: ''
            }))
        }  

        setFormData(state => ({
            ...state, [key]: value
        }))
    }

    const handleBlur = (
        key: KeyNames, 
        value: string 
    ) => {
        if (!validateValues(value, key)) {  
            setErrMessage(state => ({
                ...state, [key]: ERR_MESSAGES[key]
            }))
        }
    }

    const checkCompletion = () => {
        const invalidInputKeys: KeyNames[] = [];
        
        let key: KeyNames;
        for (key in formData) {
            const value = formData[key];
            if (!validateValues(value, key)) {
                invalidInputKeys.push(key)
            }
        }

        if (invalidInputKeys.length > 0) {
            setErrMessage(state => {
                let newState = {...state};
                for (let i = 0; i < invalidInputKeys.length; i++) {
                    const key = invalidInputKeys[i]
                    newState = {...newState, [key]: ERR_MESSAGES[key] }
                }
                return newState
            })
            return false;
        }  
        return true;
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const validated = checkCompletion()

        if (!validated) return
        
        setFormData(INITIAL_DATA);
        setSubmitted(true);
        window.scrollTo({ top: 0, behavior: 'smooth'});
    }

    return (
        <div className='container'>
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>    

                <fieldset>
                    <div className='grid-container'>
                        <div className='input-container'>
                            <label htmlFor='first-name' className='label'>First Name <span className='star' aria-hidden="true">*</span></label>
                            <input 
                                className='input-box'
                                type='text' 
                                id='first-name' 
                                name='first-name'
                                value={formData.firstName}
                                autoComplete='given-name'   
                                aria-invalid={errMessage.firstName !== '' ? 'true' : 'false'}
                                aria-describedby='first-name-err'
                                onChange={e => handleChange('firstName', e.target.value)}
                                onBlur={e => handleBlur('firstName', e.target.value)}
                                required
                            />
                            { errMessage.firstName !== '' && <div id='first-name-err' className='err-message'>{errMessage.firstName}</div> }
                        </div>
                        <div className='input-container'>
                            <label htmlFor='last-name' className='label'>Last Name <span className='star' aria-hidden="true">*</span></label>
                            <input 
                                className='input-box'
                                type='text' 
                                id='last-name' 
                                name='last-name'
                                value={formData.lastName}
                                autoComplete='family-name'
                                aria-invalid={errMessage.lastName !== '' ? 'true' : 'false'}
                                aria-describedby='last-name-err'
                                onChange={e => handleChange('lastName', e.target.value)}
                                onBlur={e => handleBlur('lastName', e.target.value)}
                                required
                            />
                            { errMessage.lastName !== '' && <div id='last-name-err' className='err-message'>{errMessage.lastName}</div> }
                        </div>
                    </div>
                    <div className='input-container'>
                        <label htmlFor='email' className='label'>Email Address <span className='star' aria-hidden="true">*</span></label>
                        <input 
                            className='input-box'
                            type='email' 
                            id='email' 
                            name='email'
                            value={formData.email}
                            autoComplete='email'
                            aria-invalid={errMessage.email !== '' ? 'true' : 'false'}
                            aria-describedby='email-err'
                            onChange={e => handleChange('email', e.target.value)}
                            onBlur={e => handleBlur('email', e.target.value)}
                            required
                        />
                        { errMessage.email !== '' && <div id='email-err' className='err-message'>{errMessage.email}</div> }
                    </div>
                </fieldset>

                <fieldset aria-required='true'>
                    <legend className='label' aria-describedby='query-type-err'>Query Type <span className='star' aria-hidden="true">*</span></legend>
                    <div className='grid-container input-container'>
                        <label htmlFor='general enquiry' className='input-box'>
                            <input 
                                type='radio' 
                                name='query-type' 
                                id='general enquiry' 
                                value='general enquiry' 
                                checked={formData.queryType === 'general enquiry'}
                                onChange={e => handleChange('queryType', e.target.value)}
                            />
                            <span>General Enquiry</span>
                        </label>
                        <label htmlFor='support request' className='input-box'>
                            <input 
                                type='radio' 
                                name='query-type' 
                                id='support request' 
                                value='support request' 
                                checked={formData.queryType === 'support request'}
                                onChange={e => handleChange('queryType', e.target.value)}
                            />
                            Support Request
                        </label>
                        { errMessage.queryType !== '' && <div id='query-type-err' className='err-message'>{errMessage.queryType}</div> }
                    </div>
                    
                </fieldset>

                <fieldset>
                    <div className='input-container'>
                        <label htmlFor='message' className='label'>Message <span className='star' aria-hidden="true">*</span></label>
                        <textarea 
                            className='input-box'
                            id='message'
                            name='mesage'
                            value={formData.message}
                            aria-invalid={errMessage.message !== '' ? 'true' : 'false'}
                            aria-describedby='textarea-err'
                            onChange={e => handleChange('message', e.target.value)}
                            onBlur={e => handleBlur('message', e.target.value)}
                            required
                        ></textarea>
                        { errMessage.message !== '' && <div id='textarea-err' className='err-message'>{errMessage.message}</div> }
                    </div>
                </fieldset>

                <div>
                    <div className='checkbox-container'>
                        <input 
                            type='checkbox' 
                            id='consent' 
                            name='consent'
                            aria-describedby='consent-err'
                            checked={formData.consent}
                            onChange={e => handleChange('consent', e.target.checked)}
                        />
                        <label htmlFor='consent' className='label'>I consent to being contacted by the team <span className='star' aria-hidden="true">*</span></label>
                    </div>
                    { errMessage.consent !== '' && <div id='consent-err' className='err-message'>{errMessage.consent}</div> }
                </div>

                <button className='submit-btn' type='submit' onClick={checkCompletion}>Submit</button>

            </form>
        </div>
    )
}