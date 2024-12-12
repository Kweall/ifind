import axios from "axios";

export interface Holiday {
  name: string;
  date: string;
  description?: string;
}

interface AbstractAPIResponse {
  name: string;
  date: string;
  description?: string;
}

export const fetchHolidays = async (
  year: number,
  month: number,
  day: number
): Promise<Holiday[]> => {
  const apiKey = "aa3ab666fd6449619026d98342318c6d";
  try {
    const response = await axios.get<AbstractAPIResponse[]>(
      `https://holidays.abstractapi.com/v1/?api_key=${apiKey}&country=US&year=${year}&month=${month}&day=${day}`
    );

    return response.data.map((holiday) => ({
      name: holiday.name,
      date: holiday.date,
      description: holiday.description,
    }));
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return [];
  }
};