const Notification = ({ text, isErrorMessage }) => {
  const succeededStyle = {
    color: "green",
    fontStyle: "normal",
    fontSize: 16,
  };
  const errorStyle = {
    color: "red",
    fontStyle: "italic",
    fontSize: 16,
  };
  const messageStyle = isErrorMessage ? errorStyle : succeededStyle;

  if (text === null) {
    return null
  }

  return (
    <div>
      <h2 style={messageStyle}>{text}</h2>
    </div>
  );
};
export default Notification;
