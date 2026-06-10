"use client";

import { useState } from "react";
import { Loader2, CheckCircle2 } from "lucide-react";

// Replace REPLACE_WITH_YOUR_ID with your actual Formspree form ID
const FORMSPREE_ENDPOINT = "https://formspree.io/f/REPLACE_WITH_YOUR_ID";

type FormValues = {
  fullName: string;
  email: string;
  country: string;
  experience: string;
  challenge: string;
  source: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = {
  fullName: "",
  email: "",
  country: "",
  experience: "",
  challenge: "",
  source: "",
};

const experienceOptions = [
  "Never traded",
  "Less than 6 months",
  "6 months to 1 year",
  "1 to 2 years",
  "2+ years",
];

const sourceOptions = [
  "Instagram",
  "Referral from a friend",
  "Google Search",
  "Other",
];

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  if (!values.fullName.trim()) errors.fullName = "Please enter your full name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email address.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.country.trim()) errors.country = "Please enter your country.";
  if (!values.experience)
    errors.experience = "Please select your trading experience.";
  if (!values.challenge.trim())
    errors.challenge = "Please tell us what's holding you back.";
  if (!values.source)
    errors.source = "Please let us know how you heard about us.";
  return errors;
}

export default function ApplicationForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const update = (field: keyof FormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitError(null);

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          "Full Name": values.fullName,
          Email: values.email,
          Country: values.country,
          "Trading Experience": values.experience,
          "Biggest Challenge": values.challenge,
          "Heard About BreakevenFX": values.source,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        setValues(EMPTY);
      } else {
        setSubmitError(
          "Something went wrong submitting your application. Please try again."
        );
      }
    } catch {
      setSubmitError(
        "We couldn't reach the server. Check your connection and try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const inputBase =
    "w-full rounded-md bg-brand-navy-3 px-4 py-3 text-brand-white placeholder:text-brand-muted transition-colors focus:outline-none focus:ring-0 focus:border-brand-orange";

  const borderFor = (field: keyof FormValues) =>
    errors[field] ? "border border-brand-red" : "border border-brand-border";

  return (
    <section id="apply" className="bg-brand-navy py-20 sm:py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p className="font-mono text-xs uppercase tracking-widest text-brand-orange">
            Applications Open
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold text-brand-white sm:text-4xl">
            Ready to Change Your Trading?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-brand-muted">
            Spots are limited. Abhiveer reviews every application personally and
            only accepts traders who are genuinely ready to do the work.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-[600px] rounded-2xl border border-brand-border bg-brand-navy-2 p-6 sm:p-10">
          {submitted ? (
            <div className="flex flex-col items-center rounded-xl bg-brand-green px-6 py-10 text-center">
              <CheckCircle2 className="text-brand-white" size={40} />
              <p className="mt-4 font-display text-xl font-semibold text-brand-white">
                Application received.
              </p>
              <p className="mt-2 text-[15px] text-brand-white/90">
                Abhiveer will be in touch within 48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="mb-1.5 block text-sm font-medium text-brand-white"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={values.fullName}
                  onChange={(e) => update("fullName", e.target.value)}
                  className={`${inputBase} ${borderFor("fullName")}`}
                  placeholder="Your name"
                  aria-invalid={!!errors.fullName}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-sm text-brand-red">
                    {errors.fullName}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-brand-white"
                >
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={values.email}
                  onChange={(e) => update("email", e.target.value)}
                  className={`${inputBase} ${borderFor("email")}`}
                  placeholder="you@example.com"
                  aria-invalid={!!errors.email}
                />
                {errors.email && (
                  <p className="mt-1.5 text-sm text-brand-red">{errors.email}</p>
                )}
              </div>

              {/* Country */}
              <div>
                <label
                  htmlFor="country"
                  className="mb-1.5 block text-sm font-medium text-brand-white"
                >
                  Country
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={values.country}
                  onChange={(e) => update("country", e.target.value)}
                  className={`${inputBase} ${borderFor("country")}`}
                  placeholder="Where you're based"
                  aria-invalid={!!errors.country}
                />
                {errors.country && (
                  <p className="mt-1.5 text-sm text-brand-red">
                    {errors.country}
                  </p>
                )}
              </div>

              {/* Trading Experience */}
              <div>
                <label
                  htmlFor="experience"
                  className="mb-1.5 block text-sm font-medium text-brand-white"
                >
                  Trading Experience
                </label>
                <select
                  id="experience"
                  name="experience"
                  value={values.experience}
                  onChange={(e) => update("experience", e.target.value)}
                  className={`${inputBase} ${borderFor("experience")} ${
                    values.experience ? "text-brand-white" : "text-brand-muted"
                  }`}
                  aria-invalid={!!errors.experience}
                >
                  <option value="" disabled>
                    Select your experience
                  </option>
                  {experienceOptions.map((opt) => (
                    <option key={opt} value={opt} className="text-brand-white">
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.experience && (
                  <p className="mt-1.5 text-sm text-brand-red">
                    {errors.experience}
                  </p>
                )}
              </div>

              {/* Current Biggest Challenge */}
              <div>
                <label
                  htmlFor="challenge"
                  className="mb-1.5 block text-sm font-medium text-brand-white"
                >
                  Current Biggest Challenge
                </label>
                <textarea
                  id="challenge"
                  name="challenge"
                  rows={4}
                  value={values.challenge}
                  onChange={(e) => update("challenge", e.target.value)}
                  className={`${inputBase} ${borderFor("challenge")} resize-y`}
                  placeholder="Be honest — what's actually holding you back right now?"
                  aria-invalid={!!errors.challenge}
                />
                {errors.challenge && (
                  <p className="mt-1.5 text-sm text-brand-red">
                    {errors.challenge}
                  </p>
                )}
              </div>

              {/* How did you hear about us */}
              <div>
                <label
                  htmlFor="source"
                  className="mb-1.5 block text-sm font-medium text-brand-white"
                >
                  How did you hear about BreakevenFX?
                </label>
                <select
                  id="source"
                  name="source"
                  value={values.source}
                  onChange={(e) => update("source", e.target.value)}
                  className={`${inputBase} ${borderFor("source")} ${
                    values.source ? "text-brand-white" : "text-brand-muted"
                  }`}
                  aria-invalid={!!errors.source}
                >
                  <option value="" disabled>
                    Select an option
                  </option>
                  {sourceOptions.map((opt) => (
                    <option key={opt} value={opt} className="text-brand-white">
                      {opt}
                    </option>
                  ))}
                </select>
                {errors.source && (
                  <p className="mt-1.5 text-sm text-brand-red">
                    {errors.source}
                  </p>
                )}
              </div>

              {submitError && (
                <p className="rounded-md border border-brand-red/40 bg-brand-red/10 px-4 py-3 text-sm text-brand-red">
                  {submitError}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-orange px-6 py-3.5 text-sm font-semibold text-brand-white transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {submitting ? (
                  <>
                    <Loader2 size={18} className="animate-spin" />
                    Submitting…
                  </>
                ) : (
                  "Submit Application"
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
