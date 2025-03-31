import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../components/Element/texteditor";
import { useDispatch, useSelector } from "react-redux";
import InputForm from "../components/Element/InputForm";
import InputSelect from "../components/Element/InputSelect";
import Select from "../components/Element/Select";
import Option from "../components/Element/Option";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Element/Button";
import { Delete } from "lucide-react";
import { editModule, fetchModuleById } from "../redux/slice/ModuleSlice";
import Swal from "sweetalert2";
import PageLayout from "../components/Layout/PageLayout";

const EditModule = () => {
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [content, setContent] = useState("");
  const token = useSelector((state) => state.users.token);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const fieldOptions = [
    field || "",
    "Matematika",
    "Fisika",
    "Kimia",
    "Biologi",
    "Informatika",
    "Sejarah",
    "Olahraga",
    "Seni Budaya",
  ];

  useEffect(() => {
    const getModuleById = async () => {
      try {
        await dispatch(fetchModuleById({ url: `materi/${id}`, token }))
          .unwrap()
          .then((res) => {
            console.log(res);
            setContent(res.content);
            setTitle(res.title);
            setField(res.field);
          });
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
          scrollbarPadding: false,
        });
        navigate("/module");
      }
    };

    getModuleById();
  }, [id, token, navigate]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(
        editModule({
          url: `materi/edit/${id}`,
          updatedModule: {
            title,
            field,
            content,
          },
          token,
        })
      )
        .unwrap()
        .then((res) => {
          console.log(res);
          Swal.fire({
            icon: "success",
            title: "Berhasil",
            text: res.message,
            scrollbarPadding: false,
          });
          navigate("/module");
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
        scrollbarPadding: false,
      });
      console.error("Gagal mengedit materi", error);
    }
  };

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSelectChange = (e) => {
    setField(e.target.value);
  };

  return (
    <PageLayout>
      <div className="min-h-screen flex items-center justify-center font-poppins py-24 px-12">
        <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
          <Button
            onClick={() => navigate(`/module`)}
            className={
              "my-2 bg-indigo-600 text-white px-4 py-2 rounded-lg cursor-pointer"
            }
          >
            <Delete size={16} />
          </Button>
          <h2 className="text-2xl font-bold mb-4 text-indigo-600">
            Buat Materi
          </h2>
          <form onSubmit={handleEdit}>
            <div className="mb-4">
              <InputForm
                type={"text"}
                name={"title"}
                onChange={handleChange}
                value={title}
                placeholder={"Masukkan judul materi..."}
              >
                Judul Materi
              </InputForm>
            </div>
            <div className="mb-4">
              <InputSelect name={"field"} value={"Pilih Kategori"}>
                <Select
                  name={"field"}
                  value={field}
                  onChange={handleSelectChange}
                >
                  {fieldOptions.map((b, index) => (
                    <Option key={index} value={b}>
                      {b}
                    </Option>
                  ))}
                </Select>
              </InputSelect>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Konten</label>
              <TextEditor
                content={content}
                setContent={setContent}
                token={token}
              />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700 mt-8"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default EditModule;
