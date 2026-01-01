
export function formatDate(standardDateTimeStr, outputFormatOptions) {
  try {
    let date = new Date(standardDateTimeStr);
    return date.toLocaleDateString(navigator.language, outputFormatOptions);
  } catch (error) {
    console.error(error);
  }
}
