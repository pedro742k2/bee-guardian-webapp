import "./Dashboard.scss";
import { useAuth } from "../../services/useAuth";
import { useState, useEffect, MouseEventHandler } from "react";
import { URL } from "../../services/api";
import { IHiveData } from "../../Types/Hive";
import { IProps } from "../../routes";
// Components
import { HiveSelector } from "../../components/HiveSelector";
import { LastReadings } from "../../components/LastReadings";
import { AddHive } from "../../components/AddHive";

export const Dashboard = ({ updatePopup }: IProps) => {
  const { user } = useAuth();
  const [selectedHive, setSelectedHive] = useState<number | undefined>(
    undefined
  );
  const [hiveData, setHiveData] = useState<IHiveData | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(URL + "/get-hive-data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
        body: JSON.stringify({
          hive_id: selectedHive,
          type: 1,
          targetedDate: null,
        }),
      });

      const res = await data.json();

      const { error } = res;

      if (error) {
        setHiveData(undefined);
        return updatePopup({
          message: error,
          color: "red",
          duration: 5,
          duration_unit: "s",
        });
      }

      setHiveData(res);
    };

    if (selectedHive) {
      fetchData();
    } else {
      setHiveData(undefined);
    }
  }, [selectedHive]);

  const updateSelectedHive = (hiveId: number) => {
    if (hiveId === selectedHive) return setSelectedHive(undefined);

    return setSelectedHive(hiveId);
  };

  return (
    <main className="dashboard-container">
      <HiveSelector
        updatePopup={updatePopup}
        token={user.token}
        updateSelectedHive={updateSelectedHive}
        selectedHive={selectedHive}
      />

      <div className="last-readings-and-add-hive-container">
        <LastReadings lastReadings={hiveData?.lastData[0]} />
        <AddHive updatePopup={updatePopup} token={user.token} />
      </div>
    </main>
  );
};
