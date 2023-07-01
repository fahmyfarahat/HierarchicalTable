import axios from "axios";

export async function retrieveData() {
  // fetch the local JSON file
  const response = await axios.get(process.env.PUBLIC_URL + "./data.json");

  return response.data;
}
