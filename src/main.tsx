import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { HelmetProvider } from 'react-helmet-async'
import App from './App.tsx'
import './index.css'
import './App.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from './components/theme-toggle'
// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      throwOnError: false,
    },
  },
})

// Get the root element
const rootElement = document.getElementById("root");

if (!rootElement) {
  document.body.innerHTML = '<div style="padding:2rem;color:red">Root element not found</div>';
  throw new Error("Failed to find the root element");
}

try {
  createRoot(rootElement).render(
    <StrictMode>
      <HelmetProvider>
        <ThemeProvider defaultTheme="light" storageKey="ui-theme">
          <QueryClientProvider client={queryClient}>
            <App />
          </QueryClientProvider>
        </ThemeProvider>
      </HelmetProvider>
    </StrictMode>
  );
  console.log("[Main] App rendered successfully");
} catch (err) {
  console.error("[Main] Failed to render:", err);
  rootElement.innerHTML = '<div style="padding:2rem;color:red">App failed to render. Check console.</div>';
}
