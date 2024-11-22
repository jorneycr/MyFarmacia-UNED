import { ObjectId } from 'bson';

const generateObjectId = () => {
  const objectId = new ObjectId();
  return objectId.toString();
};

export default generateObjectId;
