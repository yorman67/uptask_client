import { useState } from "react"
import NewPasswordToken from "../../components/auth/NewPasswordToken"
import NewPasswordForm from "../../components/auth/NewPasswordForm"
import { ConfirmToken } from "../../types"

export default function NewPasswordView() {

  const [token, setToken] = useState<ConfirmToken['token']>('')
  const [isvalidToken, setIsValidToken] = useState(false)

  return (
    <>
      <h1 className="text-5xl font-black text-white">Reestablecer contraseña</h1>
      <p className="text-2xl font-light text-white mt-5">
        Ingresa el codigo que resiviste en tu correo {''}
      </p>

      {!isvalidToken ? 
      <NewPasswordToken 
        token={token}
        setToken={setToken}
        setIsValidToken={setIsValidToken}
      />: <NewPasswordForm 
        token={token!}
      />}

    </>
  )
}
