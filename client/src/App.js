import Navbar from "./compoments/Navbar/Navbar";
import Main from "./compoments/MainPage/Main";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { getRouteResults } from "./utils/routes";
import {useState} from "react";

function App() {
  const [products, setProducts] = useState([])
 
  const initializeProps = (route) => {
    const prop = route.props ? { ...route.props } : {};
    return (route.component)(prop);
  };

  return (
    <BrowserRouter>
      <div className="w-full h-screen select-none">
        <Navbar/>
        <Switch>
          {getRouteResults().filter(result => result.route.component !== null).map((result, id) => (<Route key={id} exact render={result.render} path={result.path} component={() => initializeProps(result.route)} />))}
          <Main/>
        </Switch>
      </div>
    </BrowserRouter>

  );
}

export default App;
