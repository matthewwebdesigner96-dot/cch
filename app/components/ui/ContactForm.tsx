"use client";
import { submitForm } from "@/app/actions";
import { ReactNode, useActionState } from "react";

const FloatingField = ({
  id,
  name,
  label,
  type = "text",
  required,
  error,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  error?: string;
}) => (
  <div className="relative flex-1 group">
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      placeholder=" "
      className="peer w-full bg-transparent border-b border-white/40 focus:border-white outline-none py-2 text-white text-sm transition-colors duration-200"
    />
    <label
      htmlFor={id}
      className="absolute left-0 top-2 text-sm text-white/70 transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none"
    >
      {label}
    </label>
    {error && <p className="text-red-300 text-xs mt-1">{error}</p>}
  </div>
);

const ContactForm = ({
  className,
  children,
}: {
  className: string;
  children?: ReactNode;
}) => {
  const [state, formAction, pending] = useActionState(submitForm, {
    success: false,
    message: "",
    errors: {},
  });

  return (
    <div className={`${className}`}>
      <h2 className="flex flex-col w-fit text-2xl lg:text-4xl font-extralight leading-8 md:leading-15">
        CONTACT
      </h2>

      {children}

      <form action={formAction} className="flex flex-col gap-10 mt-2">
        <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

        <div className="flex flex-col sm:flex-row gap-10">
          <FloatingField id="firstName" name="firstName" label="First Name*" required error={state.errors?.firstName} />
          <FloatingField id="lastName" name="lastName" label="Last Name*" required error={state.errors?.lastName} />
        </div>

        <FloatingField id="email" name="email" label="Email*" type="email" required error={state.errors?.email} />

        {/* Message */}
        <div className="relative">
          <textarea
            id="message"
            name="message"
            rows={1}
            required
            placeholder=" "
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = "auto";
              t.style.height = t.scrollHeight + "px";
            }}
            className="peer w-full bg-transparent border-b border-white/40 focus:border-white outline-none py-2 text-white text-sm transition-colors duration-200 resize-none overflow-y-auto max-h-40"
          />
          <label
            htmlFor="message"
            className="absolute left-0 top-2 text-sm text-white/70 transition-all duration-200 peer-focus:-top-4 peer-focus:text-xs peer-focus:text-white peer-not-placeholder-shown:-top-4 peer-not-placeholder-shown:text-xs pointer-events-none"
          >
            Message*
          </label>
          {state.errors?.message && <p className="text-red-300 text-xs mt-1">{state.errors.message}</p>}
        </div>

        {state.message && (
          <div className={`p-3 rounded text-sm ${state.success ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
            {state.message}
          </div>
        )}

        <button
          className="bg-gold text-white text-sm py-4 cursor-pointer disabled:opacity-50 uppercase tracking-widest hover:opacity-80 transition-opacity duration-300"
          type="submit"
          disabled={pending}
        >
          {pending ? "Submitting..." : "Send Message"}
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
