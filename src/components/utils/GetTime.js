const GetTime = () => {
  let today = new Date();
  let time =
    today.getHours() +
    "H:" +
    today.getMinutes() +
    "M:" +
    today.getSeconds() +
    "S";
  return time;
};

export default GetTime;
