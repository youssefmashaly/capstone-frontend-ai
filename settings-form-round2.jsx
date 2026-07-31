import { useState, useCallback } from "react";
import { Check, AlertCircle, Loader2, Settings2 } from "lucide-react";

/* ------------------------------------------------------------------
 * LAYER 1: Validation schema — pure data describing the rules.
 * To add a field, you add an entry here. Nothing below needs to change.
 * ------------------------------------------------------------------ */
const validationSchema = {
  displayName: {
    required: true,
    minLength: 2,
    maxLength: 40,
    message: "Enter a name between 2 and 40 characters.",
  },
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: "Enter a valid email address.",
  },
  bio: {
    required: false,
    maxLength: 160,
    message: "Keep your bio under 160 characters.",
  },
  newPassword: {
    required: false,
    custom: (value) =>
      value.length > 0 && (value.length < 8 || !/\d/.test(value))
        ? "Password needs 8+ characters and at least one number."
        : null,
  },
  confirmPassword: {
    required: false,
    custom: (value, allValues) =>
      allValues.newPassword && value !== allValues.newPassword
        ? "Passwords don't match."
        : null,
  },
};

const initialValues = {
  displayName: "",
  email: "",
  bio: "",
  theme: "system",
  emailNotifications: true,
  newPassword: "",
  confirmPassword: "",
};

/* ------------------------------------------------------------------
 * LAYER 2: Generic validation hook — knows nothing about "settings."
 * It only knows how to read a schema and manage values/errors/touched.
 * This is the piece that's reusable across any form in an app.
 * ------------------------------------------------------------------ */
function validateField(name, value, allValues, schema) {
  const rules = schema[name];
  if (!rules) return null;

  if (rules.required && !String(value).trim()) return "This field is required.";
  if (rules.minLength && value.length < rules.minLength) return rules.message;
  if (rules.maxLength && value.length > rules.maxLength) return rules.message;
  if (rules.pattern && value && !rules.pattern.test(value)) return rules.message;
  if (rules.custom) return rules.custom(value, allValues);
  return null;
}

function useFormValidation(initial, schema) {
  const [values, setValues] = useState(initial);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateAll = useCallback(
    (vals) => {
      const nextErrors = {};
      Object.keys(schema).forEach((name) => {
        const err = validateField(name, vals[name], vals, schema);
        if (err) nextErrors[name] = err;
      });
      return nextErrors;
    },
    [schema]
  );

  const handleChange = (name, value) => {
    const nextValues = { ...values, [name]: value };
    setValues(nextValues);
    if (touched[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(name, value, nextValues, schema),
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateField(name, values[name], values, schema),
    }));
  };

  const handleSubmit = (onValid) => (e) => {
    e.preventDefault();
    const nextErrors = validateAll(values);
    setErrors(nextErrors);
    setTouched(
      Object.keys(schema).reduce((acc, k) => ({ ...acc, [k]: true }), {})
    );
    if (Object.values(nextErrors).every((v) => !v)) onValid(values);
  };

  const isValid = Object.values(validateAll(values)).every((v) => !v);

  return { values, errors, touched, handleChange, handleBlur, handleSubmit, isValid };
}

/* ------------------------------------------------------------------
 * LAYER 3: Presentational Field component — knows nothing about
 * "email" or "password," only how to render label + input + error
 * consistently. This is what keeps the form JSX short.
 * ------------------------------------------------------------------ */
function Field({ label, name, error, touched, hint, children }) {
  const showError = touched && error;
  return (
    <div className="mb-5">
      <label
        htmlFor={name}
        className="block text-xs font-mono tracking-wide text-neutral-400 mb-1.5"
      >
        {label}
      </label>
      {children}
      <div className="min-h-[18px] mt-1">
        {showError ? (
          <p className="flex items-center gap-1 text-xs text-rose-400">
            <AlertCircle size={12} /> {error}
          </p>
        ) : hint ? (
          <p className="text-xs text-neutral-500">{hint}</p>
        ) : null}
      </div>
    </div>
  );
}

const inputBase =
  "w-full rounded-md bg-neutral-800 border px-3 py-2 text-sm text-neutral-100 " +
  "placeholder-neutral-500 outline-none transition-colors focus:ring-2 focus:ring-offset-0";

function inputClasses(hasError) {
  return `${inputBase} ${
    hasError
      ? "border-rose-500/60 focus:ring-rose-500/40"
      : "border-neutral-700 focus:ring-emerald-500/40 focus:border-emerald-500/60"
  }`;
}

/* ------------------------------------------------------------------
 * The form itself — thin, because the layers above did the work.
 * ------------------------------------------------------------------ */
