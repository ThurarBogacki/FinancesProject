const Finances = require("../models/financesData");

async function read(request, response) {
  const financesList = await Finances.find();
  return response.json(financesList);
}

async function create(request, response) {
  const { descricao, recebidos, gastos } = request.body;

  if (descricao) {
    if (!recebidos && !gastos) {
      return response
        .status(400)
        .json({ error: "necessário entrar com os dados" });
    }
  } else {
    return response
      .status(400)
      .json({ error: "necessário entrar com os dados" });
  }

  const financesCreated = await Finances.create({
    descricao,
    recebidos,
    gastos,
  });

  return response.json(financesCreated);
}

async function deleteRecord(request, response) {
  const { id } = request.params;

  const financesDeleted = await Finances.findOneAndDelete({ _id: id });

  if (financesDeleted) {
    return response.json(financesDeleted);
  }

  return response
    .status(404)
    .json({ error: "Nao foi encontrado o registro especifico" });
}

module.exports = {
  read,
  create,
  delete: deleteRecord,
};
