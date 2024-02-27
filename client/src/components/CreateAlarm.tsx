import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Select, Option } from "@material-tailwind/react";
export const CreateAlarm = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [createAlarm, setCreateAlarm] = useState(false);
  const time = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
    21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39,
    40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58,
    59,
  ];

  const handleCreate = () => {
    setCreateAlarm(!createAlarm);
  };
  const handleClick = () => {};
  return (
    <div>
      <div id="createalarm">
        <div id="alarmModal" className={`${createAlarm ? "block" : "hidden"}`}>
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
                      <form onSubmit={handleClick} className="md:space-y-8">
                        <div id="formContainer" className="flex flex-col">
                          <div id="upContainer" className="flex ">
                            <div className="mb-4 flex flex-row space-x-32">
                              <div id="right">
                                <div className="w-32 flex flex-auto text-gray-900">
                                  <Select
                                    //   variant="outlined"
                                    label="hours"
                                    color="blue"
                                  >
                                    {time.map((m: number) => (
                                      <Option>{m}</Option>
                                    ))}
                                  </Select>
                                </div>
                                <div className="w-32 flex flex-auto">
                                  <Select
                                    //   variant="outlined"
                                    label="mins"
                                  >
                                    {time.map((m: number) => (
                                      <Option>{m}</Option>
                                    ))}
                                  </Select>
                                </div>
                              </div>
                              <div id="left">
                                <div className="w-32 flex flex-auto">
                                  <Select
                                    //   variant="outlined"
                                    label="am/pm"
                                  >
                                    <Option>am</Option>
                                    <Option>pm</Option>
                                  </Select>
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
                                className="mt-1 p-2 w-[35vw] border rounded-md"
                                required
                                onChange={(e: any) =>
                                  setUsername(e.target.value)
                                }
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
                                className="mt-1 p-2 w-[35vw] border rounded-md"
                                required
                                onChange={(e: any) =>
                                  setPassword(e.target.value)
                                }
                              />
                            </div>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="bg-[#4c3264] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center bg-gradient-to-r from-indigo-500 to-pink-400 ...  p-2 rounded-md px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 sm:ml-3 sm:w-auto"
                    >
                      Create
                    </button>
                    <button
                      onClick={handleCreate}
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
        <div id="createAlarmButton">
          <button onClick={handleCreate} className="p-4 bg-orange-500">
            create
          </button>
        </div>
      </div>
    </div>
  );
};
