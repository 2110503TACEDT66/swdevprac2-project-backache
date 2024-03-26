"use client";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tel: "",
    role: "user",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/v1/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        window.location.href = "/signin";
      } else {
        alert("Registration failed, Please try again");
      }
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="bg-blue-100 p-5 rounded-lg">
      <h1 className="text-2xl font-bold text-blue-700 text-center mb-6">
        Join Our Dental Family
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col items-center">
        <div className="mb-4">
          <label htmlFor="name" className="text-blue-700 font-bold mb-1 block">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Full Name"
            required
            className="border border-blue-700 rounded-md px-3 py-2 w-80"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="text-blue-700 font-bold mb-1 block">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email Address"
            required
            className="border border-blue-700 rounded-md px-3 py-2 w-80"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="tel" className="text-blue-700 font-bold mb-1 block">
            Telephone
          </label>
          <input
            type="tel"
            id="tel"
            name="tel"
            value={formData.tel}
            onChange={handleChange}
            placeholder="Your Phone Number"
            required
            className="border border-blue-700 rounded-md px-3 py-2 w-80"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="text-blue-700 font-bold mb-1 block"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create a Strong Password"
            required
            className="border border-blue-700 rounded-md px-3 py-2 w-80"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-700 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}

{
  /* <div>
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        value={formData.name} 
                        onChange={handleChange} 
                        placeholder="Name" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        value={formData.email} 
                        onChange={handleChange} 
                        placeholder="Email" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="tel">Telephone</label>
                    <input 
                        type="tel" 
                        id="tel" 
                        name="tel" 
                        value={formData.tel} 
                        onChange={handleChange} 
                        placeholder="Telephone" 
                        required 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        value={formData.password} 
                        onChange={handleChange} 
                        placeholder="Password" 
                        required 
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div> */
}
