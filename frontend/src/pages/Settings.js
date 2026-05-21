import { useEffect, useState } from 'react';
import API from '../services/api';

function Settings() {

  /*
    PROFILE
  */
  const [profile, setProfile] = useState({
    name: '',
    email: ''
  });

  /*
    PASSWORDS
  */
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: ''
  });

  /*
    UI STATES
  */
  const [message, setMessage] =
    useState('');

  const [error, setError] =
    useState('');

  /*
    DARK MODE
  */
  const [darkMode, setDarkMode] =
    useState(
      localStorage.getItem(
        'darkMode'
      ) === 'true'
    );

  /*
    LOAD PROFILE
  */
  useEffect(() => {
    fetchProfile();
  }, []);

  /*
    DARK MODE EFFECT
  */
  useEffect(() => {

    if (darkMode) {
      document.body.classList.add(
        'dark-mode'
      );
    } else {
      document.body.classList.remove(
        'dark-mode'
      );
    }

    localStorage.setItem(
      'darkMode',
      darkMode
    );

  }, [darkMode]);

  /*
    FETCH PROFILE
  */
  const fetchProfile = async () => {

    try {

      const res =
        await API.get(
          '/auth/profile'
        );

      setProfile({
        name:
          res.data.user?.name ||
          '',
        email:
          res.data.user?.email ||
          ''
      });

    } catch (err) {

      console.log(
        'Fetch Profile Error:',
        err
      );

      setError(
        'Failed to load profile'
      );

    }
  };

  /*
    UPDATE PROFILE
  */
  const updateProfile = async () => {

    try {

      setMessage('');
      setError('');

      const res =
        await API.put(
          '/auth/profile',
          {
            name: profile.name,
            email: profile.email
          }
        );

      setMessage(
        res.data.message ||
          'Profile updated successfully'
      );

      /*
        UPDATE LOCAL STORAGE USER
      */
      const user =
        JSON.parse(
          localStorage.getItem(
            'user'
          )
        ) || {};

      user.name = profile.name;
      user.email = profile.email;

      localStorage.setItem(
        'user',
        JSON.stringify(user)
      );

    } catch (err) {

      console.log(
        'Update Profile Error:',
        err
      );

      setError(
        err.response?.data
          ?.message ||
          'Failed to update profile'
      );
    }
  };

  /*
    UPDATE PASSWORD
  */
  const updatePassword = async () => {

    try {

      setMessage('');
      setError('');

      const res =
        await API.put(
          '/auth/change-password',
          passwords
        );

      setMessage(
        res.data.message ||
          'Password updated successfully'
      );

      setPasswords({
        currentPassword: '',
        newPassword: ''
      });

    } catch (err) {

      console.log(
        'Password Update Error:',
        err
      );

      setError(
        err.response?.data
          ?.message ||
          'Failed to update password'
      );
    }
  };

  return (
    <div>

      {/* HEADER */}
      <div className="page-header">

        <div>
          <h2>Settings</h2>

          <p>
            Manage account preferences
            and application settings.
          </p>
        </div>

      </div>

      {/* SUCCESS */}
      {message && (
        <div className="success-message">
          {message}
        </div>
      )}

      {/* ERROR */}
      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <div className="settings-grid">

        {/* PROFILE */}
        <div className="card">

          <h3>
            PROFILE SETTINGS
          </h3>

          <input
            type="text"
            placeholder="Full Name"
            value={profile.name}
            onChange={(e) =>
              setProfile({
                ...profile,
                name:
                  e.target.value
              })
            }
          />

          <input
            type="email"
            placeholder="Email Address"
            value={profile.email}
            onChange={(e) =>
              setProfile({
                ...profile,
                email:
                  e.target.value
              })
            }
          />

          <button
            className="primary-btn"
            onClick={
              updateProfile
            }
          >
            Save Changes
          </button>

        </div>

        {/* SECURITY */}
        <div className="card">

          <h3>SECURITY</h3>

          <input
            type="password"
            placeholder="Current Password"
            value={
              passwords.currentPassword
            }
            onChange={(e) =>
              setPasswords({
                ...passwords,
                currentPassword:
                  e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="New Password"
            value={
              passwords.newPassword
            }
            onChange={(e) =>
              setPasswords({
                ...passwords,
                newPassword:
                  e.target.value
              })
            }
          />

          <button
            className="primary-btn"
            onClick={
              updatePassword
            }
          >
            Update Password
          </button>

        </div>

        {/* APPEARANCE */}
        <div className="card">

          <h3>APPEARANCE</h3>

          <div className="theme-toggle">

            <span>
              Dark Mode
            </span>

            <button
              className="toggle-btn"
              onClick={() =>
                setDarkMode(
                  !darkMode
                )
              }
            >
              {darkMode
                ? 'Enabled'
                : 'Disabled'}
            </button>

          </div>

        </div>

        {/* NOTIFICATIONS */}
        <div className="card">

          <h3>
            NOTIFICATIONS
          </h3>

          <label>
            <input
              type="checkbox"
            />
            Followup Alerts
          </label>

          <label>
            <input
              type="checkbox"
            />
            Email Notifications
          </label>

          <label>
            <input
              type="checkbox"
            />
            WhatsApp Alerts
          </label>

        </div>

      </div>
    </div>
  );
}

export default Settings;