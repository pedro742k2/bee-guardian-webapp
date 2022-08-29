import { Router } from "./routes";
import { IPopup, IPopupInfo, Popup } from "./components/Popup";
import { useState } from "react";
import { Footer } from "./components/Footer";
import "animate.css";
import { AuthProvider } from "./utils/AuthProvider";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [popupInfo, setPopupInfo] = useState<IPopup>();

  const updatePopup = (popupProps: IPopup) => {
    setPopupInfo(popupProps);
    setShowPopup(true);

    setTimeout(() => {
      setShowPopup(false);

      let id = window.setTimeout(function () {}, 0);

      while (id--) {
        // will do nothing if no timeout with id is present
        window.clearTimeout(id);
      }
    }, 10000);

    return () => {};
  };

  const closePopup = () => setShowPopup(false);

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
