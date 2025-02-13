import React from "react";
import TrackingG from "./pages/TrackingG";
import TrackingL from "./pages/TrackingL";


const App: React.FC = () => (
  <div>
    <TrackingG /> //This will render the TrackingG component(For Gayan)
    <TrackingL /> //This will render the TrackingL component(For Layan)
  </div>
);


export default App;
