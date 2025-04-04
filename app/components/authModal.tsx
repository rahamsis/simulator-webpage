'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import { createAccount } from '@/app/lib/actions';
import { KeyIcon, UserCircleIcon, AtSymbolIcon, ExclamationCircleIcon, } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { fetchTemas } from "@/app/lib/actions";

import { signIn, signOut } from "next-auth/react";
import { set } from "zod";

interface AuthModalProps {
    onClose: () => void
    onLogin: () => void
}

export default function AuthModal({ onClose, onLogin }: AuthModalProps) {
    const router = useRouter();

    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const [errors, setErrors] = useState<{ username?: string[]; email?: string[]; password?: string[] }>({});
    const [message, setMessage] = useState<string | null>(null);
    const [isLogin, setIsLogin] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setMessage(null);
        setIsLoading(true);

        // 📌 Obtener el User-Agent (dispositivo)
        const device = navigator.userAgent;
        // 📌 Obtener la IP pública desde una API externa
        let ip = "Unknown";
        try {
            const res = await fetch("https://api64.ipify.org?format=json");
            const data = await res.json();
            ip = data.ip;
        } catch (error) {
            console.error("Error obteniendo la IP:", error);
        }

        if (isLogin) {
            //validar que lon input esten llenos
            // validateInputs();

            // Cerrar sesión en todos los demás navegadores si la sesión anterior existe
            await signOut({ redirect: false })

            // Eliminar cookies manualmente si es necesario
            document.cookie = "next-auth.session-token=; max-age=0; path=/; domain=localhost;";  // Esto elimina la cookie en el navegador


            const response = await signIn("credentials", {
                email: formData.email,
                password: formData.password,
                device,  // Enviamos el dispositivo
                ip,      // Enviamos la IP
                redirect: false, // Evita redirección automática
            });

            console.log("SignIn response:", response);

            if (!response?.ok) {
                setIsLoading(false);
                setMessage(response?.error!);
                return;
            }

            console.log('Login exitoso!');
            cleanForm();
            onLogin();
            setTimeout(() => {
                router.push('/main');
            }, 100); // Pequeña espera para evitar renderizaciones conflictivas

        } else {
            const form = new FormData();
            form.append('username', formData.username)
            form.append('email', formData.email)
            form.append('password', formData.password)

            const result = await createAccount({}, form);

            console.log("result", result);

            if (result?.errors) {
                setIsLoading(false);
                setErrors(result.errors);
                return;
            }

            if (result?.message && result?.message != "Cuenta creada exitosamente") {
                setIsLoading(false);
                setMessage(result.message);
                return;
            }

            cleanForm();
            setIsLogin(true);
            router.push("/");
        }


    }

    // Manejo de cambios en los inputs
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        // Eliminar espacios en blanco mientras el usuario escribe
        const sanitizedValue = value.replace(/\s+/g, "");
        setFormData({ ...formData, [name]: sanitizedValue });
    };

    const cleanForm = () => {
        setIsLogin(!isLogin)
        setFormData({ username: '', email: '', password: '' });
        setErrors({});
        setMessage(null);
        setIsLoading(false);
        setShowPassword(false);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>
                {
                    message &&
                    <p className="mt-2 text-sm text-red-500">
                        {message}
                    </p>
                }
                <form onSubmit={handleSubmit} className="space-y-4">
                    {!isLogin && (
                        <div>
                            <label htmlFor="username" className="block mb-1">
                                Usuario
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded pl-10"
                                    placeholder="Ingrese nombre de usuario"
                                // required
                                />
                                <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                            </div>
                            {
                                errors.username &&
                                <p className="mt-2 text-sm text-red-500">
                                    {errors.username}
                                </p>
                            }
                        </div>
                    )}
                    <div>
                        <label htmlFor="email" className="block mb-1">
                            Email
                        </label>
                        <div className="relative">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded pl-10"
                                placeholder="Ingrese un email"
                            // required
                            />
                            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {
                            errors.email &&
                            <p className="mt-2 text-sm text-red-500" >
                                {errors.email}
                            </p>
                        }
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded pl-10"
                                placeholder="Ingrese una contraseña"
                            // required
                            />
                            <button
                                type="button"
                                // variant="ghost"
                                // size="icon"
                                className="absolute right-0 top-0 h-full px-3"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash" viewBox="0 0 16 16">
                                        <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7 7 0 0 0-2.79.588l.77.771A6 6 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755q-.247.248-.517.486z" />
                                        <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829" />
                                        <path d="M3.35 5.47q-.27.24-.518.487A13 13 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7 7 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12z" />
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye" viewBox="0 0 16 16">
                                        <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
                                        <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
                                    </svg>
                                }
                            </button>
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {
                            errors.password &&
                            <p className="mt-2 text-sm text-red-500" >
                                {errors.password}
                            </p>
                        }
                    </div>

                    <Button type="submit" className="w-full bg-green-700 justify-center text-white py-2 rounded hover:bg-green-600">
                        {isLoading ? (
                            <div className="flex items-center">
                                <svg className="animate-spin h-5 w-5 mr-2 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l4-4-4-4v4a8 8 0 00-8 8H4z"></path>
                                </svg>
                                Cargando...
                            </div>
                        ) : (
                            isLogin ? "Iniciar sesión" : "Registrarse"
                        )}
                    </Button>
                </form>

                {/* {
                    errors.login &&
                    <p className="mt-2 text-sm text-red-500">
                        {errors.login}
                    </p>
                } */}

                <button onClick={() => cleanForm()} className="mt-4 text-green-700 hover:underline">
                    {isLogin ? "¿No tienes cuenta? Regístrate" : "¿Ya tienes cuenta? Inicia sesión"}
                </button>
                <button onClick={onClose} className="absolute top-2 right-5 text-gray-500 text-3xl hover:text-gray-700">
                    &times;
                </button>
            </div>
        </div>
    )
}