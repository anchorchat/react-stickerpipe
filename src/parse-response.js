function parseResponse(response) {
  let text;

  if (response && response.content && (typeof response.content === 'string')) {
    text = response.content;
  }

  if (response && response.text && (typeof response.text === 'string')) {
    text = response.text;
  }

  if (!text) {
    console.log('Did not supply any matching response format. Response is:', text);
    return null;
  }

  try {
    const parsedResponse = JSON.parse(text);

    if (
      parsedResponse
      && parsedResponse.data
      && (parsedResponse.data instanceof Object === true)
    ) {
      return parsedResponse.data;
    }
  } catch (err) {
    console.log('Error while parsing JSON', err);
  }

  return null;
}

export default parseResponse;
