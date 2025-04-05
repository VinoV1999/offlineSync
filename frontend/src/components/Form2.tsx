import React, { useState } from "react";
import "../App.css";
import { saveUserDetails, UserDetailsType } from "../service/saveUserDetails";
import OfflineStoreManager from "../store/offlineStoreManager";
import { formSubmitFrom, statusEnum } from "../utils/enums";

const Form2: React.FC = () => {
  const [user, setUser] = useState<UserDetailsType>({
    email: "",
    firstName: "",
    lastName: "",
    age: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: name === 'age' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dexieDB = OfflineStoreManager.getInstance();

    if (!dexieDB.isOnline()) {
      await dexieDB.addFormData({
        formData: user, 
        action: formSubmitFrom.SAVEUSERDETAILS,
        status: statusEnum.PENDING, 
        createdAt: new Date(), 
        version: 1
      });
      alert('Your are offline: form data saved offline. will be synced when you back online!');
    } else {
      const res =await saveUserDetails(user);
      console.log('Form submitted to API:', res);
      if("error" in res) {
        alert(`Error: ${res.error}`);
        return;
      }
      alert('User details saved successfully!');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">User Details Form2</h1>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="form-input"
            autoComplete="new-email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="firstName" className="form-label">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={user.firstName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName" className="form-label">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={user.lastName}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age" className="form-label">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={user.age}
            onChange={handleChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="submit-button">Submit</button>
      </form>
    </div>
  );
};

export default Form2;
