import { useEffect, useRef, useState } from "react";

const Timer = ({ initialTime, onTimeUp, isQuizFinished, setDuration, setStartQuiz }) => {
  const [time, setTime] = useState(initialTime);
  const intervalRef = useRef(null);
  const [startTime, setStartTime] = useState(null); // Gunakan useState untuk menyimpan waktu mulai

  useEffect(() => {
    const startQuizTime = new Date(); // Waktu mulai
    setStartTime(startQuizTime); // Simpan waktu mulai ke state
    setStartQuiz(new Date().toISOString()); // Kirim waktu mulai ke parent component

    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (prev <= 0) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []); // Hanya dijalankan sekali saat komponen di-mount

  useEffect(() => {
    if (isQuizFinished || time <= 0) {
      clearInterval(intervalRef.current);

      if (startTime) {
        const endTime = new Date().getTime();
        const durationInSeconds = Math.floor((endTime - startTime.getTime()) / 1000);
        setDuration(durationInSeconds); // Kirim durasi ke parent component
      }

      if (time <= 0) onTimeUp(); // Panggil onTimeUp jika waktu habis
    }
  }, [isQuizFinished, time, onTimeUp, setDuration, startTime]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className={`fixed top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg text-lg font-semibold ${isQuizFinished ? "hidden" : "block fixed"}`}>
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Timer;
