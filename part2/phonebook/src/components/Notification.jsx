import '../index.css';
const Notification = ({ message, msgtype }) => {
  if (message === null) return null;

  return <div className={msgtype}>{message}</div>;
};

export default Notification;
