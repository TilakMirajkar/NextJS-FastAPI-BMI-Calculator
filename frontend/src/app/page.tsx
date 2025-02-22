"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Home() {
  const [formData, setformData] = useState({ age: "", height: "", weight: "" });
  const [bmi, setBmi] = useState(null);
  const [classification, setClassification] = useState(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/calculate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      setBmi(data.bmi);
      setClassification(data.classification);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-center">
        <h1 className="text-4xl font-black">BMI Calculator</h1>
        <form onSubmit={handleSubmit} className="flex gap-8 font-medium">
          <Input
            type="number"
            name="height"
            placeholder="Height (cm)"
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="weight"
            placeholder="Weight (kg)"
            onChange={handleChange}
            required
          />
          <Button type="submit">Calculate</Button>
        </form>
        {bmi && (
          <h2 className="font-bold">
            BMI: {bmi} Classification: {classification}
          </h2>
        )}
      </main>
    </div>
  );
}
