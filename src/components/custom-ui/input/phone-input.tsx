import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import CustomInput from "@/components/custom-ui/input/CustomInput";
import { useTranslation } from "react-i18next";
import { cn } from "@/lib/utils";
import React from "react";
import { Phone } from "lucide-react";

// Country data with min/max length
type CountryCode = {
  code: string;
  label: string;
  dialCode: string;
  minLength: number;
  maxLength: number;
};

const countryCodes: CountryCode[] = [
  {
    code: "AF",
    label: "🇦🇫 Afghanistan",
    dialCode: "+93",
    minLength: 1,
    maxLength: 9,
  },
];

export interface PhoneInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  startContent?: React.ReactNode;
  startContentDark?: boolean;
  requiredHint?: string;
  label?: string;
  endContent?: React.ReactNode;
  errorMessage?: string;
  parentClassName?: string;
}

const PhoneInput = React.forwardRef<HTMLInputElement, PhoneInputProps>(
  (
    {
      className,
      requiredHint,
      startContent,
      startContentDark,
      endContent,
      parentClassName = "",
      errorMessage,
      required,
      label,
      onChange,
      readOnly,
      ...rest
    },
    ref
  ) => {
    const [country, setCountry] = useState<CountryCode>(countryCodes[0]);
    const [phone, setPhone] = useState("");
    const [isValid, setIsValid] = useState<boolean | null>(null);
    const [error, setError] = useState<string | undefined>(undefined);
    const { t } = useTranslation();

    const validatePhone = (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      const numericValue = value.replace(/\D/g, "");

      // Afghanistan rule: no leading zero
      if (country.code === "AF" && numericValue.startsWith("0")) {
        setError("Phone number cannot start with 0 for Afghanistan");
        setIsValid(false);
        return;
      }
      if (numericValue.length > country.maxLength) {
        return;
      } else if (numericValue.length < country.maxLength) {
        setError(`Phone number must be ${country.maxLength} digits`);
        setIsValid(false);
        if (onChange) onChange(event);
        setPhone(numericValue);
        return;
      } else {
        if (onChange) onChange(event);
        setPhone(numericValue);
        setError(undefined);
        setIsValid(true);
      }
    };

    return (
      <div
        className="grid grid-cols-[auto_1fr] min-h-[50px] mt-2 grid-rows-[auto_auto] grid-areas-[ 'select input' 'select valid' ] items-baseline space-x-1"
        style={{
          gridTemplateAreas: `"select input" "select valid"`,
          gridTemplateColumns: "auto 1fr",
          gridTemplateRows: "auto auto",
        }}
      >
        <Select
          value={country.code}
          onValueChange={(value) => {
            const selected = countryCodes.find((c) => c.code === value);
            if (selected) {
              setCountry(selected);
              setPhone("");
              setIsValid(null);
              setError(undefined);
            }
          }}
        >
          <SelectTrigger
            className={cn(
              "w-fit text-[12px] min-h-[50px] focus:ring-0 ring-0 bg-card border-primary/25 shadow-none rounded px-2 flex items-center"
            )}
          >
            <SelectValue placeholder="Code" />
          </SelectTrigger>
          <SelectContent className=" w-fit max-w-fit min-w-fit p-0 rounded">
            {countryCodes.map((c) => (
              <SelectItem
                key={c.code}
                value={c.code}
                className="text-[12px] w-fit"
              >
                {c.code} ({c.dialCode})
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <CustomInput
          {...rest}
          ref={ref}
          size_="sm"
          name="full_name"
          value={phone}
          placeholder={t("phone_number")}
          type="text"
          startContent={
            <Phone className="text-tertiary size-[18px] pointer-events-none" />
          }
          errorMessage={error}
          onChange={validatePhone}
        />
        {isValid && !error && (
          <p
            className="rtl:text-sm-rtl ltr:text-sm-ltr text-start capitalize text-green-600"
            style={{ gridArea: "valid" }}
          >
            Valid number ✓
          </p>
        )}
      </div>
    );
  }
);

PhoneInput.displayName = "PhoneInput";
export default PhoneInput;
