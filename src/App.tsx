import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Footer } from './components/Footer'
import { HomePage } from './pages/HomePage'
import { Dashboard } from "./pages/Dashboard"
import { DashboardContent } from "./pages/DashboardContent"
import { Investment } from "./pages/Investment"
import { Login } from './pages/Login'
import { Register } from './pages/Register'
import { Deposit } from './pages/Deposit'
import { AdminDeposits } from './pages/admin/Deposits'
import { AdminProtectedRoute, ProtectedRoute } from './components/ProtectedRoute'
import { Withdraw } from './pages/Withdraw'
import { useScrollToTop } from './hooks/useScrollToTop'
import { ForgotPassword } from './pages/ForgotPassword'
import { ResetPassword } from './pages/ResetPassword'

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                >
                    <Route index element={<DashboardContent />} />
                    <Route path="investment" element={<Investment />} />
                    <Route path="deposit" element={<Deposit />} />
                    <Route path="withdraw" element={<Withdraw />} />
                </Route>
                <Route
                    path="/admin/deposits"
                    element={
                        <AdminProtectedRoute>
                            <AdminDeposits />
                        </AdminProtectedRoute>
                    }
                />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/reset-password/:token" element={<ResetPassword />} />
            </Routes>
            <Footer />
        </Router>
    )
}

// Create a component for the scroll behavior
function ScrollToTop() {
    useScrollToTop();
    return null;
}

export default App
