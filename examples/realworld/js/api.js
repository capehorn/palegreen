
const API_ROOT = "https://api.realworld.show/api";


export async function getArticles() {
  try {
    const response = await fetch(API_ROOT + "/articles");
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
