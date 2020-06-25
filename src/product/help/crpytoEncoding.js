import crpyto from 'crypto';

const comparePassword = async (password, salt, key) => {
  return (
    crpyto
      .scryptSync(password, salt.toString('hex'), 64, 'sha512')
      .toString('hex') === key
  );
};

const saltHashEncoding = async (password) => {
  const hash = crpyto.randomFillSync(Buffer.alloc(64)).toString('hex');
  return {
    key: await crpyto.scryptSync(password, hash, 64, 'sha512').toString('hex'),
    salt: hash,
  };
};

export default {
  saltHashEncoding,
  comparePassword,
};
