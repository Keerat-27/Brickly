"use client";

import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";
import { MinusIcon } from "lucide-react";

import { cn } from "./utils";

type InputOTPMaskContextValue = {
  mask?: boolean;
  maskChar?: string;
};

const InputOTPMaskContext = React.createContext<InputOTPMaskContextValue>({});

const InputOTP = ({
  className,
  containerClassName,
  mask,
  maskChar = "•",
  ...props
}: React.ComponentProps<typeof OTPInput> & {
  containerClassName?: string;
  mask?: boolean;
  maskChar?: string;
}) => {
  return (
    <InputOTPMaskContext.Provider value={{ mask, maskChar }}>
      <OTPInput
        data-slot="input-otp"
        containerClassName={cn(
          "flex items-center gap-2 has-disabled:opacity-50",
          containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        {...props}
      />
    </InputOTPMaskContext.Provider>
  );
}

const InputOTPGroup = ({ className, ...props }: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="input-otp-group"
      className={cn("flex items-center gap-1", className)}
      {...props}
    />
  );
}

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
  const maskContext = React.useContext(InputOTPMaskContext);
  const { char, hasFakeCaret, isActive } = inputOTPContext?.slots[index] ?? {};
  const shouldMask = mask ?? maskContext.mask;
  const displayChar =
    shouldMask && char ? (maskChar ?? maskContext.maskChar ?? "•") : char;

  return (
    <div
      data-slot="input-otp-slot"
      data-active={isActive}
      className={cn(
        "data-[active=true]:border-ring data-[active=true]:ring-ring/50 data-[active=true]:aria-invalid:ring-destructive/20 dark:data-[active=true]:aria-invalid:ring-destructive/40 aria-invalid:border-destructive data-[active=true]:aria-invalid:border-destructive dark:bg-input/30 border-input relative flex h-9 w-9 items-center justify-center border-y border-r text-sm bg-input-background transition-all outline-none first:rounded-l-md first:border-l last:rounded-r-md data-[active=true]:z-10 data-[active=true]:ring-[3px]",
        className,
      )}
      {...props}
    >
      {displayChar}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
        </div>
      )}
    </div>
  );
}

const InputOTPSeparator = ({ ...props }: React.ComponentProps<"div">) => {
  return (
    <div data-slot="input-otp-separator" role="separator" {...props}>
      <MinusIcon />
    </div>
  );
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator };
