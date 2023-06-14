import MuiIcons from "../helpers/MuiIconList";

export default function CategoryIcon(props: { icon: string; color: string }) {
  const IconStyle = { color: "white", fontSize: 26 };

  return (
    <div
      style={{
        background: props.color || "gray",
        borderRadius: "50%",
        padding: "5px",
        aspectRatio: "1/1",
        width: "58px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {}
      <MuiIcons IconName={props.icon} sx={IconStyle} />
    </div>
  );
}
