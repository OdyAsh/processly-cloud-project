import AllowAccessToPage from "../AllowAccessToPage";

const StHomePage = () => {
  return (
    <>
      <AllowAccessToPage role={"st"} />
      <div className="row-center-content">
        <h1 style={{ fontSize: "3vw", marginTop: "20vh" }}>
          Please choose an action from the navigation bar
        </h1>
      </div>
    </>
  );
};

export default StHomePage;
