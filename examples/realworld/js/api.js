
const API_ROOT = "https://api.realworld.show/api";


export async function getArticles(offset=0, limit=10) {
  try {
    const response = await fetch(API_ROOT + `/articles?offset=${offset}&limit=${limit}`);
    if (response.ok) {
      const result = await response.json();
      //console.log(result);
      return result;
    }
    throw new Error(`Response status: ${response.status}`);
  } catch (error) {
    console.error(error.message);
  }
}
