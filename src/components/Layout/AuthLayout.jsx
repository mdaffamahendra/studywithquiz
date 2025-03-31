const AuthLayout = ({children}) => {
    return (
        <div className="flex p-12 md:p-2 justify-center items-center bg-gradient-to-r from-blue-500 via-indigo-600 to-blue-900 h-screen font-poppins">
            <div className="bg-white md:max-w-4xl w-full rounded-lg shadow-lg flex max-w-sm">
              {children}
            </div>
        </div>
    )
}

export default AuthLayout