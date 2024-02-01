import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from "unique-names-generator";

const getRandomName = async () => {
  const randomName = await uniqueNamesGenerator({
    dictionaries: [adjectives, animals],
  });

  return randomName;
};

export default getRandomName;
