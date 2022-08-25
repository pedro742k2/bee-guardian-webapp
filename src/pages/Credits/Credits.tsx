// Logo Icon + License
import BeeIcon from "../../Assets/Icons/bee.png";
import BeeLicense from "../../Assets/Licenses/bee-logo.pdf";
// Hive Icon + License
import HiveIcon from "../../Assets/Icons/hive.png";
import HiveLicense from "../../Assets/Licenses/bee-hive.pdf";
// Credits Icon + License
import CreditsIcon from "../../Assets/Icons/credits.png";
import CreditsLicense from "../../Assets/Licenses/credits.pdf";
// Dashboard Navigation Icon + License
import DashboardNavIcon from "../../Assets/Icons/dashboard-nav.png";
import DashboardNavLicense from "../../Assets/Licenses/dashboard-nav.pdf";
// Last Readings Icons
import WeightIcon from "../../Assets/Icons/LastReadings/weight.png";
import IntTempIcon from "../../Assets/Icons/LastReadings/int_temp.png";
import ExtTempIcon from "../../Assets/Icons/LastReadings/ext_temp.png";
import HumidityIcon from "../../Assets/Icons/LastReadings/humidity.png";
import BatteryIcon from "../../Assets/Icons/LastReadings/battery.png";
import SPVIcon from "../../Assets/Icons/LastReadings/spv.png";
// Last Readings Licenses
import WeightLicense from "../../Assets/Licenses/weight.pdf";
import IntTempLicense from "../../Assets/Licenses/int_temp.pdf";
import ExtTempLicense from "../../Assets/Licenses/ext_temp.pdf";
import HumidityLicense from "../../Assets/Licenses/humidity.pdf";
import BatteryLicense from "../../Assets/Licenses/battery.pdf";
import SPVLicense from "../../Assets/Licenses/spv.pdf";
// Line Chart Icon + License
import LineChartIcon from "../../Assets/Icons/line-chart.png";
import LineChartLicense from "../../Assets/Licenses/line-chart.pdf";
// Chart Options Icon + License
import ChartConfigIcon from "../../Assets/Icons/chart-options.png";
import ChartConfigLicense from "../../Assets/Licenses/chart-opt.pdf";
// Hive Notes Icon + License
import HiveNotesIcon from "../../Assets/Icons/notes.png";
import HiveNotesLicense from "../../Assets/Licenses/notes.pdf";

import "./styles.scss";
import "./responsive.scss";

export const Credits = () => {
  const renderImgCredit = (
    description: string,
    author: string,
    icon: string,
    license: string
  ) => (
    <div className="icon-credits-box shadow-primary">
      <p>
        Author's Description: <span>{description}</span>
      </p>
      <p>
        Licensor's Author: <span>{author}</span>
      </p>

      <div className="license-container">
        <img src={icon} alt={description} />
        <a href={license} download>
          Download license
        </a>
      </div>
    </div>
  );

  return (
    <main className="credits-main">
      <h1>
        <img src={CreditsIcon} alt="Credits" />
        Credits
      </h1>

      <h3 className="people-attr">
        This page is developed and maintained by{" "}
        <span className="author-name">
          <a href="https://github.com/pedro742k2">Pedro Batista</a>
        </span>
        .
      </h3>

      <hr className="divider" />

      <h2>Icon Credit Attributions</h2>
      <div className="icon-credits-container">
        {renderImgCredit("Bee", "Madness", BeeIcon, BeeLicense)}
        {renderImgCredit(
          "Navigation",
          "Freepik",
          DashboardNavIcon,
          DashboardNavLicense
        )}
        {renderImgCredit("Hive", "Freepik", HiveIcon, HiveLicense)}
        {renderImgCredit("Essay", "Freepik", CreditsIcon, CreditsLicense)}

        {renderImgCredit(
          "Weighing machine",
          "Good Ware",
          WeightIcon,
          WeightLicense
        )}
        {renderImgCredit("Thermometer", "Freepik", IntTempIcon, IntTempLicense)}
        {renderImgCredit("Hot", "Freepik", ExtTempIcon, ExtTempLicense)}
        {renderImgCredit("Humidity", "Freepik", HumidityIcon, HumidityLicense)}
        {renderImgCredit("Battery", "Freepik", BatteryIcon, BatteryLicense)}
        {renderImgCredit("Solar cell", "small.smiles", SPVIcon, SPVLicense)}

        {renderImgCredit(
          "Line chart",
          "Freepik",
          LineChartIcon,
          LineChartLicense
        )}
        {renderImgCredit(
          "Time",
          "Freepik",
          ChartConfigIcon,
          ChartConfigLicense
        )}

        {renderImgCredit("Notes", "Freepik", HiveNotesIcon, HiveNotesLicense)}
      </div>
    </main>
  );
};
