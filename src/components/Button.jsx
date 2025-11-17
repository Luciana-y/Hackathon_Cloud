export default function Button({ children, onClick, type = "button" }) {
  return (
    <button onClick={onClick} type={type} style={styles.button}>
      {children}
    </button>
  );
}

const styles = {
  button: {
    width: "100%",
    padding: "15px",
    fontSize: "18px",
    backgroundColor: "#006eff",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: "15px",
  }
};
