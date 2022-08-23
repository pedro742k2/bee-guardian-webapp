import "./styles.scss";
import HiveIcon from "../../Assets/Icons/hive.png";
import { useEffect, useState } from "react";
import { URL } from "../../services/api";
import { FcInfo } from "react-icons/fc";
import { GrClose } from "react-icons/gr";
import { IPopup } from "../../App";

interface IHives {
  hive_id: number;
  hive_details: string;
  add_date: string;
}

interface IProps {
  token: string;
  updateSelectedHive: (hiveId: number) => void;
  selectedHive: number | undefined;
  updatePopup: (props: IPopup) => void;
}

export const HiveSelector = ({
  token,
  updateSelectedHive,
  selectedHive,
  updatePopup,
}: IProps) => {
  const [hives, setHives] = useState<IHives[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(URL + "/get-hives", {
        headers: {
          "Content-Type": "application/json",
          token: token,
        },
      });

      const res = await data.json();

      const { error } = res;

      if (error)
        return updatePopup({
          message: error,
          color: "red",
          duration: 5,
          duration_unit: "s",
        });

      return setHives(res);
    };

    if (token) {
      fetchData();
    }
  }, [token]);

  const handleRemoveHive = async (hive_id: number) => {
    if (token) {
      const prompt = confirm(`Remove hive ${hive_id}?`);

      if (prompt) {
        const data = await fetch(URL + "/remove-hive", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            token,
          },
          body: JSON.stringify({ hive_id }),
        });

        const res = await data.json();

        const { error } = res;

        if (error)
          return updatePopup({
            message: error,
            color: "red",
            duration: 5,
            duration_unit: "s",
          });

        document.location.reload();
      }
    }
  };

  return (
    <div className="hives-selector-container shadow-primary">
      <h2 className="hive-selector-title">Hive Selector</h2>

      <hr />

      <div className="hives-selector">
        {hives.length ? (
          hives?.map((hive) => {
            const { hive_id, hive_details, add_date } = hive;

            return (
              <div className="hive-badge" key={hive_id}>
                <div
                  className={`shadow-primary ${
                    selectedHive === hive_id ? "selected" : ""
                  }`}
                  onClick={() => updateSelectedHive(hive_id)}
                >
                  <h3>
                    <img src={HiveIcon} alt="Hive icon" />
                    {hive_details}
                  </h3>

                  <span>ID #{hive_id}</span>

                  <FcInfo
                    className="info-icon"
                    title={`Added at: ${new Date(add_date)}`}
                  />
                </div>

                <button
                  className="remove-btn"
                  onClick={() => handleRemoveHive(hive_id)}
                >
                  <GrClose className="close-icon" />
                  Remove
                </button>
              </div>
            );
          })
        ) : (
          <h3 className="no-hives">No hives added yet</h3>
        )}
      </div>

      {hives.length ? (
        <div className="hs-info-container">
          <p>Click on the blue icon to learn when was the hive added.</p>
        </div>
      ) : null}
    </div>
  );
};
