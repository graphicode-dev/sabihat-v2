import { BrowserRouter as Router } from "react-router-dom";
import Providers from "./providers";
import AppRoutes from "./routes";
import {AuthInitializer} from "./components/auth/AuthInitializer";
function App() {
    return (
        <Providers>
            <AuthInitializer />
            <Router>
                <AppRoutes />
            </Router>
        </Providers>
    );
}

export default App;
