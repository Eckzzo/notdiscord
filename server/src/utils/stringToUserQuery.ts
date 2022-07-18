function stringToUserQuery(usernameWithDenominator: string) {
  const split = usernameWithDenominator.split('#');
  if (split.length !== 2) {
    return;
  }

  const toQueryParams = { username: split[0], denominator: Number(split[1]) };

  if (typeof toQueryParams.username !== 'string' || typeof toQueryParams.denominator !== 'number') {
    return;
  } else {
    return toQueryParams;
  }
}

export { stringToUserQuery };
