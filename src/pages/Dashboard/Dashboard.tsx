import "./Dashboard.scss";
import { useAuth } from "../../services/useAuth";
import { useState, useEffect, ChangeEvent } from "react";
import { URL } from "../../services/api";
import { IHiveData } from "../../Types/Hive";
import { IProps } from "../../routes";

// Components
import { HiveSelector } from "../../components/HiveSelector";
import { LastReadings } from "../../components/LastReadings";
import { AddHive } from "../../components/AddHive";
import { Charts } from "../../components/Charts";
import { GraphMenu } from "../../components/GraphMenu";

export const Dashboard = ({ updatePopup }: IProps) => {
  const { user } = useAuth();
  const [selectedHive, setSelectedHive] = useState<number | undefined>(
    undefined
  );
  const [hiveData, setHiveData] = useState<IHiveData>();
  const [type, setType] = useState<number>(1);
  const [targetedDate, setTargetedDate] = useState<string>();

  const updateSelectedType = (event: ChangeEvent<HTMLSelectElement>) =>
    setType(Number(event.target.value));

  const updateTargetedDate = (event: ChangeEvent<HTMLInputElement>) =>
    setTargetedDate(event.target.value);

  const clearDate = () => setTargetedDate(undefined);

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
          type,
          targetedDate,
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
  }, [selectedHive, type, targetedDate]);

  const updateSelectedHive = (hiveId: number) => {
    if (hiveId === selectedHive) return setSelectedHive(undefined);

    return setSelectedHive(hiveId);
  };

  return (
    <main className="dashboard-container">
      <h1 className="dashboard-title">
        Welcome back, <span>{user.profile.name}</span>
      </h1>

      <HiveSelector
        updatePopup={updatePopup}
        token={user.token}
        updateSelectedHive={updateSelectedHive}
        selectedHive={selectedHive}
      />

      <hr className="divider" />

      <div className="last-readings-and-add-hive-container">
        <LastReadings lastReadings={hiveData?.lastData[0]} />
        <AddHive updatePopup={updatePopup} token={user.token} />
      </div>

      <hr className="divider graph-divider" />

      <GraphMenu
        updateSelectedType={updateSelectedType}
        updateTargetedDate={updateTargetedDate}
        clearDate={clearDate}
      />
      <hr className="divider graph-divider" />
      <Charts selectedHive={selectedHive} data={hiveData?.data} />
    </main>
  );
};
