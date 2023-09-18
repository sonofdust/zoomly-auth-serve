const getPrompt = (invoice: string) =>
  `Create a JSON object called "invoice" from the following text: "${invoice}"

Find the year, make, and model of the vehicle and put those fields in a JSON object with a key of “vehicle”. The object should be in the following format: { "vehicle": { "year": "", "make": "", "model": "" } } add this object to the "invoice".

Find the parts list with the associated quantity, part ID, part description, and unit price. Each array element should be in the form { "quantity": 0, "part_num": "", "description": "", "price": "" }. The array should have a key of "parts_list". Add this to the "invoice".
if there is no parts list and no vehicle data return an empty object.
Print the "invoice" object only.

`;
export default getPrompt;
