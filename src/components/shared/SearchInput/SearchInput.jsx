import "./SearchInput.css";

const SearchInput = ({
  value,
  onChange,
  placeholder,
  className,
}) => (
  <input
    className={`form-control search-input ${className}`.trim()}
    type="text"
    placeholder={placeholder}
    onChange={(event) => onChange(event.target.value)}
    value={value}
  />
);

export default SearchInput;
