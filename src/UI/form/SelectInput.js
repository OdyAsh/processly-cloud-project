const SelectInput = (props) => {
  return (
    <div className="label-and-input">
      <label className="form-label">{props.label}</label>
      <select
        className="input-box"
        {...props.register(props.name, {
          required: props.required,
          onChange: props.onChange, // added onChange here, as we need to bind register() with the onChange function first before obtaining it from spread (...) operator
        })}
      >
        {props.options.map((o) => (
          <option value={o.value} key={o.value}>
            {o.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectInput;
