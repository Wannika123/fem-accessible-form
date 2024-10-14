import IconSuccess from '/assets/images/icon-success-check.svg'
import './Confirm.css'
import { useEffect } from 'react'

type ConfirmProps = {
    setSubmitted: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Confirm({ setSubmitted }: ConfirmProps) {

    function delay(time: number) {
        return new Promise(resolve => setTimeout(resolve, time));
    }

    useEffect(() => {
        delay(4000).then(() => setSubmitted(false))                  
    }, [])

    return (
        <div className="confirm-container">
            <div><img src={IconSuccess} alt='success icon' />Message Sent!</div>
            <p>Thanks for completing the form. We'll be in touch soon.</p>
        </div>
    )
}