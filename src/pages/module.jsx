import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Element/Button";
import { formatDateTime } from "../fetch";
import Swal from "sweetalert2";
import { Eye, FilePenLine, Trash2 } from "lucide-react";
import { deleteModule, fetchModules } from "../redux/slice/ModuleSlice";
import PageLayout from "../components/Layout/PageLayout";

const ModulePage = () => {
  const navigate = useNavigate();
  const module = useSelector((state) => state.module.modules);
  const username = useSelector((state) => state.users.user.username);
  const token = useSelector((state) => state.users.token);
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      scrollbarPadding: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await dispatch(
            deleteModule({ url: `/materi/delete/${id}`, token })
          ).unwrap();
          await dispatch(fetchModules({ url: `materi`, token })).unwrap();
          Swal.fire({
            icon: "success",
            title: "Deleted!",
            text: "Module has been deleted!",
            scrollbarPadding: false,
          });
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: error.message,
            scrollbarPadding: false,
          });
        }
      }
    });
  };

  useEffect(() => {
    const fetchModuleAPI = async () => {
      try {
        await dispatch(fetchModules({ url: `materi`, token })).unwrap();
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          scrollbarPadding: false,
        });
      }
    };

    fetchModuleAPI();
  }, [dispatch, token]);

  return (
    <PageLayout>
      <div className="justify-center items-center min-h-screen font-poppins px-6 py-32">
        <div className="text-white">
          <p className="text-md md:text-xl mb-2">Hello, {username}</p>
          <p className="text-2xl font-poppins font-bold">
            {module.length > 0
              ? `Kamu sudah membuat ${module.length} materi`
              : `Anda belum membuat quiz`}
          </p>
          <Button
            onClick={() => navigate("/module/add")}
            className="my-2 text-white bg-indigo-600 px-4 py-2 rounded-lg"
          >
            + Add Module
          </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          {module?.map((m, index) => (
            <div
              key={index}
              className="bg-white shadow-lg px-6 py-8 rounded-lg"
            >
              <h2 className="text-xl text-indigo-600 font-bold mb-2">
                {m.title}
              </h2>
              <p className="text-gray-600">Kategori: {m.field}</p>
              <p className="text-gray-600">
                Dibuat oleh: {m.createdBy?.username || "Unknown"}
              </p>
              <p className="text-gray-600">
                Dibuat pada: {formatDateTime(m.createdAt)}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => navigate(`/module/${m._id}`)}
                  className={
                    "mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                  }
                >
                  <Eye size={16} />
                </Button>
                <Button
                  onClick={() => navigate(`/module/edit/${m._id}`)}
                  className={
                    "mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                  }
                >
                  <FilePenLine size={16} />
                </Button>
                <Button
                  onClick={() => handleDelete(m._id)}
                  className={
                    "mt-4 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
                  }
                >
                  <Trash2 size={16} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  );
};

export default ModulePage;
