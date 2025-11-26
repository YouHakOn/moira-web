function FormInput({ label, error, children }) {
  return (
    <div>
      <div>
        <label>{label}</label>
      </div>
      {children}
      {error && <p className="text-red-500">{error.message}</p>}
    </div>
  )
}

export { FormInput }
