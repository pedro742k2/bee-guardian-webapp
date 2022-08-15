import { Router } from "./routes";
import { IPopupInfo, Popup } from "./components/Popup";
import { useState } from "react";
import { Footer } from "./components/Footer";
import "animate.css";
import { AuthProvider } from "./utils/AuthProvider";

export interface IPopup extends IPopupInfo {
  duration: number;
  duration_unit: string;
}

function App() {
  // Alterar para (false) por padrão
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState<IPopupInfo>();

  const updatePopup = (popupProps: IPopup) => {
    const { duration, duration_unit, ...rest } = popupProps;
    setShowPopup(true);
    setPopupInfo(rest);

    const timeout = duration_unit === "s" ? duration * 1000 : duration;

    setTimeout(() => {
      setShowPopup(false);

      let id = window.setTimeout(function () {}, 0);

      while (id--) {
        // will do nothing if no timeout with id is present
        window.clearTimeout(id);
      }
    }, timeout);
  };

  return (
    <AuthProvider>
      <div className="App">
        <Router updatePopup={updatePopup} />
        <Footer />
        {showPopup ? (
          <Popup
            message={popupInfo?.message || ""}
            color={popupInfo?.color || "green"}
          />
        ) : null}
      </div>
    </AuthProvider>
  );
}

export default App;
