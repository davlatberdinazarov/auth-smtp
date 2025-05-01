import React from 'react'
import Register from './Register'
import OTPVerify from './OTP-verify'

export default function Auth() {
  const [step, setStep] = React.useState(1)
  return (
    <div>
        { step === 1 ? <Register setStep={setStep}/> : <OTPVerify/>}
    </div>
  )
}
