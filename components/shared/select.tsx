
import { SelectContent, SelectItem, SelectTrigger, SelectValue, Select as ShadCnSelect } from "../ui/select"

interface SelectProps {
    onValueChange: (value: string) => void;
    value: string;
    options?: { label: string; value: string }[];
    placeholder?: string;
}

export default function Select({ onValueChange, value, options, placeholder = "Select an option" }: SelectProps) {
    return (
        <ShadCnSelect
            value={value}
            onValueChange={onValueChange}
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options?.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                        {option.label}
                    </SelectItem>
                ))}
            </SelectContent>
        </ShadCnSelect>
    )
}