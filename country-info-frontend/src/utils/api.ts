import axios from "axios";
import { Country, CountryInfo } from "../types";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:3001";
export const fetchCountries = async (): Promise<Country[]> => {
  const response = await axios.get<Country[]>(`${API_BASE_URL}/countries`);
  return response.data;
};

export const fetchCountryInfo = async (code: string): Promise<CountryInfo> => {
  const response = await axios.get<CountryInfo>(
    `${API_BASE_URL}/countries/${code}`
  );
  return response.data;
};
