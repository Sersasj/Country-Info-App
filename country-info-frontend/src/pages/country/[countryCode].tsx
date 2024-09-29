import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchCountryInfo } from "../../utils/api";
import PopulationChart from "../../components/PopulationChart";
import { CountryInfo } from "../../types";

export default function CountryInfoPage() {
  const router = useRouter();
  const { countryCode } = router.query;

  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!countryCode) return;

    const getCountryInfo = async () => {
      try {
        const data = await fetchCountryInfo(countryCode as string);
        setCountryInfo(data);
      } catch (error) {
        console.error("Error fetching country info:", error);
        setError("Failed to load country information.");
      } finally {
        setLoading(false);
      }
    };

    getCountryInfo();
  }, [countryCode]);

  if (loading)
    return <p className="text-center mt-8">Loading country information...</p>;
  if (error) return <p className="text-center mt-8 text-red-500">{error}</p>;
  if (!countryInfo)
    return (
      <p className="text-center mt-8">No country information available.</p>
    );

  return (
    <div className="min-h-screen bg-background text-foreground p-4">
      <div className="max-w-3xl mx-auto mb-6">
        <Link
          href="/"
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7A1 1 0 004 10h1v7a1 1 0 001 1h3a1 1 0 001-1v-4h2v4a1 1 0 001 1h3a1 1 0 001-1v-7h1a1 1 0 00.707-1.707l-7-7z" />
          </svg>
          Home
        </Link>
      </div>

      <div className="max-w-3xl mx-auto bg-card text-card-foreground p-6 rounded-lg shadow">
        <div className="flex items-center mb-6">
          <img
            src={countryInfo.flagUrl}
            alt={`Flag of ${countryInfo.countryName}`}
            className="w-12 h-18 mr-4 rounded shadow"
          />
          <h1 className="text-4xl font-bold">{countryInfo.countryName}</h1>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Border Countries</h2>
        {countryInfo.borderCountries.length > 0 ? (
          <ul className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-6">
            {countryInfo.borderCountries.map((borderCountry) => (
              <li key={borderCountry.countryCode}>
                <Link
                  href={`/country/${borderCountry.countryCode}`}
                  className="block p-4 bg-white text-gray-800 rounded-lg shadow hover:bg-gray-200"
                >
                  {borderCountry.commonName}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mb-6">This country has no bordering countries.</p>
        )}
        <h2 className="text-2xl font-semibold mb-4">Population Over Time</h2>
        {countryInfo.populationData.length > 0 ? (
          <PopulationChart data={countryInfo.populationData} />
        ) : (
          <p>No population data available.</p>
        )}
      </div>
    </div>
  );
}
