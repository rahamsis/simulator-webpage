'use client';

import { useState } from "react";
import { Button } from "../ui/button";
import { createAccount } from '@/app/lib/actions';
import { KeyIcon, UserCircleIcon, AtSymbolIcon, ExclamationCircleIcon, } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

import { signIn, signOut } from "next-auth/react";

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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        setMessage(null);

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
                setMessage(response?.error!);
                return;
            }

            console.log('Login exitoso!');
            onLogin();
            router.push('/simulator');

        } else {
            const form = new FormData();
            form.append('username', formData.username)
            form.append('email', formData.email)
            form.append('password', formData.password)

            const result = await createAccount({}, form);

            if (result?.errors) {
                setErrors(result.errors);
                return;
            }

            if (result?.message) {
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
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const cleanForm = () => {
        setIsLogin(!isLogin)
        setFormData({ username: '', email: '', password: '' });
        setErrors({});
        setMessage(null);
    }

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative bg-white p-8 rounded-lg shadow-xl">
                <h2 className="text-2xl font-bold mb-4">{isLogin ? "Iniciar sesión" : "Registrarse"}</h2>
                {/* {error && <p className="text-red-500 mb-4">{error}</p>} */}
                {/* {
                    errors.login &&
                    <p className="mt-2 text-sm text-red-500">
                        {errors.login}
                    </p>
                } */}
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
                                Nombre
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
                                errors?.username && errors?.username?.map((error: string) => (
                                    <p className="mt-2 text-sm text-red-500" key={error}>
                                        {error}
                                    </p>
                                ))
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
                            errors?.email && errors?.email?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-1">
                            Contraseña
                        </label>
                        <div className="relative">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border rounded pl-10"
                                placeholder="Ingrese una contraseña"
                            // required
                            />
                            <KeyIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
                        </div>
                        {
                            errors?.password && errors?.password?.map((error: string) => (
                                <p className="mt-2 text-sm text-red-500" key={error}>
                                    {error}
                                </p>
                            ))
                        }
                    </div>

                    <Button type="submit" className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-600">
                        {isLogin ? "Iniciar sesión" : "Registrarse"}
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