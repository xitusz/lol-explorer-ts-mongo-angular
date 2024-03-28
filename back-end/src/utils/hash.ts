import bcrypt from "bcrypt";

const hash = async (str: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(str, saltRounds);

    return hashedPassword;
  } catch (err) {
    throw new Error(`Erro ao fazer o hashing da senha: ${err}`);
  }
};

const verify = async (
  str: string,
  hashedPassword: string,
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(str, hashedPassword);

    return isMatch;
  } catch (err) {
    throw new Error(`Erro ao verificar a senha: ${err}`);
  }
};

export { hash, verify };
