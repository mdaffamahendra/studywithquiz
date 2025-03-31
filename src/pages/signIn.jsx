import FormAuth from "../components/Fragment/FormAuth";
import SideAuth from "../components/Fragment/SideAuth";
import AuthLayout from "../components/Layout/AuthLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../redux/slice/UsersSlice";
import Swal from "sweetalert2";

const SignInPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.users);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(userLogin(form))
      .unwrap()
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: res.message,
          scrollbarPadding: false,
        });
        navigate("/");
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
    setError("");
  };

  return (
    <AuthLayout>
      <SideAuth type={"Sign In"} />
      <FormAuth
        failed={error}
        handle={handleSubmit}
        type={"Sign In"}
        max={"98"}
        onChange={handleChange}
      />
    </AuthLayout>
  );
};

export default SignInPage;
