import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { fetchModuleById } from "../redux/slice/ModuleSlice";
import Button from "../components/Element/Button";
import { Delete } from "lucide-react";
import PageLayout from "../components/Layout/PageLayout";
import LoadingElement from "../components/Element/LoadingElement";

const ModuleDetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const token = useSelector((state) => state.users.token);
  const [data, setData] = useState({
    title: "",
    content: ""
  })
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true)
    const getModuleById = async () => {
      try {
        await dispatch(fetchModuleById({ url: `materi/${id}`, token }))
          .unwrap()
          .then((res) => {
            setData({
              title: res.title,
              content: res.content,
            })
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          scrollbarPadding: false,
        });
        navigate("/module");
      } finally {
        setIsLoading(false);
      }
    }

    getModuleById();
  }, [id, token, navigate]);

  if(isLoading) return <LoadingElement />

  return (
    <PageLayout>
      <div className="w-full ql-snow font-poppins text-white flex flex-col justify-start items-center px-2 py-24 min-h-screen">
        <div className="flex self-start items-center justify-center">
          <Button
            onClick={() => navigate(-1)}
            className={
              "bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
            }
          >
            <Delete size={24} />
          </Button>
          <h2 className="font-bold text-white ml-2 text-md md:text-xl">{data.title}</h2>
        </div>
        <div
          dangerouslySetInnerHTML={{ __html: data.content }}
          className="ql-editor bg-white text-indigo-600 p-6 m-6 rounded w-full"
        />
      </div>
    </PageLayout>
  );
};

export default ModuleDetailPage;
