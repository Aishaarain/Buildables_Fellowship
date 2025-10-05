import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <>
      <Router>
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-300 py-4 text-center text-sm">
            © {new Date().getFullYear()} My App. All rights reserved.
          </footer>
        </div>
      </Router>
      <ToastContainer />
    </>
  )
}

export default App
