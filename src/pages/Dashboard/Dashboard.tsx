import "./Dashboard.scss";
import "./responsive.scss";
import { useAuth } from "../../services/useAuth";
import { useState, useEffect, useRef, ChangeEvent, Fragment } from "react";
import { URL } from "../../services/api";
import { IHiveData } from "../../Types/Hive";
import { IProps } from "../../routes";

// Components
import { HiveSelector } from "../../components/HiveSelector";
import { LastReadings } from "../../components/LastReadings";
import { AddHive } from "../../components/AddHive";
import { Charts } from "../../components/Charts";
import { GraphMenu } from "../../components/GraphMenu";
import { HiveNotes } from "../../components/HiveNotes";
import { DashboardMenu } from "../../components/DashboardMenu";
import { Rings } from "react-loader-spinner";

const scrollToRef = (ref: any) =>
  window.scrollTo(0, ref.current.offsetTop - 30);

export const Dashboard = ({ updatePopup }: IProps) => {
  const { user, isPending } = useAuth();
  const [selectedHive, setSelectedHive] = useState<number | undefined>(
    undefined
  );
  const [hiveData, setHiveData] = useState<IHiveData>();
  const [type, setType] = useState<number>(1);
  const [targetedDate, setTargetedDate] = useState<string>();
  const [pending, setPending] = useState(false);

  const updateSelectedType = (event: ChangeEvent<HTMLSelectElement>) =>
    setType(Number(event.target.value));

  const updateTargetedDate = (event: ChangeEvent<HTMLInputElement>) =>
    setTargetedDate(event.target.value);

  const clearDate = () => setTargetedDate(undefined);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setPending(true);

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

        setPending(false);

        if (error) {
          setHiveData(undefined);
          return updatePopup({
            message: error,
            color: "red",
          });
        }

        setHiveData(res);
      } catch (error) {
        setPending(false);
        alert(error);
      }
    };

    if (selectedHive) {
      fetchData();
    } else {
      setHiveData(undefined);
    }
  }, [selectedHive, type, targetedDate]);

  useEffect(() => {
    setPending(isPending);
  }, [isPending]);

  const updateSelectedHive = (hiveId: number) => {
    if (hiveId === selectedHive) return setSelectedHive(undefined);

    return setSelectedHive(hiveId);
  };

  const hiveSelRef = useRef(null);
  const lrAhRef = useRef(null);
  const chartOptRef = useRef(null);
  const chartsRef = useRef(null);
  const notesRef = useRef(null);

  const executeScroll = (ref: string) => {
    switch (ref) {
      case "0":
        scrollToRef(hiveSelRef);
        break;
      case "1":
        scrollToRef(lrAhRef);
        break;
      case "2":
        scrollToRef(chartOptRef);
        break;
      case "3":
        scrollToRef(chartsRef);
        break;
      case "4":
        scrollToRef(notesRef);
        break;
      default:
        alert("Invalid dashboard navigation");
    }
  };

  return (
    <main className="dashboard-container">
      <div className="loading-animation-container">
        <Rings
          height="80"
          width="80"
          color="#FF5500"
          radius="6"
          wrapperStyle={{}}
          wrapperClass=""
          visible={pending}
          ariaLabel="rings-loading"
        />
      </div>

      <h1 className="dashboard-title">
        Welcome back, <span>{user.profile.name}</span>
      </h1>

      <hr className="divider" />

      <DashboardMenu executeScroll={executeScroll} />

      <hr className="divider" ref={hiveSelRef} />

      <HiveSelector
        updatePopup={updatePopup}
        token={user.token}
        updateSelectedHive={updateSelectedHive}
        selectedHive={selectedHive}
      />

      <hr className="divider" ref={lrAhRef} />

      <div className="last-readings-and-add-hive-container">
        <LastReadings lastReadings={hiveData?.lastData[0]} />
        <AddHive updatePopup={updatePopup} token={user.token} />
      </div>

      <hr className="divider" ref={chartOptRef} />

      <GraphMenu
        updateSelectedType={updateSelectedType}
        updateTargetedDate={updateTargetedDate}
        clearDate={clearDate}
      />
      <hr className="divider" ref={chartsRef} />
      <Charts selectedHive={selectedHive} data={hiveData?.data} />

      {selectedHive ? (
        <Fragment>
          <hr className="divider" ref={notesRef} />

          <HiveNotes
            updatePopup={updatePopup}
            token={user.token}
            selectedHive={selectedHive}
          />
        </Fragment>
      ) : null}
    </main>
  );
};
