"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

type InputOTPContextValue = {
  mask?: boolean;
  maskChar?: string;
  invalid?: boolean;
};

const InputOTPContext = React.createContext<InputOTPContextValue>({});

const InputOTP = React.forwardRef<
  React.ElementRef<typeof OTPInput>,
  React.ComponentProps<typeof OTPInput> & {
    containerClassName?: string;
    mask?: boolean;
    maskChar?: string;
  }
>(({
  className,
  containerClassName,
  mask,
  maskChar = "•",
  "aria-invalid": ariaInvalid,
  ...props
}, ref) => {
  const invalid = ariaInvalid === true || ariaInvalid === "true";

  return (
    <InputOTPContext.Provider value={{ mask, maskChar, invalid }}>
      <OTPInput
        ref={ref}
        data-slot="input-otp"
        aria-invalid={ariaInvalid}
        containerClassName={cn(
          "flex items-center gap-2 has-disabled:opacity-50",
          invalid &&
            "[&_[data-slot=input-otp-slot]]:border-destructive [&_[data-slot=input-otp-slot]]:ring-destructive/20 dark:[&_[data-slot=input-otp-slot]]:ring-destructive/40",
          containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    </InputOTPContext.Provider>
  );
});
InputOTP.displayName = "InputOTP";

const InputOTPGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
};

const InputOTPSlot = ({
  index,
  className,
  mask,
  maskChar,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  mask?: boolean;
  maskChar?: string;
}) => {
  const inputOTPContext = React.useContext(OTPInputContext);
  const otpContext = React.useContext(InputOTPContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
  const shouldMask = mask ?? otpContext.mask;
  const displayChar =
    shouldMask && char ? (maskChar ?? otpContext.maskChar ?? "•") : char;
  const invalid = otpContext.invalid;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      aria-invalid={invalid || undefined}
      className={cn(
        "relative flex h-10 w-10 items-center justify-center border-y border-r border-input bg-input-background text-sm font-medium shadow-xs transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md",
        "data-[active=true]:z-10 data-[active=true]:border-ring data-[active=true]:ring-[3px] data-[active=true]:ring-ring/50",
        "aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40",
        "dark:bg-input/30",
        className,
      )}
      {...props}
    >
      {displayChar}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink h-4 w-px bg-foreground duration-1000" />
        </div>
      )}
    </div>
  );
};

const InputOTPSeparator = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="input-otp-separator"
      role="separator"
      aria-orientation="vertical"
      aria-hidden="true"
      className={cn("flex items-center text-muted-foreground", className)}
      {...props}
    >
      <MinusIcon className="size-4" />
    </div>
  );
};

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
