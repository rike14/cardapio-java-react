import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import App from './App.tsx'
import { Header } from './components/header/header.tsx'
import { LoginIn } from './components/login/login.tsx'
import './index.css'

const queryClient = new QueryClient()


createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <StrictMode>
        <QueryClientProvider client={queryClient}>
          <Header />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            newestOnTop={false}
            pauseOnFocusLoss={false}
            pauseOnHover={false}
            theme="dark"
          />
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/login" element={<LoginIn />} />
          </Routes>
        </QueryClientProvider>
      </StrictMode>
    </BrowserRouter>
)
