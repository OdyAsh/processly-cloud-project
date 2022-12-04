const TextInput = (props) => {
  return (
    <div className="label-and-input">
      <label className="form-label">{props.label}</label>
      <input
        className="input-box"
        type={props.type}
        {...props.register(props.name, props.validation)}
        onChange={props.onChange}
      />
    </div>
  );
};

export default TextInput;
