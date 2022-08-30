import { Router } from "./routes";
import { IPopup, IPopupInfo, Popup } from "./components/Popup";
import { useState } from "react";
import { Footer } from "./components/Footer";
import "animate.css";
import { AuthProvider } from "./utils/AuthProvider";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState<IPopup>();

  const clearTimeouts = () => {
    let id = window.setTimeout(function () {}, 0);

    while (id--) {
      console.log(`Cleared timeout #${id}`);
      // will do nothing if no timeout with id is present
      window.clearTimeout(id);
    }
  };

  const updatePopup = (popupProps: IPopup) => {
    clearTimeouts();
    setPopupInfo(popupProps);
    setShowPopup(true);

    setTimeout(() => {
      clearTimeouts();
      setShowPopup(false);
    }, 10000);

    return () => {
      clearTimeouts();
    };
  };

  const closePopup = () => {
    clearTimeouts();
    setShowPopup(false);
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
            closePopup={closePopup}
          />
        ) : null}
      </div>
    </AuthProvider>
  );
}

export default App;
