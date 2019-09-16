export const editFileName = (req, file, callback) => {
  const fileExtName = file.originalname.split('.').pop();
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  const now = new Date();
  const today = now.getMonth() + '-' + now.getDate() + '-' + now.getFullYear();
  callback(null, `${today}-${randomName}.${fileExtName}`);
};
