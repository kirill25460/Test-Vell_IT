import { useState } from 'react'
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NavLink } from 'react-router-dom';
import { zodResolver } from "@hookform/resolvers/zod";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { loginThunk } from '../../redux/auth/authActions';
const schema = z.object({
  name: z
    .string()
    .min(2, "Имя слишком короткое (мин. 2 символа)")
    .max(40, "Имя слишком длинное (макс. 40 символов)")
    .regex(/^[a-zA-Z]+$/, "Имя должно содержать только буквы"),
  username: z
    .string()
    .min(2, "Имя пользователя слишком короткое (мин. 2 символа)")
    .max(40, "Имя пользователя слишком длинное (макс. 40 символов)")
    .regex(/^[a-zA-Z0-9_]+$/, "Только буквы, цифры и _"),
  password: z
    .string()
    .min(8, "Пароль слишком короткий (мин. 8 символов)")
    .max(50, "Пароль слишком длинный (макс. 50 символов)")
    .regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]+$/, "Пароль должен содержать хотя бы одну букву и одну цифру"),
});

type FormData = z.infer<typeof schema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const handleTogglePassword = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setShowPassword(!showPassword); 
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Форма отправлена:", data);
    dispatch(loginThunk(data));
    
  };

  return (<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 items-center">
    <h2 className='font-medium'>Log In</h2>
    <p>Not Registered? <NavLink to="/">Registration </NavLink></p>
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
      <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700">Name</label>
        <input  id="name" {...register("name")} className="w-full p-2 border rounded" />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">Username</label>
        <input  id="username" {...register("username")} className="w-full p-2 border rounded" />
        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
      </div>

      <div className="mb-4 relative">
        <label htmlFor="password" className="block text-gray-700">Password</label>
        <input id="password"   type={showPassword ? 'text' : 'password'} {...register("password")} className="w-full p-2 border rounded" />
        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
         <button type="button" onClick={(e) => handleTogglePassword(e)} className='absolute right-2 top-9 flex items-center justify-center bg-transparent border-none cursor-pointer'>
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>

      <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
        Log In
      </button>
    </form>
    </div>
    </div>
  );
};

export default LoginForm;
