
import { Navigate } from "react-router-dom"
function ProtectRouter({ children }) {
    const isLogin = localStorage.getItem("token")
    if (isLogin) {
        return <Navigate to="/" replace />
    }
    return children;
}
export default ProtectRouter