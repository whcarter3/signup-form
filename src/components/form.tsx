import React, { useState } from 'react';
import InputField from './input';

interface FormState {
  username: string;
  password: string;
  confirmPassword: string;
  error: string;
}

enum FormStatus {
  IDLE,
  SUBMITTING,
  SUBMITTED,
  ERROR,
}

const fieldData = [
  {
    label: 'Username',
    type: 'text',
    value: 'username',
  },
  {
    label: 'Password',
    type: 'password',
    value: 'password',
  },
  {
    label: 'Confirm Password',
    type: 'password',
    value: 'confirmPassword',
  },
];

const SignupForm: React.FC = () => {
  const [formData, setFormData] = useState<FormState>({
    username: '',
    password: '',
    confirmPassword: '',
    error: '',
  });
  const [formStatus, setFormStatus] = useState<FormStatus>(
    FormStatus.IDLE
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus(FormStatus.SUBMITTING);
    if (formData.password !== formData.confirmPassword) {
      setFormData({ ...formData, error: 'Passwords do not match' });
      setFormStatus(FormStatus.ERROR);
    } else {
      setFormData({ ...formData, error: '' });
      setFormStatus(FormStatus.SUBMITTED);
      // Submit form data to server
      setFormData({
        username: '',
        password: '',
        confirmPassword: '',
        error: '',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fieldData.map((field) => (
        <InputField
          label={field.label}
          type={field.type}
          value={field.value}
          onChange={(e) =>
            setFormData({ ...formData, username: e.target.value })
          }
        />
      ))}
      <InputField
        label="Password"
        type="password"
        value={formData.password}
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
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
      />
      {formData.error && (
        <p style={{ color: 'red' }}>{formData.error}</p>
      )}
      <button type="submit">
        {formStatus === FormStatus.SUBMITTING ? 'sending...' : 'Send'}
      </button>
    </form>
  );
};

export default SignupForm;
