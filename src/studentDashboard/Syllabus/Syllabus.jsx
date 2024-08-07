import { Button, IconButton } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { MdFileDownload } from "react-icons/md";
import baseurl from "../../Config";
import { useAuthContext } from "../../context/useStateContext";

const Syllabus = ({ hide, handleSyllabus }) => {
  const { currentUser } = useAuthContext();
  const [loader, setLoader] = useState(true);
  const [data, setData] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [courseName, setCourseName] = useState("");

  const getCourseDetails = (courseName) => {
    fetch(baseurl + `/api/course/new-lession/get?course=${courseName}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCoursesList = () => {
    fetch(baseurl + `/api/course`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        setCourseData(result);
        setLoader(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCourseNameById = (courseId) => {
    const course = courseData.find((course) => course?.title === courseId);
    return course ? course._id : "Course not found";
  };

  useEffect(() => {
    getCourseDetails(courseName);
  }, [courseName]);

  useEffect(() => {
    getCoursesList();
  }, []);

  useEffect(() => {
    const yourId = currentUser?.course;
    const yourCourseName = getCourseNameById(yourId);
    setCourseName(yourCourseName);
  }, [currentUser?.course, courseData]);


  return (
    <section className=" p-2 sm:p-5 md:p-10 ">
      <div className="w-full p-1">
        <div className="flex gap-4 items-center p-1 pb-4">
          <h2 className="text-3xl font-semibold text-[var(--secondary-color)] text-center sm:text-start my-5 sm:my-7 md:my-10">
            Course Syllabus
          </h2>
          <Button onClick={handleSyllabus}>{hide ? "Hide" : "Show"}</Button>
        </div>

        {hide ? (
          <div className="w-full border border-black rounded-sm">
            <table className="border-collapse w-full">
              <thead>
                <tr>
                  <th className="border border-black text-center p-1">
                    Sr. No.
                  </th>
                  <th className="border border-black text-gray-800 font-bold p-1">
                    Subject
                  </th>
                  <th className="border border-black text-gray-800 font-semibold p-1">
                    Day
                  </th>
                  <th className="border border-black text-gray-800 font-semibold p-1">
                    Topics
                  </th>
                  <th className="border border-black text-gray-800 font-semibold p-1">
                    Instructors
                  </th>
                </tr>
              </thead>
              {data?.data?.map((item, index) => (
                <tbody key={index}>
                  <tr>
                    <td className="border border-black p-1 text-center">
                      {index + 1}
                    </td>
                    <td className="border font-bold border-black text-blue-800 p-1">
                      {item.subject.title}
                      <p className="text-black">
                        Days: {item.subject.daycounts}
                      </p>
                    </td>
                    <td className="border border-black p-1 text-center">
                      {item.topic.map((item, index) => (
                        <p key={index}>{index + 1}</p>
                      ))}
                    </td>
                    <td className="border font-semibold border-black p-1">
                      {item.topic.map((item, index) => (
                        <p key={index}>{item.topics}</p>
                      ))}
                    </td>
                    <td className="border font-semibold border-black p-1">
                      {item.instructorList.map((instructor, index) => (
                        <h2 key={index}>{instructor.name}</h2>
                      ))}
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default Syllabus;
