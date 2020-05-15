import crpyto from 'crypto';

const comparePassword = async (password, salt, key) => {
  return (
    crpyto
      .scryptSync(password, salt.toString('hex'), 64, 'sha512')
      .toString('hex') === key
  );
};

export default {
  comparePassword,
};
