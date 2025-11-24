import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { AppProvider } from "@common-ui/app-provider";
import { ThemeProviderContext } from "@common-ui/theme-provider";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppProvider>
      <ThemeProviderContext>
        <App />
      </ThemeProviderContext>
    </AppProvider>
  </React.StrictMode>
)
