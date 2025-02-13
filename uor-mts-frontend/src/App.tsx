import React from "react";
import TrackingG from "./pages/TrackingG";
import TrackingL from "./pages/TrackingL";

const App: React.FC = () => {
  // Define the onClick handler function
  const handleClick = () => {
    alert("Button clicked!");
  };

  return (
    
      
      <TrackingG></TrackingG>
      
   
  );
};

export default App;