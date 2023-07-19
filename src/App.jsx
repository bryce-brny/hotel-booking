import { Search } from "lucide-react";
import { Label } from "./components/ui/label";
import { DownIcon } from "./icons/index";
import { Input } from "./components/ui/input";
import ProvinceSearch from "./components/ProvinceSearch";
import backgroundImage from "./assets/background.jpg";
import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import Example from "./components/ProvinceSearch";
import {
  AiFillHome,
  AiOutlineSearch,
  AiOutlineHeart,
  AiFillStar,
  AiOutlineStar,
  AiFillCar,
  AiOutlineWifi,
} from "react-icons/Ai";
import { BsPerson, BsCarFrontFill, BsThreeDots } from "react-icons/Bs";
import { FaHotel, FaShower } from "react-icons/Fa";
import { MdFlightTakeoff } from "react-icons/Md";
import { GiWineBottle } from "react-icons/Gi";
import { IoIosFitness } from "react-icons/Io";
import Province from "./components/ProvinceSearch";
import Passenger from "./components/PassengerSearch";
import mockData from "./data/MOCK_DATA.json";
import validateInput from "./validators/validate";
import InputErrorMessage from "./components/inputErrorMessage";

const handleClick = (el, index) => {
  console.log(mockData[index].id);
};

const initialValue = {
  province: "Dongshan",
  due_date: "",
  // dateEnd: "",
  // passenger: "",
};

