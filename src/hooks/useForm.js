
import React, { useState } from "react";
export default function useForm(initialValues) {
    const [values, setValues] = useState(initialValues);

    const handleInputChange = (e) => {
        let name, value;
        name = e.target.name;

        switch (e.target.type) {
            case "checkbox":
                value = e.target.checked;
                setValues({ ...values, [name]: value })
                break;
            default:
                value = e.target.value;
                setValues({ ...values, [name]: value })
                break;
        }
    }

    return [
        values,
        setValues,
        handleInputChange
    ]
}