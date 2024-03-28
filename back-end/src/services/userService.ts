import db from "../database/models";
import axios from "axios";
import { hash, verify } from "../utils/hash";
import { sign } from "../utils/jwtConfig";

interface IUserProfile {
  name: string;
  email: string;
}

interface ILogin {
  user: {
    name: string;
    email: string;
  };
  token: string;
}

const verifyRecaptcha = async (
  recaptchaValue: string | null,
): Promise<void> => {
  if (!recaptchaValue) {
    const error = new Error("reCAPTCHA ausente");
    (error as any).statusCode = 400;
    throw error;
  }

  const googleResponse = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaValue}`,
  );

  if (!googleResponse.data.success) {
    const error = new Error("reCAPTCHA inválido");
    (error as any).statusCode = 400;
    throw error;
  }
};

const create = async (
  name: string,
  email: string,
  password: string,
  /*recaptchaValue: string,*/
): Promise<string> => {
  try {
    /*await verifyRecaptcha(recaptchaValue);*/

    const hashedPassword = await hash(password);
    const existEmail = await db.User.findOne({ where: { email } });

    if (existEmail) {
      const error = new Error("Email já registrado");
      (error as any).statusCode = 409;
      throw error;
    }

    await db.User.create({
      name,
      email,
      password: hashedPassword,
    });

    return "Usuário criado";
  } catch (err) {
    throw new Error(`Erro ao criar usuário: ${err}`);
  }
};

const login = async (
  email: string,
  password: string,
  /*recaptchaValue: string,*/
): Promise<ILogin | string> => {
  try {
    /*await verifyRecaptcha(recaptchaValue);*/

    const user = await db.User.findOne({ where: { email } });

    if (!user || !(await verify(password, user.password))) {
      const error = new Error("Email ou senha inválida");
      (error as any).statusCode = 404;
      throw error;
    }

    const {
      dataValues: { id },
    } = user;

    const token = sign({ id });

    delete user.dataValues.password;

    return {
      ...user.dataValues,
      token,
    };
  } catch (err) {
    throw new Error(`Erro ao realizar login do usuário: ${err}`);
  }
};

const getProfileInfo = async (
  userId: string,
): Promise<IUserProfile | string> => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      attributes: ["name", "email"],
    });

    if (!user) {
      const error = new Error("Usuário não encontrado");
      (error as any).statusCode = 404;
      throw error;
    }

    return {
      name: user.name,
      email: user.email,
    };
  } catch (err) {
    throw new Error(`Erro ao buscar usuário: ${err}`);
  }
};

const updateName = async (userId: string, newName: string): Promise<string> => {
  try {
    await db.User.update({ name: newName }, { where: { id: userId } });

    return "Nome atualizado com sucesso!";
  } catch (err) {
    throw new Error(`Erro ao atualizar nome: ${err}`);
  }
};

const updateEmail = async (
  userId: string,
  newEmail: string,
): Promise<string> => {
  try {
    await db.User.update({ email: newEmail }, { where: { id: userId } });

    return "Email atualizado com sucesso!";
  } catch (err) {
    throw new Error(`Erro ao atualizar email: ${err}`);
  }
};

const updatePassword = async (
  userId: string,
  newPassword: string,
): Promise<string> => {
  try {
    const hashedPassword = await hash(newPassword);

    await db.User.update(
      { password: hashedPassword },
      { where: { id: userId } },
    );

    return "Senha atualizada com sucesso!";
  } catch (err) {
    throw new Error(`Erro ao atualizar senha: ${err}`);
  }
};

const deleteUser = async (userId: string): Promise<string> => {
  try {
    const user = await db.User.findOne({ where: { id: userId } });

    if (!user) {
      const error = new Error("Usuário não encontrado");
      (error as any).statusCode = 404;
      throw error;
    }

    await db.User.destroy({ where: { id: userId } });

    return "Usuário excluído com sucesso!";
  } catch (err) {
    throw new Error(`Erro ao deletar usuário: ${err}`);
  }
};

const validateEmail = async (newEmail: string): Promise<boolean> => {
  try {
    const existingUser = await db.User.findOne({ where: { email: newEmail } });

    return !!existingUser;
  } catch (err) {
    throw new Error(`Erro ao validar email: ${err}`);
  }
};

export default {
  verifyRecaptcha,
  create,
  login,
  getProfileInfo,
  updateName,
  updateEmail,
  updatePassword,
  deleteUser,
  validateEmail,
};
