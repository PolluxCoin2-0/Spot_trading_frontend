import React, { useEffect, useState } from 'react';
import { getMatrixRecordsApi } from '../utils/axios/apisFunction';
import { useSelector } from 'react-redux';

const MatrixCard = () => {
  const [data, setData] = useState({});
  const dataArray = useSelector((state) => state?.wallet?.dataObject);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matrixRecordData = await getMatrixRecordsApi(
            dataArray?.[0]?.userAddress,
          );
          console.log(matrixRecordData)
        if (matrixRecordData.status_code === "1") {
          setData(matrixRecordData.data);
        }
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="">
        <div
          key={data._id}
          className=" rounded-2xl shadow-lg p-6 transition duration-300"
        >
          <h2 className="text-lg font-semibold text-white">
            Level {data.level}
          </h2>
          <p className="text-[#868386] font-semibold text-sm">User ID: {data.user}</p>

          <div className="mt-4">
            <p
              className={`font-bold text-sm px-2 py-1 rounded ${
                data.isSlotFilled ? ' text-green-600' : ' text-red-600'
              }`}
            >
              {data.isSlotFilled ? 'Slot Filled' : 'Slot Open'}
            </p>
          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div className="flex flex-col items-center">
              <span className="text-[#868386] font-semibold">Left</span>
              <span>{data.left ?? 'N/A'}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-[#868386] font-semibold">Right</span>
              <span>{data.right ?? 'N/A'}</span>
            </div>
          </div>

          <p className="mt-4 text-[#868386] font-semibold text-sm">Parent: {data.parent}</p>
        </div>
    </div>
  );
};

export default MatrixCard;
