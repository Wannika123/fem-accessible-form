import { useState } from "react"
import Confirm from "./Confirm"
import Form from "./Form"

export default function FormContainer() {
    const [submitted, setSubmitted] = useState(false);

    return (
        <>
            <Form setSubmitted={setSubmitted} />
            { submitted && <Confirm setSubmitted={setSubmitted} />}
        </>
    )
}