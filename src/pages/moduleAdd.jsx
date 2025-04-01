import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import TextEditor from "../components/Element/texteditor";
import { postData } from "../fetch";
import { useSelector } from "react-redux";
import InputForm from "../components/Element/InputForm";
import InputSelect from "../components/Element/InputSelect";
import Select from "../components/Element/Select";
import Option from "../components/Element/Option";
import { useNavigate } from "react-router-dom";
import Button from "../components/Element/Button";
import { Delete } from "lucide-react";
import Swal from "sweetalert2";
import PageLayout from "../components/Layout/PageLayout";

const AddModule = () => {
  const [title, setTitle] = useState("");
  const [field, setField] = useState("");
  const [content, setContent] = useState("");
  const token = useSelector((state) => state.users.token);
  const navigate = useNavigate();

  const fieldOptions = ["Matematika", "Informatika", "Bahasa", "MIPA", "Seni Budaya", "Olahraga"];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postData(
        "materi/add",
        {
          title,
          field,
          content,
        },
        token
      ).then((res) => {
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
      <div className="min-h-screen flex items-center justify-center font-poppins px-2 py-24">
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
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <InputForm
                type={"text"}
                name={"title"}
                onChange={handleChange}
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
              className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700 mt-24"
            >
              Simpan
            </button>
          </form>
        </div>
      </div>
    </PageLayout>
  );
};

export default AddModule;
