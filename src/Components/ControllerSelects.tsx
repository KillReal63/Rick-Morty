import classNames from "classnames";
import { Control, Controller } from "react-hook-form";
import Select from "react-select";
import useScreenWidth from "../helpers/useScreenWidth";

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
  const screenWidth = useScreenWidth();

  return (
    <div className={classNames(screenWidth > 1300 ? "w-[250px]" : "w-[150px]")}>
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...field } }) => (
          <Select options={options} placeholder={label} ref={ref} {...field} />
        )}
      />
    </div>
  );
};

export default ControllerSelects;
