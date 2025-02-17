import PublicRoutes from './PublicRoutes';
import { PrivateRoutes } from './PrivateRoutes';

const RootRoutes = [...PublicRoutes, ...PrivateRoutes];

export default RootRoutes;
