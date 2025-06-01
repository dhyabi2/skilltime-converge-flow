
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import './i18n/config'

// Render the app directly since i18n config is already imported and initialized
createRoot(document.getElementById("root")!).render(<App />);
