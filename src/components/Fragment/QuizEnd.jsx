import React from "react";
import Button from "../Element/Button";

const QuizEnd = ({ handleSubmit, setFinished }) => {
  return (
    <div className="flex w-full justify-center items-center px-2 py-18">
      <div className="bg-white p-6 rounded-lg shadow-md text-center flex flex-col justify-center items-center font-poppins">
        <h2 className="text-2xl font-bold mb-4">Apa kamu yakin?</h2>
        <p>Cek terlebih dahulu jawabanmu sebelum dikumpulkan ya..</p>
        <div className="flex gap-6 text-center">
          <Button
            onClick={() => setFinished(false)}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Kembali
          </Button>
          <Button
            onClick={handleSubmit}
            className="mt-4 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-white font-semibold"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuizEnd;
