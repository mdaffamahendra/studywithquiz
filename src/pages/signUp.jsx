import { useEffect, useState } from "react";
import SideAuth from "../components/Fragment/SideAuth";
import AuthLayout from "../components/Layout/AuthLayout";
import FormAuth from "../components/Fragment/FormAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { signup } from "../fetch";
import Swal from "sweetalert2";

const SignUpPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  const handleChange = (e) => {
    setError("")
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signup("auth/signup", form).then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: res.message,
          scrollbarPadding: false,
        });
        navigate("/login");
      });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <AuthLayout>
      <FormAuth
        failed={error}
        handle={handleSignUp}
        type={"Sign Up"}
        max={"8"}
        role={form.role}
        onChange={handleChange}
      />
      <SideAuth type={"Sign Up"} />
    </AuthLayout>
  );
};

export default SignUpPage;
