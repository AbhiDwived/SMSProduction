import React, { Fragment, useEffect, useState } from 'react'
import { Button, IconButton } from '@material-tailwind/react'
import { MdFileDownload } from "react-icons/md";
import baseurl from '../../Config';
import { useAuthContext } from '../../context/useStateContext';
import Loader from '../../Components/Loader';
import moment from 'moment/moment';

const DayByday = () => {

    const { currentUser } = useAuthContext();
    const [loader, setLoader] = useState(true);
    const [data, setData] = useState(null)
    const [courseData, setCourseData] = useState([]);
    const [courseName, setCourseName] = useState('');
    const [getTopic, setGetTopic] = useState([])


    console.log(courseName)

    const getCourseDetails = (courseName) => {

        setLoader(true)

        fetch(baseurl + `/api/new-daybyday/get?course=${courseName}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => {
                return res.json();
            })
            .then((result) => {
                setData(result.data);
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)
            });
    };

    const getCoursesList = () => {
        fetch(baseurl + `/api/course`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
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


    const getCourseByTopic = (courseName) => {
        fetch(baseurl + `/api/lessions/getalltopic/${courseName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((result) => {
                setGetTopic(result.data);
                setLoader(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const getCourseNameById = (courseId) => {
        const course = courseData.find((course) => course?.title === courseId);
        return course ? course._id : 'Course not found';
    };

    useEffect(() => {
        if (courseName) {
            getCourseDetails(courseName);
            getCourseByTopic(courseName)
        }
    }, [courseName]);

    useEffect(() => {
        getCoursesList();
    }, [])

    useEffect(() => {
        const yourId = currentUser?.course;
        const yourCourseName = getCourseNameById(yourId);
        setCourseName(yourCourseName);
    }, [currentUser?.course, courseData]);


    const downloadNotes = (notes) => {
        if (notes) {
            const downloadLink = document.createElement("a");
            downloadLink.href = notes;
            downloadLink.download = true;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    const GetIDDate = (id, list) => {

        const _find = list?.find((item) => item?._id === id)

        return _find
    }

    return (
        <section className=" p-2 sm:p-5 md:p-10 ">
            <div className="w-full p-1">
                <div className="flex justify-between items-center p-1 pb-4">
                    <h2 className="text-3xl font-semibold text-[var(--secondary-color)] text-center sm:text-start my-5 sm:my-7 md:my-10">
                        Day By Day Lesson Plan
                    </h2>
                </div>

                <div className="w-full border border-black rounded-sm">

                    {loader && <Loader />}
                    {!loader && (
                        <table className="border-collapse w-full">
                            <thead>
                                <tr>
                                    <th className="border border-black text-gray-800 font-semibold p-1">Day</th>
                                    {/* <th className="border border-black text-gray-800 font-semibold p-1">Topics</th> */}
                                    <th className="border border-black text-gray-800 font-semibold p-1">Theory</th>
                                    <th className="border border-black text-gray-800 font-semibold p-1">Practical</th>
                                    <th className="border border-black text-gray-800 font-semibold p-1">Start Date</th>
                                    <th className="border border-black text-gray-800 font-semibold p-1">End Date</th>
                                </tr>
                            </thead>

                            <tbody>
                                {data?.map((item, index) => (
                                    <Fragment key={index}>
                                        {
                                            item.plan?.map((plan, index) => (
                                                <tr key={index}>
                                                    <Fragment key={index}>
                                                        <td className='border border-black text-gray-800 p-1' rowSpan={plan?.theory?.length}>{plan?.day}</td>

                                                        <td className='border border-black text-gray-800 p-1'>
                                                            <table>
                                                                {plan.theory?.map((theory, index) => (
                                                                    <tr className=''>
                                                                        <h6>
                                                                            {GetIDDate(theory, getTopic)?.topics} <br />
                                                                        </h6>
                                                                        {GetIDDate(theory, getTopic)?.notes !== "" ? (
                                                                            <IconButton onClick={() => downloadNotes(GetIDDate(theory, getTopic)?.notes)}>
                                                                                <MdFileDownload />
                                                                            </IconButton>
                                                                        ) : null}</tr>
                                                                ))}
                                                            </table>
                                                        </td>
                                                        <td className='border border-black text-gray-800 p-1'>
                                                            <table>
                                                                {plan?.practical?.map((practical, index) => (
                                                                    <tr key={index}>
                                                                        {GetIDDate(practical, getTopic)?.topics}
                                                                        {GetIDDate(practical, getTopic)?.notes !== "" ? (
                                                                            <IconButton onClick={() => downloadNotes(GetIDDate(practical, getTopic)?.notes)}>
                                                                                <MdFileDownload />
                                                                            </IconButton>
                                                                        ) : null}

                                                                    </tr>
                                                                ))}
                                                            </table>
                                                        </td>
                                                        <td className='border border-black text-gray-800 p-1'>
                                                            {moment(plan?.startDate).format('MMM Do YY')}
                                                        </td>
                                                        <td className='border border-black text-gray-800 p-1'>
                                                            {moment(plan?.endDate).format('MMM Do YY')}
                                                        </td>
                                                    </Fragment>
                                                </tr>
                                            ))
                                        }
                                    </Fragment>
                                ))}
                            </tbody>

                        </table>
                    )}

                </div>
            </div>
        </section>)
}

export default DayByday





// <tbody key={index}>
//     <tr>
//         {
//             item?.plan?.map((item, index) => (
//                 <td className='border border-black p-1 text-center'>
//                     <p className='p-2' key={index}>{item?.day}</p>
//                 </td>
//             ))
//         }
//         <td>topic Data</td>
//         <td className='border font-semibold border-black p-1'>
//             {item?.plan?.map((items, index) => (
//                 <table>
//                     {GetIDDate(items?.theory, getTopic)?.map((topicdata, index) => (
//                         <tr className='p-2' key={index}>
//                             <td key={index}>
//                                 <p>{topicdata?.topics}</p>
//                             </td>
//                         </tr>
//                     ))}
//                 </table>
//             ))}

//         </td>
//         <td className='border font-semibold border-black p-1'>
//             {
//                 item?.plan?.map((items, index) => (
//                     <table>
//                         {GetIDDate(items?.practical, getTopic)?.map((topicdata, index) => (
//                             <tr className='p-2' key={index}>

//                                 <td>{topicdata?.topics}</td>

//                             </tr>
//                         ))}
//                     </table>

//                 ))
//             }
//         </td>
//         <td>notes data</td>
//         <td>ins</td>
//         {/* <td className='border font-semibold border-black p-1'>
//             {
//                 item.topic.map((topic, index) => (
//                     <div key={index} className='flex justify-center p-1'>
//                         <IconButton onClick={() => downloadNotes(topic.notes)}>
//                             <MdFileDownload />
//                         </IconButton>
//                     </div>
//                 ))
//             }
//         </td> */}

//     </tr>
// </tbody>
