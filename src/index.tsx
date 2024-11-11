import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './router/router'
import { Provider } from "react-redux"
import store from "./store"
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();
const HtmlRoot = document.getElementById('root');
if (HtmlRoot) {
  const root = ReactDOM.createRoot(HtmlRoot);
  root.render(
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  );
}

