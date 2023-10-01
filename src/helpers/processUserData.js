export const processUserData = (userData) => {
  let data = {};
  for (const key in userData) {
    let keys = key.split("_");
    let val = { [keys[1]]: userData[key] };
    data[keys[0]] = { ...data[keys[0]], ...val };
  }

  console.log(data);

  return data;
};
