// Desc: Input component for forms with error handling
import textInputStyles from "../styles/ui/textInput.module.scss";

export default function Input({
  placeholder = "",
  name,
  error = "",
  type = "text",
  title,
  onChange = () => {},
}) {
  return (
    <div className="mb-3 mt-1">
      <div className="flex flex-col gap-1">
        <label htmlFor={name} className="text-lg font-bold">
          {title}
        </label>
        <input
          id={name}
          type={type}
          placeholder={placeholder}
          className={`w-full ${textInputStyles.input} ${textInputStyles.primary}`}
          name={name}
          onChange={onChange}
        />
      </div>
      <span style={{ display: error.length > 0 ? "inline-block" : "none" }}>
        {error}
      </span>
    </div>
  );
}
