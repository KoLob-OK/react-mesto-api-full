import { useState, useCallback } from "react";

const useForm = () => {
    const [enteredValues, setEnteredValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setEnteredValues({
            ...enteredValues,
            [name]: value,
        });

        setErrors({
            ...errors,
            [name]: e.target.validationMessage,
        });

        setIsFormValid(e.target.closest(".form").checkValidity());
    };

    const resetForm = useCallback(
        (newValues = {}, newErrors = {}, newIsFormValid = false) => {
            setEnteredValues(newValues);
            setErrors(newErrors);
            setIsFormValid(newIsFormValid);
        },
        [setEnteredValues, setErrors, setIsFormValid]
    );

    return {
        enteredValues,
        errors,
        handleChange,
        isFormValid,
        resetForm,
    };
};

export default useForm;