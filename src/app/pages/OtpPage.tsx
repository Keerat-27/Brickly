import { useState } from "react";
import { useForm } from "react-hook-form";
import { PageHeader } from "../components/ui/PageHeader";
import { ComponentSection } from "../components/ui/ComponentSection";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
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

export const OtpPage = () => {
  const [masked, setMasked] = useState(false);
  const form = useForm({ defaultValues: { pin: "" } });

  return (
    <div className="space-y-10">
      <PageHeader
        title="OTP Input"
        description="One-time password fields with split-digit slots, separators, and form validation."
        badge="Component"
      />

      <ComponentSection
        title="Split Digits"
        description="Six separate slots — the default verification code pattern."
        source="shadcn"
        shadcnComponent="input-otp"
        code={`import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

<InputOTP maxLength={6}>
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
      >
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
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
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  </InputOTPGroup>
</InputOTP>`}
      >
        <InputOTP maxLength={6}>
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
          <InputOTP maxLength={4} mask={masked}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
          </InputOTP>
          <Button variant="outline" size="sm" className="w-fit" onClick={() => setMasked((v) => !v)}>
            {masked ? "Show digits" : "Mask digits"}
          </Button>
        </div>
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
        <InputOTP maxLength={6} {...field}>
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
            className="flex flex-col gap-4 max-w-sm"
          >
            <FormField
              control={form.control}
              name="pin"
              rules={{
                required: "Enter the 6-digit code",
                minLength: { value: 6, message: "Code must be 6 digits" },
              }}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification code</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
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
        <div className="space-y-1.5">
          <Label>Code sent — waiting for resend</Label>
          <InputOTP maxLength={6} disabled value="123456">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </ComponentSection>
    </div>
  );
};
