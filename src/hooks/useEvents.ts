import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const url =
  "https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router/events";

// Define the expected event structure
export interface Event {
  id: number;
  category: string;
  title: string;
  description: string;
  location: string;
  date: string;
  time: string;
  petsAllowed: boolean;
  organizer: string;
}

// Fetch function with pagination & filtering
const fetchEvents = async (
  page: number,
  search: string,
  petsAllowed: boolean
): Promise<Event[]> => {
  const { data } = await axios.get<Event[]>(url, {
    params: { _page: page, _limit: 2, q: search },
  });

  return petsAllowed ? data.filter((event) => event.petsAllowed) : data;
};

export const useEvents = (
  page: number,
  search: string,
  petsAllowed: boolean
) => {
  return useQuery<Event[], Error>({
    queryKey: ["events", page, search, petsAllowed],
    queryFn: () => fetchEvents(page, search, petsAllowed),
    keepPreviousData: true, // ✅ Prevents flickering when changing pages
  });
};
