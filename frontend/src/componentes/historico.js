import React, { useState, useEffect } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import api from "../services/api";
import "../style.css";
import { setAllFinances } from "../App";

function Historico({ data }) {
  const [changedDescricao, setChangedDescricao] = useState("");
  const [changedReceita, setChangedReceita] = useState("");
  const [changedGasto, setChangedGasto] = useState("");

  async function handleTitle(e, descricao, recebidos, gastos) {
    if (changedDescricao && changedDescricao != descricao) {
      await api.put(`contents/${data._id}`, {
        descricao: changedDescricao,
      });
    }
    if (changedReceita && changedReceita != recebidos) {
      await api.put(`contents/${data._id}`, {
        recebidos: changedReceita,
      });
    }

    if (changedGasto && changedGasto != gastos) {
      await api.put(`contents/${data._id}`, {
        gastos: changedGasto,
      });
    }
    const handleClick = () => {
      window.location.reload();
    };
    handleClick();
  }
  async function deleteRegistro() {
    const handleClick = () => {
      window.location.reload();
    };
    await api.delete(`finances/${data._id}`);
    handleClick();
  }

  return (
    <>
      <div className="historicoSingle">
        <input
          type="text"
          placeholder={data.descricao}
          onChange={(e) => setChangedDescricao(e.target.value)}
        ></input>
        <input
          type="number"
          placeholder={data.recebidos}
          onChange={(e) => setChangedReceita(e.target.value)}
        ></input>
        <input
          type="number"
          placeholder={data.gastos}
          onChange={(e) => setChangedGasto(e.target.value)}
        ></input>
        <button
          className="edit"
          onClick={(e) =>
            handleTitle(
              changedDescricao,
              changedReceita,
              changedGasto,
              data.descricao,
              data.recebidos,
              data.gastos
            )
          }
        >
          <FaPencilAlt size={13} />
        </button>
        <button className="delete" onClick={deleteRegistro}>
          <FaTrash size={13} />
        </button>
      </div>
    </>
  );
}

export default Historico;
