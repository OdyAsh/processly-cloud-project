const SelectInput = (props) => {
  return (
    <div className="label-and-input">
      <label className="form-label">{props.label}</label>
      <select
        className="input-box"
        onChange={props.onChange}
        {...props.register(props.name, {
          required: props.required,
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
