import { useEffect, useState } from "react";
import WeddingRSVP from "./WeddingRSVP";

export default function App() {
  return (
    <div>
      <WeddingRSVP name={window.location.search.substring(6)}/>
    </div>
  );
}
