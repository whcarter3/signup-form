import React, { useState } from 'react';
import InputField from './input';

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
  error: string;
  buttonLabel: string;
}

enum FormStatus {
  IDLE,
  SUBMITTING,
  SUCCESS,
  ERROR,
}

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
    buttonLabel: 'Sign Up',
  });

  const [formStatus, setFormStatus] = useState<FormStatus>(
    FormStatus.IDLE
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setFormData({
        ...formData,
        error: 'Passwords do not match',
        buttonLabel: 'Check Errors',
      });
      setFormStatus(FormStatus.ERROR);
    } else {
      setFormData({
        ...formData,
        error: '',
        buttonLabel: 'Sending...',
      });
      setFormStatus(FormStatus.SUBMITTING);
      // Here is where we would submit the form data to the server
      // For now, we'll just simulate a successful submission
      setTimeout(() => {
        setFormStatus(FormStatus.SUCCESS);
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          error: '',
          buttonLabel: 'Sign Up',
        });
      }, 2000);
    }
  };

  return (
    <>
      {/* show success message upon successful submission */}
      {formStatus === FormStatus.SUCCESS && (
        <div className="container">
          <p className="success">Form submitted successfully!</p>
        </div>
      )}

      {formStatus !== FormStatus.SUCCESS && (
        <form onSubmit={handleSubmit} className="container">
          <InputField
            label="Username"
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            required={true}
          />
          <InputField
            label="Password"
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            required={true}
          />
          <InputField
            label="Confirm Password"
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({
                ...formData,
                confirmPassword: e.target.value,
              })
            }
            required={true}
          />
          {formStatus === FormStatus.ERROR && (
            <p className="error">{formData.error}</p>
          )}
          <button type="submit">{formData.buttonLabel}</button>
        </form>
      )}
    </>
  );
};

export default SignupForm;
