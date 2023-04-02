export const pluralize = (word, count) => {
    return word + (count === 1 ? '' : 's');
  }