function App() {
  const [datas, setDatas] = useState(mockData);
  // console.log("datas", [datas]);
  const [searchValue, setSearchValue] = useState("");
  console.log(searchValue);
  const [input, setInput] = useState(initialValue);
  // const [province, setProvince] = useState("");
  const [selected, setSelected] = useState("");
  const [selected1, setSelected1] = useState("");
  const [error, setError] = useState({});

  const handleChangeInput = (e) => {
    console.log(e.target.value);
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleChangeText = (e) => {
    setSearchValue(e.target.value);
    handleSearch(e.target.value);
  };

  const handleSearch = (searchText) => {
    const newData = mockData.filter((dataObj) =>
      dataObj?.hotel_name.toLowerCase().includes(searchText.toLowerCase())
    );
    // console.log("ddddddd", newData);
    setDatas(newData);
  };

  const submitForm = async (e) => {
    // console.log("hello");
    // console.log(input);
    e.preventDefault();
    const result = validateInput(input);
    if (result) {
      return setError(result);
    }
    const filterResult = filterCondition(mockData, input);
    setDatas(filterResult);

    // console.log(result, "sssss");
    // input.province = selected;
    // const filterResult = filterCondition(mockData, input);
    // setDatas(filterResult);

    // input.due_date = selected1;
    // console.log("youuuuu", input.due_date);
  };

  const filterCondition = (data, input) => {
    const result = data.filter((el) => {
      const checkProvince = el.province == input.province;
      const checkDuedate = el.due_date == removeTimeFromDate(input.due_date);
      // console.log(removeTimeFromDate(input.due_date));
      // console.log(checkDuedate);
      // const checkPassenger = el.Passenger <= input.Passenger
      // console.log("bbb", checkProvince);
      return checkProvince && checkDuedate;

      // return checkProvince;
    });
    return result;
  };

  function removeTimeFromDate(dateTimeString) {
    const datePart = dateTimeString.split("T")[0];
    return datePart;
  }

  //   const dateTimeString = '2023-07-14T16:43:00';
  // const dateOnly = removeTimeFromDate(dateTimeString);
  // console.log(dateOnly); // Output: 2023-07-14

  return (
    <div>
      <div className="grid grid-cols-15 w-100vw h-100vh">
        <div className="col-start-1 col-span-1 bg-blue-600 flex flex-col text-center rounded-r-3xl">
          <div className="mt-64 mb-64 md:flex flex-col gap-20 hidden">
            <div className="flex flex-col justify-center">
              <AiFillHome className="text-white ml-16" />
              <div className="text-white mr-2">Home</div>
            </div>
            <div className="flex flex-col justify-center">
              <div>
                <AiOutlineSearch className="text-white ml-16" />
              </div>
              <div className="text-white">Explore</div>
            </div>
            <div>
              <AiOutlineHeart className="text-white ml-16" />
              <div className="text-white mr-2">Trip</div>
            </div>
            <div>
              <div>
                <BsPerson className="text-white ml-16" />
              </div>
              <div className="text-white mr-2">Profile</div>
            </div>
          </div>
        </div>

        <div className="col-start-2 col-span-1 bg-white">
          <div className="h-[400px]">
            <div className="h-24 ">
              <div className="mt-12 flex flex-col items-center ">
                <input
                  type="text"
                  className="w-[90%] rounded-xl h-10 border border-slate-300"
                  placeholder="  search Hotel"
                  value={searchValue}
                  onChange={handleChangeText}
                  // onSearchText={handleSearch}
                ></input>
              </div>
            </div>

            <form className="" onSubmit={submitForm}>
              <div className="text-4xl ml-5 ">what are you looking for ? </div>

              <div className=" flex justify-center gap-40 mt-8 items-baseline ">
                <div className="flex-col justify-center ">
                  <div>
                    <FaHotel className="ml-2.5 text-blue-600" />
                  </div>
                  <div className="text-blue-600 ">Hotel</div>
                </div>
                <div>
                  <div>
                    <MdFlightTakeoff className="ml-2 text-xl text-blue-600" />
                  </div>
                  <div className="text-blue-600">Flight</div>
                </div>
                <div>
                  <div>
                    <BsCarFrontFill className="ml-0.5 text-xl text-blue-600" />
                  </div>
                  <div className="text-blue-600">Car</div>
                </div>
              </div>

              <div className="flex flex-col w-full">
                <Label
                  htmlFor="Province"
                  className=" text-darkbluecute text-left mb-1 ml-16"
                >
                  Province
                </Label>

                <div className="flex justify-center">
                  {/* <Province
                  // setSelected={setSelected}
                  // selected={selected}
                  onChamge={handleChangeInput}
                  /> */}
                  <select
                    name="province"
                    onChange={handleChangeInput}
                    className="w-5/6 rounded-md h-9 border border-slate-300"
                    isInvalid={error.province}
                  >
                    <option value="Dongshan">Dongshan</option>
                    <option value="Rufino">Rufino</option>
                  </select>
                </div>
                {error.province && (
                  <InputErrorMessage message={error.province} />
                )}
              </div>

              <div className="flex justify-center m-2">
                <div className="flex flex-row items-center gap-[17px] ">
                  <div className="relative">
                    <Label
                      htmlFor="Datestart"
                      className="text-right text-darkbluecute"
                    >
                      Date start
                    </Label>
                    <DownIcon className="absolute right-3.5 top-9 -z-50 cursor-pointer " />
                    <div className="flex flex-row items-center w-[315px]">
                      <Input
                        className="border border-gray-400 text-darkgraycute"
                        title="Date start"
                        type="datetime-local"
                        // value={input.due_date}
                        onChange={handleChangeInput}
                        name="due_date"
                        isInvalid={error.due_date}
                      />
                      {error.due_date && (
                        <InputErrorMessage message={error.due_date} />
                      )}
                    </div>
                  </div>

                  <div className="relative">
                    <Label
                      htmlFor="Dateend"
                      className=" text-darkbluecute text-right"
                    >
                      Date end
                    </Label>
                    <DownIcon className="absolute right-3.5 top-9 -z-50 cursor-pointer " />
                    <Input
                      className="border border-gray-400 text-darkgraycute w-[315px]"
                      title="Date end"
                      type="datetime-local"
                      // value={input.dateEnd}
                      // onChange={handleChangeInput}
                      name="dateEnd"
                      isInvalid={error.dateEnd}
                    />
                    {/* {error.dateEnd && (
                      <InputErrorMessage message={error.dateEnd} />
                    )} */}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full mt-8">
                <Label
                  htmlFor="Province"
                  className=" text-darkbluecute text-left mb-0 mt-[-15px] ml-16 "
                >
                  Passenger
                </Label>

                <div className="flex justify-center">
                  <Passenger
                    setSelected1={setSelected1}
                    selected1={selected1}
                    name="passenger"
                    isInvalid={error.passenger}
                  />
                </div>
                {/* {error.passenger && (
                  <InputErrorMessage message={error.passenger} />
                )} */}
              </div>
              <div className="flex justify-center">
                <button className="btn btn-primary rounded-none m-5 mb-0 bg-blue-600 border-0 text-white">
                  Search
                </button>
              </div>
            </form>
          </div>

          <div className="m-5 mt-20">
            <div className="text-2xl">recent search</div>
          </div>

          <div className="mt-[20px] overflow-auto p-2 h-80">
            <div className="flex-col justify-center m-0 ml-5 pr-0.5 p-5 ">
              {datas.map((el, index) => (
                <div
                  className="card card-side bg-base-100 shadow-xl w-[700px] rounded-none flex justify-between mb-4 border border-slate-300"
                  key={el.id}
                >
                  <figure>
                    <img
                      src="https://www.foodandwine.com/thmb/ySB6eNm-5vsPfBtcXIaL23zDaR4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Why-This-Caribbean-Resort-Is-Perfect-for-Travelers-With-Kids-FT-BLOG0523-4630f1fe51ab4189841c925a143a1673.jpg"
                      alt="resort"
                      className="bg-cover relative  h-52 w-52"
                    />
                  </figure>
                  <div className="card-body p-2 ">
                    <h2 className="card-title">Hotel {el.hotel_name}</h2>
                    <div className="flex">
                      <AiFillStar className="text-yellow-300" />
                      <AiFillStar className="text-yellow-300" />
                      <AiFillStar className="text-yellow-300" />
                      <AiFillStar className="text-yellow-300" />
                      <AiFillStar className="text-gray-400" />
                    </div>
                    <div className="flex gap-2">
                      <div className="bg-pink-400 flex justify-center items-baseline gap-1 w-12 rounded-xl">
                        <AiFillStar className="text-white p-[2px]" />
                        <p>4.9</p>
                      </div>
                      <div>1366 Reviews</div>
                      <div>city : {el.province}</div>
                    </div>
                    <p>Amenities</p>
                    <div className="flex gap-6">
                      <div className="border-black border-[1px] rounded-md p-1">
                        <AiFillCar />
                      </div>
                      <div className="border-black border-[1px] rounded-md p-1 ">
                        <FaShower />
                      </div>
                      <div className="border-black border-[1px] rounded-md p-1 ">
                        <GiWineBottle />
                      </div>
                      <div className="border-black border-[1px] rounded-md p-1 ">
                        <AiOutlineWifi />
                      </div>
                      <div className="border-black border-[1px] rounded-md p-1 ">
                        <IoIosFitness />
                      </div>
                      <div className="border-black border-[1px] rounded-md p-1 ">
                        <BsThreeDots />
                      </div>
                    </div>
                    <p className="overflow-hidden w-32">{el.price}/night</p>
                  </div>

                  <div className="card-actions justify-center">
                    <button className="btn btn-primary rounded-none text-white bg-blue-600 border-0 h-52 w-12">
                      <div onClick={() => handleClick(el, index)}>
                        <h1 className="w-[200px] rotate-90 mb-[30px]">Book </h1>
                        <h1 className="w-[200px] rotate-90 ">Now</h1>
                      </div>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div
          className="img-wrapper col-start-3 col-span-12  overflow-hidden bg-center bg-cover rounded-l-3xl "
          style={{ backgroundImage: `url(${backgroundImage})` }}
        >
          <div className="">
            <h1 className="absolute left-8 text-neutral-100 bottom-[200px] text-6xl  text-lightbluecute font-semibold  opacity-90 w-min-[400px]">
              Incredible India.
            </h1>
            <h3 className="absolute left-8 text-neutral-100 bottom-36 text-3xl  text-lightbluecute font-semibold  opacity-90  w-min w-[1000px]">
              "For where thy treasure is,
            </h3>
            <h3 className="absolute left-20 text-neutral-100 bottom-28 text-3xl  text-lightbluecute font-semibold  opacity-90 w-min w-[1000px]">
              there also will thy heart be."
            </h3>
            <button className="absolute bottom-2 btn btn-primary rounded-none m-10 bg-gray-500 border-0 text-white ">
              Take Tour
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
