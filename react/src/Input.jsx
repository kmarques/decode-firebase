export default function Input(props) {
  const { variant, ...others } = props;
  return (
    <input
      style={{
        backgroundColor: variant === "filled" ? "lightblue" : "transparent",
        padding: "10px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        fontSize: "16px",
        width: "100%",
        boxSizing: "border-box",
        color: variant === "filled" ? "blue" : "white",
      }}
      {...others}
    />
  );
}
