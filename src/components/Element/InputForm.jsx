import Input from "./Input"
import Label from "./Label"

const InputForm = ({children, type, name, max, min, onChange, value, placeholder, readonly, required}) => {
    return (
        <div>
        <Label htmlFor={name}>{children}</Label>
        <Input type={type} name={name} max={max} min={min} readonly={readonly} onChange={onChange} value ={value} placeholder={placeholder} required={required}/>
        </div>
    )
}

export default InputForm