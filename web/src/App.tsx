import { Button } from "./components/ui/button";
import { useAppDispatch } from "./reducers";
import { increment } from "./reducers/app/actions";

function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="flex bg-background">
      <Button onClick={() => dispatch(increment())}>Buttton</Button>
    </div>
  );
}

export default App;
