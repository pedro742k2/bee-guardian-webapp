import "./styles.scss";
import { URL } from "../../services/api";
import Open from "../../Assets/Icons/AddHive/open.svg";
import { ChangeEvent, useState } from "react";
import { IPopup } from "../Popup";

interface IProps {
  token: string;
  updatePopup: (props: IPopup) => void;
}

export const AddHive = ({ token, updatePopup }: IProps) => {
  const [showForm, setShowForm] = useState(false);
  const [hiveId, setHiveId] = useState<Number>();
  const [hiveDetails, setHiveDetails] = useState("");

  const updateShowForm = () =>
    setShowForm((currentShowForm) => !currentShowForm);

  const updateHiveId = (event: ChangeEvent<HTMLInputElement>) =>
    setHiveId(Number(event.target.value));

  const updateHiveDetails = (event: ChangeEvent<HTMLInputElement>) =>
    setHiveDetails(event.target.value);

  const handleAddHive = async () => {
    if (!hiveId || !hiveDetails.trim())
      return updatePopup({
        message: "Please fill both fields.",
        color: "yellow",
      });

    const data = await fetch(URL + "/add-hive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        token,
      },
      body: JSON.stringify({
        hive_id: Number(hiveId),
        hive_details: hiveDetails,
      }),
    });

    const res = await data.json();

    const { message, error } = res;

    if (error)
      return updatePopup({
        message: error,
        color: "yellow",
      });

    if (message === "This hive is already added") {
      return updatePopup({
        message: message,
        color: "yellow",
      });
    }

    return document.location.reload();
  };

  return (
    <main className="add-hive-container shadow-primary">
      <div className="add-hive-prompt">
        <h2>Add a Hive</h2>
        <img
          className={showForm ? "close" : ""}
          src={Open}
          alt={showForm ? "Close" : "Open"}
          onClick={updateShowForm}
        />
      </div>

      <div
        className={`${
          showForm ? "show" : "hide"
        } add-hive-form animate__animated animate__fadeIn`}
      >
        <hr className="divider container" />

        <div className="add-hive-inputs-container">
          <input
            className="shadow-primary"
            placeholder="Hive ID"
            type="number"
            onChange={updateHiveId}
          />
          <input
            className="shadow-primary"
            placeholder="Hive Description"
            type="text"
            onChange={updateHiveDetails}
          />
        </div>

        <button onClick={handleAddHive} className="primary-btn">
          Add
        </button>
      </div>
    </main>
  );
};
