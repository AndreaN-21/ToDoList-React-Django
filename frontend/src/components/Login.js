import LoginAccess from "./LoginAccess"

function Login() {
    return <LoginAccess route="/api/token/" method="login" />
}

export default Login