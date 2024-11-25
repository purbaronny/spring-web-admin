import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google"

createRoot(document.getElementById('wrapper')).render(
  <GoogleOAuthProvider clientId="364218727000-tthuiq6qbc6om5uuptmq8514i1pknu2r.apps.googleusercontent.com">
  <StrictMode>
    <App />
  </StrictMode>,
  </GoogleOAuthProvider>
)
