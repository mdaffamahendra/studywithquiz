import {useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Users, Clock, BookOpen, Award, Lightbulb } from "lucide-react";
import PageLayout from "../components/Layout/PageLayout";
import HomeFeature from "../components/Fragment/HomeFeature";
import HomeMain from "../components/Fragment/HomeMain";

const HomePage = () => {
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.users);
  const role = user?.role;
  const username = user?.username;

  useEffect(() => {
    if (!token) {
      navigate("/login", { replace: true });
    }
  }, [token]);

  const benefits = [
    {
      icon: <BookOpen size={24} className="text-indigo-500" />,
      text: "Memperdalam pemahaman materi",
    },
    {
      icon: <Clock size={24} className="text-indigo-500" />,
      text: "Melatih kecepatan berpikir",
    },
    {
      icon: <Award size={24} className="text-indigo-500" />,
      text: "Meningkatkan daya ingat",
    },
    {
      icon: <Lightbulb size={24} className="text-indigo-500" />,
      text: "Membantu mengidentifikasi kelemahan",
    },
    {
      icon: <Users size={24} className="text-indigo-500" />,
      text: "Belajar lebih interaktif dan menyenangkan",
    },
  ];

  return (
    <PageLayout>
      <HomeMain role={role} username={username} />
      <HomeFeature benefits={benefits} />
    </PageLayout>
  );
};

export default HomePage;
