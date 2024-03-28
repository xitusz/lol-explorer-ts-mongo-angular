import db from "../database/models";

interface IFavorite {
  favorite: string[];
}

const createFavorites = async (userId: number): Promise<string> => {
  try {
    const favorites = await db.Favorite.findOne({
      where: { userId },
    });

    if (!favorites) {
      await db.Favorite.create({
        userId,
        favorite: [],
      });
    }

    return "Favorito criado com sucesso";
  } catch (err) {
    throw new Error(`Erro ao criar favorito: ${err}`);
  }
};

const listFavorites = async (userId: number): Promise<IFavorite> => {
  try {
    const favorites = await db.Favorite.findOne({
      where: { userId },
    });

    return favorites;
  } catch (err) {
    throw new Error(`Erro ao listar favoritos: ${err}`);
  }
};

const addFavorite = async (
  userId: number,
  favoriteName: string,
): Promise<string> => {
  try {
    const favorites = await db.Favorite.findOne({ where: { userId } });

    if (!favorites) {
      await db.Favorite.create({
        userId,
        favorite: [favoriteName],
      });
    } else {
      if (!favorites.favorite.includes(favoriteName)) {
        favorites.favorite = [...favorites.favorite, favoriteName];

        await favorites.save();
      }
    }

    return "Favorito adicionado com sucesso";
  } catch (err) {
    throw new Error(`Erro ao adicionar favorito: ${err}`);
  }
};

const removeFavorite = async (
  userId: number,
  favoriteName: string,
): Promise<string> => {
  try {
    const favorites = await db.Favorite.findOne({ where: { userId } });

    if (favorites) {
      favorites.favorite = favorites.favorite.filter(
        (name: string) => name !== favoriteName,
      );

      await favorites.save();
    }

    return "Favorito removido com sucesso";
  } catch (err) {
    throw new Error(`Erro ao remover favorito: ${err}`);
  }
};

const clearFavorites = async (userId: number): Promise<string> => {
  try {
    const favorites = await db.Favorite.findOne({ where: { userId } });

    if (favorites) {
      favorites.favorite = [];

      await favorites.save();
    }

    return "Todos os favoritos foram removidos com sucesso";
  } catch (err) {
    throw new Error(`Erro ao limpar favoritos: ${err}`);
  }
};

export default {
  createFavorites,
  listFavorites,
  addFavorite,
  removeFavorite,
  clearFavorites,
};
