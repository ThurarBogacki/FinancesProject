const Finances = require("../models/financesData");

async function updateDescription(finances, descricao) {
  if (descricao) {
    finances.descricao = descricao;
    await finances.save();
  }
}

async function updateRecebidos(finances, recebidos) {
  if (recebidos) {
    finances.recebidos = recebidos;
    await finances.save();
  }
}

async function updateGastos(finances, gastos) {
  if (gastos) {
    finances.gastos = gastos;
    await finances.save();
  }
}

async function update(request, response) {
  const { id } = request.params;
  const { descricao, recebidos, gastos } = request.body;

  const finances = await Finances.findOne({ _id: id });

  if (!finances) {
    return response.status(404).json({ error: "Registro não encontrado" });
  }

  await updateDescription(finances, descricao);
  await updateRecebidos(finances, recebidos);
  await updateGastos(finances, gastos);

  return response.json(finances);
}

module.exports = {
  update,
};
