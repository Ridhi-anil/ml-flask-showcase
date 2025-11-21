import "./Form.css";

export default function Input({ label, name, onChange, value }) {
  return (
    <>
      <div class="input-group">
        <label>{label}</label>
        <input
          type="number"
          step="any"
          name={name}
          value={value}
          onChange={onChange}
          required
        ></input>
      </div>
    </>
  );
}
