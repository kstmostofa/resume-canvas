import { Textarea } from "@/components/ui/textarea";
import { useEffect, useState } from "react";

interface DebouncedTextareaProps extends React.ComponentProps<typeof Textarea> {
  value: string;
  onDebouncedChange: (value: string) => void;
  debounceTime?: number;
}

export function DebouncedTextarea({
  value: initialValue,
  onDebouncedChange,
  debounceTime = 500,
  ...props
}: DebouncedTextareaProps) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (value !== initialValue) {
        onDebouncedChange(value);
      }
    }, debounceTime);

    return () => clearTimeout(timeout);
  }, [value, debounceTime, initialValue, onDebouncedChange]);

  return (
    <Textarea
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
