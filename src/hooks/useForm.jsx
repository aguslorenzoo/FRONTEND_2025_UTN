import { useState } from "react"

//tiene la responsabilidada de manejar el estado de formulario en mi app
const useForm = (initial_form_state, onSubmit) => {
    // estados con los valores del form
    const [form_state, setFormState] = useState(initial_form_state)
    
    // 1) maneja los cambios del input
    const onInputChange = (event) => {
        //que campo estamos modificando
        const field = event.target
        //nombre del campo del form
        const field_name = field.name
        //valor del campo del form
        const field_value = field.value

        //para modificar el estado del formulario
        setFormState(
            (prevFormState) => {
                return {...prevFormState,[field_name]: field_value}
            }
        )
    }

    // 2) envia el form
    const handleSubmit = (event) => {
        //evitamos que la pagina se recargue
        event.preventDefault()
        onSubmit(form_state)
    }

    // 3) lo limpia y resetea
    const resetForm = () => {
        setFormState(initial_form_state)
    }

    return {
        form_state, 
        onInputChange,
        handleSubmit,
        resetForm
    }
}

export default useForm