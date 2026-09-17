import * as React from "react";
import { borderWidth, colors, fontSize, radii } from "../../lib/theme";

export interface TextFieldProps {
  id: string;
  label: string;
  type?: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  autoComplete?: string;
}

/**
 * The labeled text input used on Login/Signup/Onboarding-Identity — the
 * canonical style was pixel-identical (copy-pasted) across all three
 * mockups: 13px label, 12px-radius input, 14px padding, 15px value text.
 */
export function TextField({ id, label, type = "text", placeholder, value, onChange, autoComplete }: TextFieldProps) {
  return (
    <div>
      <label htmlFor={id} style={{ display: "block", fontSize: fontSize.label, color: colors.textSecondary, marginBottom: 6 }}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        style={{
          width: "100%",
          boxSizing: "border-box",
          border: `${borderWidth.static}px solid ${colors.border}`,
          borderRadius: radii.input,
          padding: 14,
          fontSize: fontSize.bodyEmphasis,
          color: colors.textPrimary,
          fontFamily: "inherit",
        }}
      />
    </div>
  );
}
