import { useRoutes } from 'react-router-dom';
import RootRoutes from './routes/Routes';
import '~/styles/font.css';

function App() {
    const router = useRoutes(RootRoutes);
    return router;
}

export default App;
