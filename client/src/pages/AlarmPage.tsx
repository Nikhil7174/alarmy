// import { useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { CreateAlarm } from "../components/CreateAlarm";
import UpComingAlarm from "../components/UpComingAlarm";

export const AlarmPage = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  // const [data, setData] = useState(0);

  return (
    <div>
      <Navbar />
      <div>
        {/* <div id="upComingAlarm">
          <UpComingAlarm />
        </div> */}
        <h3 className="font-bold text-3xl my-5 mt-8 ml-4 md:mx-40 xl:mx-64">
          Your Alarms
        </h3>
      </div>
      <div
        id="alarm-container"
        className="min-h-fit p-10 md:m-10 bg-[#ffd5ff] md:mx-40 mx-4 xl:mx-64 rounded-lg flex flex-col"
      >
        <div id="create" className=" bottom-0 right-0">
          <CreateAlarm />
        </div>
      </div>
    </div>
  );
};
