import Button from "../Element/Button";
import InputForm from "../Element/InputForm";
import { Link } from "react-router-dom";
import InputSelect from "../Element/InputSelect";
import Select from "../Element/Select";
import Option from "../Element/Option";

const FormAuth = (props) => {
  const { failed, handle, type, max, onChange, role } = props;
  return (
    <div className="md:w-1/2 w-full flex flex-col justify-center p-8">
      <h2 className="text-md md:text-3xl font-semibold text-center mb-2 md:mb-6 text-indigo-600">
        {type}
      </h2>
      <form className="space-y-4" onSubmit={handle}>
        {failed && (
          <p className="text-center text-sm text-red-600 mt-2">{failed}</p>
        )}
        {type === "Sign Up" && (
          <InputForm
            type={"text"}
            name={"username"}
            max={"18"}
            onChange={onChange}
            placeholder={"ex: Ali Baba"}
          >
            Username
          </InputForm>
        )}
        <InputForm
          type={"email"}
          name={"email"}
          onChange={onChange}
          placeholder={"ex: user@example.com"}
        >
          Email
        </InputForm>
        <InputForm
          type={"password"}
          name={"password"}
          max={"8"}
          min={"8"}
          onChange={onChange}
          placeholder={"********"}
        >
          Password
        </InputForm>
        {type === "Sign Up" && (
          <InputSelect name={"role"} value={"Pilih Role"}>
            <Select name={"role"} value={role} onChange={onChange}>
              <Option value={"student"}>Student</Option>
              <Option value={"teacher"}>Teacher</Option>
            </Select>
          </InputSelect>
        )}
        <Button type={"submit"}>{type}</Button>
      </form>
      {type === "Sign Up" ? (
        <p className="text-center text-sm text-gray-600 mt-2">
          Sudah memiliki akun?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Masuk Sekarang
          </Link>
        </p>
      ) : (
        <p className="text-center text-sm text-gray-600 mt-2">
          Belum memiliki akun?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:text-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Daftar Sekarang
          </Link>
        </p>
      )}
    </div>
  );
};

export default FormAuth;
