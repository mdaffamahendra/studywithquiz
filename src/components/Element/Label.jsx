const Label = ({htmlFor, children, className = "block text-sm font-medium text-gray-800"}) => {
    return (
        <label htmlFor={htmlFor} className={className}>{children}</label>
    )
}

export default Label