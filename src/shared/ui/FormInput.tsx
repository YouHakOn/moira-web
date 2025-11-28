import type { ReactNode } from 'react'

function FormInput({
  label,
  error,
  children
}: {
  label?: string
  error?: string
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
