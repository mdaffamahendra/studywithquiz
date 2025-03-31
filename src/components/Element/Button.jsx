const Button = ({type = "", onClick= () => {}, className= "w-full text-sm md:text-md p-2 mt-3 md:p-3 md:mt-4 bg-indigo-600 text-white rounded-md font-semibold hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500", children, disabled = false}) => {
    return (
        <button
                type={type}
                className={className}
                onClick={onClick}
                disabled={disabled}
            >
                {children}
        </button>
    )
}

export default Button