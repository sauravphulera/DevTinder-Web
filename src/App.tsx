import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { appStore } from "./store/appStore";
import AuthWrapper from "./components/AuthWrapper";
import { ToastProvider } from "./components/shared/toast/ToastContext";

function App() {
  return (
    <>
      <Provider store={appStore}>
        <BrowserRouter basename="/">
          <ToastProvider>
            <AuthWrapper />
          </ToastProvider>
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
