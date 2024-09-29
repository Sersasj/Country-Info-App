import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchCountries } from "../utils/api";
import { Country } from "../types";

export default function Home() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getCountries = async () => {
      try {
        const data = await fetchCountries();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
        setError("Failed to load countries.");
      } finally {
        setLoading(false);
      }
    };

    getCountries();
  }, []);

  if (loading) return <p className="text-center">Loading countries...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-4">
      <h1 className="text-10xl font-bold text-center mb-6">
        Available Countries
      </h1>
      <ul className="max-w-md mx-auto space-y-2">
        {countries.map((country) => (
          <li key={country.countryCode}>
            <Link
              href={`/country/${country.countryCode}`}
              className="block p-4 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-200"
            >
              {country.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
