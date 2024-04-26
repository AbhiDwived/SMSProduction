import {
  Checkbox,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useState } from "react";
import ModalEditResult from "./ModalEditResult";
import baseurl from "../../Config";
import { toast } from "react-toastify";
import moment from "moment/moment";

const InstructorResultTable = ({ item, getMarksList }) => {
  const [open2, setOpen2] = useState(false);
  const handleOpen2 = () => setOpen2(!open2);

  function deleteData(id) {
    if (window.confirm("Are you sure You want to delete ?")) {
      fetch(baseurl + "/api/marks/" + id, {
        method: "DELETE",
      })
        .then((res) => res.json()) // or res.json()
        .then((res) => {
          toast.success("Deleted Successfully");
          getMarksList();
        });
    }
  }
  

  return (
    <>
      <tr className="bg-white border-b" key={item._id}>
        <td className=" py-4 ">
          <Checkbox />
        </td>
        <td className="px-6 py-4 font-semibold text-black">{item.name}</td>
        <td className="px-6 py-4 hidden sm:table-cell">{item.regno}</td>
        <td className="px-6 py-4 hidden sm:table-cell">{item.topic}</td>
        <td className="px-6 py-4 hidden lg:table-cell">{item.course}</td>
        <td className="px-3 py-4 hidden md:table-cell">{item.total_marks}</td>
        <td className="px-3 py-4 ">
          {item.obtain_marks}{" "}
          <span className=" visible sm:hidden">/ {item.total_marks}</span>
        </td>
        <td className="px-3 py-4 hidden lg:table-cell">{moment(item.date).format('MMMM Do YYYY')}</td>
        <td className="px-1 py-4">
          <div>
            <Menu>
              <MenuHandler>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
              </MenuHandler>
              <MenuList>
                <MenuItem>
                  <div onClick={handleOpen2} className="flex ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mx-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
                      />
                    </svg>
                    Edit
                  </div>
                </MenuItem>
                <MenuItem>
                  <div
                    className="flex "
                    onClick={() => {
                      deleteData(item.regno);
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-4 h-4 mx-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                      />
                    </svg>
                    Delete
                  </div>
                </MenuItem>
              </MenuList>
            </Menu>
            <ModalEditResult
              open={open2}
              handleOpen={handleOpen2}
              item={item}
              getMarksList={getMarksList}
            />
          </div>
        </td>
      </tr>
    </>
  );
};

export default InstructorResultTable;
