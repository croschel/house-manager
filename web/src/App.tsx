import { BrowserRouter } from 'react-router-dom';
import { RoutesComponent } from './pages/routes';

function App() {
  // const dispatch = useAppDispatch();
  return (
    <div className="flex w-dvw h-dvh bg-zinc-800">
      <BrowserRouter>
        <RoutesComponent />
      </BrowserRouter>
    </div>
  );
}

export default App;
