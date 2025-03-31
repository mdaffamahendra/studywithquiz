import React from "react";
import Form from "../Element/Form";
import Button from "../Element/Button";
import InputForm from "../Element/InputForm";
import TextareaForm from "../Element/TextareaForm";
import InputSelect from "../Element/InputSelect";
import Select from "../Element/Select";
import Option from "../Element/Option";
import { useNavigate } from "react-router-dom";

const FormQuiz = ({ use, error, handleSubmit, formData, handleChange, loading }) => {
  const navigate = useNavigate();
  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white text-indigo-600 shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4 text-center">
        {use === "add" ? "Add New Quiz" : "Edit Quiz"}
      </h1>

      {error && <p className="text-red-500 text-center">{error}</p>}

      <Form handler={handleSubmit} style={"space-y-4"}>
        <InputForm
          type={"text"}
          name={"quizId"}
          max={5}
          placeholder={"Quiz ID harus 5 digit angka"}
          value={formData.quizId}
          onChange={handleChange}
        >
          ID Quiz
        </InputForm>
        <InputForm
          type={"text"}
          name={"title"}
          placeholder={"Masukan nama quiz"}
          value={formData.title}
          onChange={handleChange}
        >
          Nama Quiz
        </InputForm>
        <TextareaForm
          name={"description"}
          placeholder={"Masukan Deskripsi"}
          value={formData.description}
          onChange={handleChange}
        >
          Deskripsi Quiz
        </TextareaForm>
        <InputSelect name={"field"} value={"Kategori Quiz"}>
          <Select name={"field"} value={formData.field} onChange={handleChange}>
            <Option value={"Matematika"}>Matematika</Option>
            <Option value={"Informatika"}>Informatika</Option>
            <Option value={"Bahasa"}>Bahasa</Option>
            <Option value={"MIPA"}>MIPA</Option>
            <Option value={"MIPA"}>Seni Budaya</Option>
            <Option value={"Olahraga"}>Olahraga</Option>
          </Select>
        </InputSelect>
        <InputForm
          type={"datetime-local"}
          name={"timeStart"}
          value={formData.timeStart}
          onChange={handleChange}
        >
          Quiz Dibuka
        </InputForm>
        <InputForm
          type={"datetime-local"}
          name={"timeEnd"}
          value={formData.timeEnd}
          onChange={handleChange}
        >
          Tenggat Quiz
        </InputForm>
        <InputForm
          type={"number"}
          name={"timer"}
          value={formData.timer}
          onChange={handleChange}
        >
          Waktu Mengerjakan Quiz
        </InputForm>
        <Button
          type={"submit"}
          className={"w-full p-2 bg-blue-500 text-white rounded"}
          disabled={loading}
        >
          {loading
            ? use === "add"
              ? "Saving..."
              : "Updating..."
            : use === "add"
            ? "Add Quiz"
            : "Edit Quiz"}
        </Button>
      </Form>

      <Button
        onClick={() => navigate("/quiz")}
        className={"w-full mt-4 p-2 bg-gray-500 text-white rounded"}
      >
        Back to Quiz List
      </Button>
    </div>
  );
};

export default FormQuiz;
