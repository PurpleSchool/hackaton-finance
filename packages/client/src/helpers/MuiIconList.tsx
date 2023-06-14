import WineBarIcon from "@mui/icons-material/WineBar";
import HomeIcon from "@mui/icons-material/Home";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import LiveTvIcon from "@mui/icons-material/LiveTv";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import KitchenIcon from "@mui/icons-material/Kitchen";

export const MuiIconList = [
  "WineBarIcon",
  "HomeIcon",
  "AirplanemodeActiveIcon",
  "DriveEtaIcon",
  "LiveTvIcon",
  "MedicalServicesIcon",
  "KitchenIcon",
];

export default function MuiIcons(props: { IconName: string; sx: object }) {
  const iconName = MuiIconList.includes(props.IconName)
    ? props.IconName
    : "No Icon Name";

  switch (iconName) {
    case "WineBarIcon":
      return <WineBarIcon sx={props.sx} />;
    case "HomeIcon":
      return <HomeIcon sx={props.sx} />;
    case "AirplanemodeActiveIcon":
      return <AirplanemodeActiveIcon sx={props.sx} />;
    case "DriveEtaIcon":
      return <DriveEtaIcon sx={props.sx} />;
    case "LiveTvIcon":
      return <LiveTvIcon sx={props.sx} />;
    case "MedicalServicesIcon":
      return <MedicalServicesIcon sx={props.sx} />;
    case "KitchenIcon":
      return <KitchenIcon sx={props.sx} />;
    case "No Icon name":
      return <DriveEtaIcon sx={props.sx} />;
  }
}
