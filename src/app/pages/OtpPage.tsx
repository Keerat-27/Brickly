import { useState } from "react";
import { useForm } from "react-hook-form";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "../components/ui/alert";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../components/ui/input-otp";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";

const DEMO_CODE = "123456";

const OtpSlots = ({ maxLength = 6 }: { maxLength?: number }) => (
  <InputOTPGroup>
    {Array.from({ length: maxLength }, (_, index) => (
      <InputOTPSlot key={index} index={index} />
    ))}
  </InputOTPGroup>
);

const OtpSlotsWithSeparator = () => (
  <>
    <InputOTPGroup>
      <InputOTPSlot index={0} />
      <InputOTPSlot index={1} />
      <InputOTPSlot index={2} />
    </InputOTPGroup>
    <InputOTPSeparator />
    <InputOTPGroup>
      <InputOTPSlot index={3} />
      <InputOTPSlot index={4} />
      <InputOTPSlot index={5} />
    </InputOTPGroup>
  </>
);

type VerificationFormValues = { pin: string };

const VerificationFormDemo = () => {
  const [status, setStatus] = useState<"idle" | "verifying" | "success">("idle");
  const form = useForm<VerificationFormValues>({ defaultValues: { pin: "" } });
  const isVerifying = status === "verifying";

  const onSubmit = async ({ pin }: VerificationFormValues) => {
    setStatus("verifying");
    form.clearErrors("pin");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      if (pin === DEMO_CODE) {
        setStatus("success");
        return;
      }

      setStatus("idle");
      form.setError("pin", {
        type: "server",
        message: "Invalid code. Use 123456 for this demo.",
      });
      form.setFocus("pin");
    } catch {
      setStatus("idle");
      form.setError("pin", {
        type: "server",
        message: "Verification failed. Please try again.",
      });
    }
  };

  const handleReset = () => {
    setStatus("idle");
    form.reset();
  };

  if (status === "success") {
    return (
      <div className="flex max-w-sm flex-col gap-4">
        <Alert className="border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950/30 dark:text-green-400">
          <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
          <AlertTitle className="text-green-800 dark:text-green-400">
            Verified
          </AlertTitle>
          <AlertDescription className="text-green-700 dark:text-green-400/90">
            Your code was accepted. In a real app you would redirect here.
          </AlertDescription>
        </Alert>
        <Button type="button" variant="outline" size="sm" className="w-fit" onClick={handleReset}>
          Try again
        </Button>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex max-w-sm flex-col gap-4"
        noValidate
      >
        <FormField
          control={form.control}
          name="pin"
          rules={{
            required: "Enter the 6-digit code",
            minLength: { value: 6, message: "Code must be 6 digits" },
            pattern: { value: /^\d{6}$/, message: "Code must contain only digits" },
          }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification code</FormLabel>
              <FormControl>
                <InputOTP
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  disabled={isVerifying}
                  autoComplete="one-time-code"
                  inputMode="numeric"
                  {...field}
                >
                  <OtpSlotsWithSeparator />
                </InputOTP>
              </FormControl>
              <FormDescription>
                Demo code: <span className="font-mono font-medium">{DEMO_CODE}</span>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" size="sm" className="w-fit" disabled={isVerifying}>
          {isVerifying ? (
            <>
              <Loader2 className="animate-spin" />
              Verifying…
            </>
          ) : (
            "Verify"
          )}
        </Button>
      </form>
    </Form>
  );
};

export const OtpPage = () => {
  const [masked, setMasked] = useState(false);
  const form = useForm({ defaultValues: { pin: "" } });

  return (
    <div className="space-y-10">
      <PageHeader
        title="OTP Input"
        description="One-time password fields with split-digit slots, separators, masking, and validation."
        badge="Component"
      />

      <ComponentSection
        title="Split Digits"
        description="Six separate slots — the default verification code pattern."
        accessibility="Set inputMode='numeric' and autoComplete='one-time-code' for mobile OTP autofill."
        source="shadcn"
        shadcnComponent="input-otp"
        code={`import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

<InputOTP maxLength={6} inputMode="numeric" autoComplete="one-time-code">
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    ...
  </InputOTPGroup>
</InputOTP>`}
      >
        <InputOTP maxLength={6} inputMode="numeric" autoComplete="one-time-code">
          <OtpSlots />
        </InputOTP>
      </ComponentSection>

      <ComponentSection
        title="With Separator"
        description="Grouped as 3 + 3 digits for readability."
        source="shadcn"
        shadcnComponent="input-otp"
        code={`<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    ...
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    ...
  </InputOTPGroup>
</InputOTP>`}
      >
        <InputOTP maxLength={6} inputMode="numeric">
          <OtpSlotsWithSeparator />
        </InputOTP>
      </ComponentSection>

      <ComponentSection
        title="Masked Input"
        description="Toggle password-style masking for sensitive codes."
        source="shadcn"
        shadcnComponent="input-otp"
        code={`<InputOTP maxLength={4} mask={masked}>
  ...
</InputOTP>`}
      >
        <div className="flex flex-col gap-3">
          <InputOTP maxLength={4} mask={masked} inputMode="numeric">
            <OtpSlots maxLength={4} />
          </InputOTP>
          <Button
            variant="outline"
            size="sm"
            className="w-fit"
            onClick={() => setMasked((value) => !value)}
          >
            {masked ? "Show digits" : "Mask digits"}
          </Button>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Error State"
        description="Invalid slots pick up destructive border and ring styles via aria-invalid."
        accessibility="Pair with a visible error message. FormMessage sets aria-invalid automatically through FormControl."
        source="shadcn"
        shadcnComponent="input-otp"
        code={`<div className="space-y-2">
  <Label>Verification code</Label>
  <InputOTP maxLength={6} aria-invalid="true" value="123">
    ...
  </InputOTP>
  <p className="text-sm text-destructive">Code must be 6 digits.</p>
</div>`}
      >
        <div className="space-y-2 max-w-sm">
          <Label className="text-destructive">Verification code</Label>
          <InputOTP maxLength={6} aria-invalid value="123" inputMode="numeric">
            <OtpSlotsWithSeparator />
          </InputOTP>
          <p className="flex items-center gap-1.5 text-sm text-destructive">
            <XCircle className="size-3.5 shrink-0" />
            Code must be 6 digits.
          </p>
        </div>
      </ComponentSection>

      <ComponentSection
        title="Verification Flow"
        description="Async submit with loading, server-side error, and success feedback."
        accessibility="Disable the field while verifying. Announce errors with FormMessage and success with role='alert'."
        source="composition"
        code={`const onSubmit = async ({ pin }) => {
  setStatus("verifying");
  form.clearErrors("pin");
  const valid = await verifyCode(pin);
  if (!valid) {
    form.setError("pin", { message: "Invalid code." });
    setStatus("idle");
    return;
  }
  setStatus("success");
};`}
      >
        <VerificationFormDemo />
      </ComponentSection>

      <ComponentSection
        title="Form Validation"
        description="React Hook Form integration with required PIN validation."
        source="shadcn"
        shadcnComponent="form"
        code={`const form = useForm({ defaultValues: { pin: "" } });

<FormField
  control={form.control}
  name="pin"
  rules={{ required: "Enter the 6-digit code", minLength: { value: 6, message: "Code must be 6 digits" } }}
  render={({ field }) => (
    <FormItem>
      <FormLabel>Verification code</FormLabel>
      <FormControl>
        <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} {...field}>
          ...
        </InputOTP>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>`}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(() => {})}
            className="flex max-w-sm flex-col gap-4"
            noValidate
          >
            <FormField
              control={form.control}
              name="pin"
              rules={{
                required: "Enter the 6-digit code",
                minLength: { value: 6, message: "Code must be 6 digits" },
                pattern: { value: /^\d{6}$/, message: "Code must contain only digits" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <InputOTP
                      maxLength={6}
                      pattern={REGEXP_ONLY_DIGITS}
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      {...field}
                    >
                      <OtpSlots />
                    </InputOTP>
                  </FormControl>
                  <FormDescription>We sent a code to your email.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" size="sm" className="w-fit">
              Verify
            </Button>
          </form>
        </Form>
      </ComponentSection>

      <ComponentSection
        title="Disabled State"
        description="Non-interactive slots for pending verification flows."
        source="shadcn"
        shadcnComponent="input-otp"
        code={`<InputOTP maxLength={6} disabled value="123456">
  ...
</InputOTP>`}
      >
        <div className="space-y-2">
          <Label className="text-muted-foreground">Code sent — waiting for resend</Label>
          <InputOTP maxLength={6} disabled value="123456" inputMode="numeric">
            <OtpSlots />
          </InputOTP>
        </div>
      </ComponentSection>
    </div>
  );
};
