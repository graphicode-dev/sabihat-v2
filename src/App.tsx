import { BrowserRouter as Router } from "react-router-dom";
import Providers from "./providers";
import AppRoutes from "./routes";
function App() {
    return (
        <Providers>
            <Router>
                <AppRoutes />
            </Router>
        </Providers>
    );
}

export default App;
