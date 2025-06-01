
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import i18n from './i18n/config'

// Wait for i18n to be initialized before rendering the app
i18n.init().then(() => {
  createRoot(document.getElementById("root")!).render(<App />);
});
