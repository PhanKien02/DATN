import "./App.css";
import { AuthContextProvider } from "./contexts/authContext";
import { AppRouter } from "./routers/router";

function App() {
     return (
          <AuthContextProvider>
               <AppRouter />
          </AuthContextProvider>
     );
}

export default App;
