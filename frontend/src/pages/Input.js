import "./Form.css";

export default function Input({ label, name ,handleChange,value}) {
  return (
    <>
      <div className="input-group">
        <label>{label}</label>
        <input type="number" step="any" name={name} defaultValue={value} onChange={handleChange} required></input>
      </div>
      ;
    </>
  );
}
