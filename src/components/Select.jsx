// import { Select, Option } from "@material-tailwind/react";
 
export default function SelectInput({ handleSortChange }) {

  const handleSelectChange = (e) => {
      const selectedValue = e.target.value;
      if (selectedValue) {
          handleSortChange(selectedValue);
      }
  };
  return (
    <div className="w-20">
    <select
        className="form-select"
        onChange={handleSelectChange}
    >
        <option value="">Sort By</option>
        <option value="petName">Pet Name</option>
        <option value="ownerName">Owner Name</option>
        <option value="aptDate">Date</option>
        <optgroup label="Order">
            <option value="asc">Acs</option>
            <option value="desc">Desc</option>
        </optgroup>
    </select>
</div>
  );
}