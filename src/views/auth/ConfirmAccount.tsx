import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ConfirmToken } from "../../types";
import { toast } from "react-toastify";
import { confirmAccount } from "../../api/AuthApi";
import { useMutation } from "@tanstack/react-query";

export default function ConfirmAccountView() {

  const [token, setToken] = useState<ConfirmToken['token']>()

  const { mutate } = useMutation({
    mutationFn: confirmAccount,
    onSuccess: (data) => {
      toast.success(data.message)
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })
  const handleChange = (token: ConfirmToken['token']) => {
    setToken(token)
  }

  const handleComplete = (token: ConfirmToken['token']) => {
    mutate({ token })
  }

  return (
    <>
      <h1 className="text-5xl font-black text-white">Confirma tu Cuenta</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el código que recibiste {''}
        <span className=" text-fuchsia-500 font-bold"> por e-mail</span>
      </p>
      <form
        className="space-y-8 p-10 bg-white mt-10"
      >
        <label
          className="font-normal text-2xl text-center block"
        >Código de 6 dígitos</label>

        <div className="flex justify-center gap-5">
          <PinInput value={token} onChange={handleChange} onComplete={handleComplete}>
            <PinInputField className="w-14 h-14 text-2xl font-bold text-center bg-gray-200 border-gray-300 border"/>
            <PinInputField className="w-14 h-14 text-2xl font-bold text-center bg-gray-200 border-gray-300 border"/>
            <PinInputField className="w-14 h-14 text-2xl font-bold text-center bg-gray-200 border-gray-300 border"/>
            <PinInputField className="w-14 h-14 text-2xl font-bold text-center bg-gray-200 border-gray-300 border"/>
            <PinInputField className="w-14 h-14 text-2xl font-bold text-center bg-gray-200 border-gray-300 border"/>
            <PinInputField className="w-14 h-14 text-2xl font-bold text-center bg-gray-200 border-gray-300 border"/>
          </PinInput>
        </div>

      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to='/auth/new-code'
          className="text-center text-gray-300 font-normal"
        >
          Solicitar un nuevo Código
        </Link>
      </nav>

    </>
  )
}