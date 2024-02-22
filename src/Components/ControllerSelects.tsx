import { Control, Controller } from "react-hook-form";
import Select from "react-select";

const ControllerSelects = ({
  label,
  name,
  control,
  options,
}: {
  label: string;
  name: string;
  options: {
    value: string;
    label: string;
  }[];
  control: Control;
}) => {
  return (
    <div className="w-[250px]">
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Select {...field} options={options} placeholder={label} />
        )}
      />
    </div>
  );
};

export default ControllerSelects;
