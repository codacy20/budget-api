export const editFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();
  const fileDate = file.originalname.split('.').shift();
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${fileDate}-${randomName}.${fileExtName}`);
};