export default function SettingsForm() {
  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
  } = useFormValidation(initialValues, validationSchema);

  const [status, setStatus] = useState("idle"); // idle | saving | saved

  const onSubmit = handleSubmit(() => {
    setStatus("saving");
    setTimeout(() => setStatus("saved"), 900);
  });

  return (
    <div className="min-h-full w-full bg-neutral-900 flex items-start justify-center py-10 px-4">
      <div className="w-full max-w-md">
        <div className="flex items-center gap-2 mb-1">
          <Settings2 size={18} className="text-emerald-400" />
          <h1 className="text-lg font-semibold text-neutral-100">
            Account settings
          </h1>
        </div>
        <p className="text-sm text-neutral-500 mb-6">
          Update your profile and preferences.
        </p>

        <form onSubmit={onSubmit} noValidate>
          <Field
            label="DISPLAY NAME"
            name="displayName"
            error={errors.displayName}
            touched={touched.displayName}
          >
            <input
              id="displayName"
              type="text"
              value={values.displayName}
              onChange={(e) => handleChange("displayName", e.target.value)}
              onBlur={() => handleBlur("displayName")}
              className={inputClasses(touched.displayName && errors.displayName)}
              placeholder="Ada Lovelace"
            />
          </Field>

          <Field
            label="EMAIL"
            name="email"
            error={errors.email}
            touched={touched.email}
          >
            <input
              id="email"
              type="email"
              value={values.email}
              onChange={(e) => handleChange("email", e.target.value)}
              onBlur={() => handleBlur("email")}
              className={inputClasses(touched.email && errors.email)}
              placeholder="ada@example.com"
            />
          </Field>

          <Field
            label="BIO"
            name="bio"
            error={errors.bio}
            touched={touched.bio}
            hint={`${values.bio.length}/160`}
          >
            <textarea
              id="bio"
              rows={3}
              value={values.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              onBlur={() => handleBlur("bio")}
              className={inputClasses(touched.bio && errors.bio) + " resize-none"}
              placeholder="A short line about you"
            />
          </Field>

          <Field label="THEME" name="theme">
            <select
              id="theme"
              value={values.theme}
              onChange={(e) => handleChange("theme", e.target.value)}
              className={inputClasses(false)}
            >
              <option value="system">System</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </Field>

          <label className="flex items-center gap-2 mb-6 text-sm text-neutral-300 cursor-pointer">
            <input
              type="checkbox"
              checked={values.emailNotifications}
              onChange={(e) =>
                handleChange("emailNotifications", e.target.checked)
              }
              className="w-4 h-4 rounded accent-emerald-500"
            />
            Email me about account activity
          </label>

          <div className="border-t border-neutral-800 pt-5 mb-1">
            <p className="text-xs font-mono tracking-wide text-neutral-400 mb-3">
              CHANGE PASSWORD
            </p>

            <Field
              label="NEW PASSWORD"
              name="newPassword"
              error={errors.newPassword}
              touched={touched.newPassword}
              hint="Leave blank to keep your current password."
            >
              <input
                id="newPassword"
                type="password"
                value={values.newPassword}
                onChange={(e) => handleChange("newPassword", e.target.value)}
                onBlur={() => handleBlur("newPassword")}
                className={inputClasses(touched.newPassword && errors.newPassword)}
                placeholder="••••••••"
              />
            </Field>

            <Field
              label="CONFIRM PASSWORD"
              name="confirmPassword"
              error={errors.confirmPassword}
              touched={touched.confirmPassword}
            >
              <input
                id="confirmPassword"
                type="password"
                value={values.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
                onBlur={() => handleBlur("confirmPassword")}
                className={inputClasses(
                  touched.confirmPassword && errors.confirmPassword
                )}
                placeholder="••••••••"
              />
            </Field>
          </div>

          <button
            type="submit"
            disabled={status === "saving"}
            className={`w-full mt-2 rounded-md py-2.5 text-sm font-medium transition-colors flex items-center justify-center gap-2
              ${
                status === "saved"
                  ? "bg-emerald-600 text-white"
                  : "bg-emerald-500 hover:bg-emerald-400 text-neutral-950 disabled:opacity-70"
              }`}
          >
            {status === "saving" && <Loader2 size={14} className="animate-spin" />}
            {status === "saved" && <Check size={14} />}
            {status === "saving"
              ? "Saving..."
              : status === "saved"
              ? "Saved"
              : "Save changes"}
          </button>

          {!isValid && Object.values(touched).some(Boolean) && status === "idle" && (
            <p className="text-xs text-neutral-500 text-center mt-3">
              Fix the errors above to save.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}