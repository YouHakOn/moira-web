import type { ReactNode } from 'react'
import type { FieldError } from 'react-hook-form'

function FormInput({
  label,
  error,
  children
}: {
  label?: string
  error?: string | FieldError
  children?: ReactNode
}) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      {children}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  )
}

export { FormInput }
