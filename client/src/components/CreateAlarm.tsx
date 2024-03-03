//@ts-nocheck
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Alarm from "./alarm";
import { getAlarms, createAlarms } from "../redux/actions/alarm";
import { alarmReducer } from "../redux/reducers/alarmReducer";
import { useSelector } from "react-redux";
import { deleteAlarm, updateAlarm } from "../redux/actions/alarm";
export const CreateAlarm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();
  const [createAlarmModal, setCreateAlarmModal] = useState(false);
  const [alarms, setAlarms] = useState([]);
  const [id, setId] = useState("");

  // const status = useSelector((state) => state.alarms.status);
  // const error = useSelector((state) => state.alarms.error);
  const user = useSelector((state) => state.userReducer.token);
  // console.log(user, "user");

  const [selectedHour, setSelectedHour] = useState("");
  const [showHours, setShowHours] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");
  const [showZone, setShowZone] = useState(false);
  const [selectedMin, setSelectedMin] = useState("");
  const [showMins, setShowMins] = useState(false);
  const [toggle, onToggle] = useState(true);
  const [notify, setNotify] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [update, setUpdate] = useState(false);
  const [isSet, setIsSet] = useState(true);
  const formatNumber = (number: number) =>
    number < 10 ? `0${number}` : number;
  // Assume hours are in 24-hour format (00 to 23)
  const hours = Array.from({ length: 13 }, (_, index) => formatNumber(index));

  // Minutes are in the range of 0 to 59
  const minutes = Array.from({ length: 60 }, (_, index) => formatNumber(index));

  // AM/PM options
  const zones = ["am", "pm"];

  // const alarmsState = useSelector((state: any) => state.alarm.alarms);

  // useEffect(() => {
  //   getAlarms(dispatch);
  // }, [dispatch]);

  const handleZoneChange = (e) => {
    setSelectedZone(e.target.value);
  };

  const toggleZone = () => {
    setShowZone(!showZone);
  };

  const handleHourChange = (e) => {
    setSelectedHour(e.target.value);
  };

  const toggleHours = () => {
    setShowHours(!showHours);
  };
  const handleMinChange = (e) => {
    setSelectedMin(e.target.value);
  };

  const toggleMins = () => {
    setShowMins(!showMins);
  };

  // const handleEdit = (index) => {
  //   const editedAlarm = alarms[index];
  //   setEditingIndex(index);
  //   setSelectedHour(editedAlarm.time.split(":")[0]);
  //   setSelectedMin(editedAlarm.time.split(":")[1].split(" ")[0]);
  //   setSelectedZone(editedAlarm.time.split(" ")[1]);
  //   setName(editedAlarm.name);
  //   setDescription(editedAlarm.description);
  //   setIsSet(editedAlarm.isSet);
  //   setCreateAlarm(true);
  // };

  // ... (other functions)

  const handleCreate = () => {
    setCreateAlarmModal(true);
    setUpdate(false);
    const editedAlarm = {
      time: selectedHour + ":" + selectedMin + " " + selectedZone,
      name: name,
      description: description,
      isSet: true,
    };

    dispatch(createAlarms(editedAlarm));

    // Clear the form
    setSelectedHour("");
    setSelectedMin("");
    setSelectedZone("");
    setName("");
    setDescription("");

    // Close the form
    setCreateAlarmModal(false);
  };

  ////
  const { loading, error, data } = useSelector(
    (state: any) => state.alarmReducer
  );
  // console.log(data);
  // const [notes, setNotes] = useState([]);
  // const { isOpen, onOpen, onClose } = useDisclosure();

  // const initialRef = useRef(null);
  // const finalRef = useRef(null);

  useEffect(() => {
    dispatch(getAlarms());
  }, []);

  useEffect(() => {
    setAlarms(data);
  }, [data]);

  const createNote = () => {
    dispatch(createNotes({ title, body }));
    onClose();
  };

  const userAlarms = useSelector((state: any) => state.alarmReducer);
  // console.log(userAlarms, "userAlarms");

  useEffect(() => {
    // Fetch user-specific alarms when the component mounts
    dispatch(getAlarms());
  }, [dispatch]);
  return (
    <div>
      <div id="createalarm">
        <div className={`${notify ? "block" : "hidden"} p-10 m-5 bg-green-500`}>
          Alarm ringing ........
        </div>
        <div
          id="alarmModal"
          className={`${createAlarmModal ? "block" : "hidden"}`}
        >
          <div
            className="relative z-10"
            aria-labelledby="modal-title"
            role="dialog"
            aria-modal="true"
          >
            <div className="fixed inset-0 bg-transparent bg-opacity-75 transition-opacity"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto overflow-x-auto">
              <div className="flex min-h-full min-w-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-[#f8e6ff] px-4 pb-4 pt-5 sm:p-6 sm:pb-4 h-[30rem]">
                    <div className="sm:flex sm:items-start flex flex-col">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left ">
                        <h3
                          className="text-base font-semibold leading-6 text-gray-900 mb-4"
                          id="modal-title"
                        >
                          Create Alarm
                        </h3>
                      </div>
                      <form onSubmit={handleCreate} className="md:space-y-8">
                        <div id="formContainer" className="flex flex-col">
                          <div id="upContainer" className="flex ">
                            <div className="mb-4 flex flex-row space-x-32">
                              <div id="right">
                                <div className="w-32 flex flex-auto text-gray-900">
                                  <div className="w-64 mx-auto mt-8">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                      Hour
                                    </label>
                                    <div className="relative">
                                      <div
                                        className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight cursor-pointer"
                                        onClick={toggleHours}
                                      >
                                        {selectedHour !== ""
                                          ? selectedHour
                                          : "Hour"}
                                      </div>
                                      {showHours && (
                                        <div className="absolute mt-1 bg-white border border-gray-300 w-full max-h-28 overflow-y-auto rounded shadow">
                                          {hours.map((hour) => (
                                            <div
                                              key={hour}
                                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                              onClick={() => {
                                                handleHourChange({
                                                  target: { value: hour },
                                                });
                                                toggleHours();
                                              }}
                                            >
                                              {hour}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                  <div id="min" className="w-64 mx-auto mt-8">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                      Min
                                    </label>
                                    <div className="relative">
                                      <div
                                        className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight cursor-pointer"
                                        onClick={toggleMins}
                                      >
                                        {selectedMin !== ""
                                          ? selectedMin
                                          : "Min"}
                                      </div>
                                      {showMins && (
                                        <div className="absolute mt-1 bg-white border border-gray-300 w-full max-h-28 overflow-y-auto rounded shadow">
                                          {minutes.map((hour) => (
                                            <div
                                              key={hour}
                                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                              onClick={() => {
                                                handleMinChange({
                                                  target: { value: hour },
                                                });
                                                toggleMins();
                                              }}
                                            >
                                              {hour}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div id="left">
                                <div className="w-32 flex flex-auto">
                                  <div id="min" className="w-64 mx-auto mt-8">
                                    <label className="block text-gray-700 text-sm font-bold mb-2">
                                      am/pm
                                    </label>
                                    <div className="relative mr-16">
                                      <div
                                        className="appearance-none w-full bg-white border border-gray-300 hover:border-gray-500 px-4 py-2 rounded shadow leading-tight cursor-pointer "
                                        onClick={toggleZone}
                                      >
                                        {selectedZone !== ""
                                          ? selectedZone
                                          : "am/pm"}
                                      </div>
                                      {showZone && (
                                        <div className="absolute mt-1 bg-white border border-gray-300 w-full max-h-28 overflow-y-auto rounded shadow">
                                          {zones.map((z) => (
                                            <div
                                              key={z}
                                              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                                              onClick={() => {
                                                handleZoneChange({
                                                  target: { value: z },
                                                });
                                                toggleZone();
                                              }}
                                            >
                                              {z}
                                            </div>
                                          ))}
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div id="downContainer">
                            <div className="mb-4">
                              <label
                                htmlFor="username"
                                className="block text-sm font-medium text-gray-600"
                              >
                                Name
                              </label>
                              <input
                                type="text"
                                id="username"
                                name="username"
                                className="mt-1 p-2 w-[35vw] lg:w-[21vw] border rounded-md"
                                required
                                value={name}
                                onChange={(e: any) => setName(e.target.value)}
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="text"
                                className="block text-sm font-medium text-gray-600"
                              >
                                Description
                              </label>
                              <textarea
                                rows={4}
                                id="description"
                                name="description"
                                className="mt-1 p-2 w-[35vw] lg:w-[21vw] border rounded-md"
                                required
                                value={description}
                                onChange={(e: any) =>
                                  setDescription(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="bg-[#4c3264] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <div className={`${update ? "hidden" : "block"}`}>
                      <button
                        onClick={handleCreate}
                        type="button"
                        className={`${
                          update ? "hidden" : "block"
                        }inline-flex w-full justify-center bg-gradient-to-r from-indigo-500 to-pink-400 ...  p-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto`}
                      >
                        {/* {update == false ? "Create" : "Update"} */}Create
                      </button>
                    </div>
                    <div className={`${update ? "block" : "hidden"}`}>
                      <button
                        onClick={() => {
                          dispatch(
                            updateAlarm(id, {
                              name: name,
                              description: description,
                              isSet: isSet,
                              time:
                                selectedHour +
                                ":" +
                                selectedMin +
                                " " +
                                selectedZone,
                            })
                          );
                          setCreateAlarmModal(!createAlarmModal);
                          setUpdate(false);
                        }}
                        type="button"
                        className={`${
                          update ? "block" : "hidden"
                        }inline-flex w-full justify-center bg-gradient-to-r from-indigo-500 to-pink-400 ...  p-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto`}
                      >
                        {/* {update == false ? "Create" : "Update"} */}Update
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        setCreateAlarmModal(!createAlarmModal);
                        setUpdate(false);
                      }}
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div id="createdAlarms">
          {/* {status === "loading" && <p>Loading alarms...</p>}
          {status === "failed" && <p>Error fetching alarms: {error}</p>}
          {status === "succeeded" && */}

          {alarms.map((alarm, index) => (
            <Alarm
              key={index}
              time={alarm.time}
              description={alarm.description}
              isSet={alarm.isSet}
              name={alarm.name}
              notify={setNotify}
              onToggle={(newState) => {
                setAlarms((prevAlarms) =>
                  prevAlarms.map((a, i) =>
                    i === index ? { ...a, isSet: newState } : a
                  )
                );
              }}
              onEdit={() => {
                // handleEdit(index);
                // setUpdate(true);

                setCreateAlarmModal(true);
                setUpdate(true);
                console.log(alarm, alarm._id, "alarmmmmmm");
                setId(alarm._id);
              }}
              onDelete={() => {
                const updatedAlarms = [...alarms];
                updatedAlarms.splice(index, 1);
                setAlarms(updatedAlarms);
                dispatch(deleteAlarm(alarm._id));
              }}
            />
          ))}
        </div>
        <div id="createAlarmButton">
          <button
            onClick={() => {
              setCreateAlarmModal(!createAlarmModal);
            }}
            className="py-3 cursor-pointer px-4 bg-white rounded-3xl"
          >
            create
          </button>
        </div>
      </div>
    </div>
  );
};
