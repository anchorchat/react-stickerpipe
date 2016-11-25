function parseResponse(response) {
  if (response && response.data && (typeof response.data === 'object')) {
    return response.data;
  }

  if (response && response.text && (typeof response.text === 'string')) {
    try {
      const parsedResponse = JSON.parse(response.text);

      if (
        parsedResponse
        && parsedResponse.data
        && (parsedResponse.data instanceof Object === true)
      ) {
        return parsedResponse.data;
      }
    } catch (err) {
      console.warn('Error while parsing JSON', err);
    }
  }

  return {};
}

export default parseResponse;
