const app = require("./index");
const routes = require("./routes");
const request = require("supertest");

let id;

beforeAll(async () => {
  const response = await request(app)
    .post("/finances")
    .send({ descricao: "Teste Inicial", recebidos: 100, gastos: 50 });
  id = response.body._id;
});

test("Get finances", async () => {
  const response = await request(app).get("/finances");
  expect(response).toBeTruthy();
  expect(response.status).toEqual(200);
});
test("Post finances", async () => {
  const response = await request(app)
    .post("/finances")
    .send({ descricao: "Teste Insert", recebidos: 150, gastos: 20 });
  expect(response.status).toEqual(200);
});
test("Not Post finances", async () => {
  const response = await request(app)
    .post("/finances")
    .send({ recebidos: 150, gastos: 20 });
  expect(response.status).toEqual(400);
  expect(JSON.parse(response.text).error).toEqual(
    "necessário entrar com os dados"
  );

  const response2 = await request(app)
    .post("/finances")
    .send({ descricao: "Teste Insert" });
  expect(response2.status).toEqual(400);
  expect(JSON.parse(response2.text).error).toEqual(
    "necessário entrar com os dados"
  );
});

test("Put contents", async () => {
  const response = await request(app)
    .put(`/contents/${id}`)
    .send({ descricao: "Teste Atualizado", recebidos: 150, gastos: 20 });
  expect(response.status).toEqual(200);
  expect(response.body.descricao).toEqual("Teste Atualizado");
});
test("Not Put contents", async () => {
  const response = await request(app)
    .put(`/contents/668ac19d8bb51c135cb9024c`)
    .send({ descricao: "Teste Atualizado", recebidos: 150, gastos: 20 });
  expect(response.status).toEqual(404);
  expect(JSON.parse(response.text).error).toEqual("Registro não encontrado");
});

test("Delete finances", async () => {
  const response = await request(app).delete(`/finances/${id}`);
  expect(response.status).toEqual(200);
});
test("Not Delete finances", async () => {
  const response = await request(app).delete(
    `/finances/668ac19d8bb51c135cb9024c`
  );
  expect(response.status).toEqual(404);
  expect(JSON.parse(response.text).error).toEqual(
    "Nao foi encontrado o registro especifico"
  );
});
