import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  listarUsuarios,
  excluirUsuario,
} from "@/api/usuarios";

import type { Usuario } from "@/types/usuario";

interface Props {
  reload: number;
  onEditar: (usuario: Usuario) => void;
}

export default function ListaUsuarios({
  reload,
  onEditar,
}: Props) {

  const [usuarios, setUsuarios] =
    useState<Usuario[]>([]);

  const [pesquisa, setPesquisa] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  async function carregar() {

    try {

      setLoading(true);

      const dados =
        await listarUsuarios();

      setUsuarios(dados ?? []);

    } catch (error: any) {

      console.error(
        "Erro ao carregar usuários:",
        error
      );

      console.error(
        "Resposta:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ??
        "Erro ao carregar usuários."
      );

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    carregar();
  }, [reload]);

  const usuariosFiltrados =
    useMemo(() => {

      const texto =
        pesquisa
          .toLowerCase()
          .trim();

      if (!texto) {
        return usuarios;
      }

      return usuarios.filter(
        (usuario) =>
          usuario.nome
            ?.toLowerCase()
            .includes(texto) ||
          usuario.email
            ?.toLowerCase()
            .includes(texto) ||
          usuario.perfil
            ?.toLowerCase()
            .includes(texto)
      );

    }, [usuarios, pesquisa]);

  async function excluir(id: number) {

    const confirmar =
      window.confirm(
        "Deseja realmente excluir este usuário?"
      );

    if (!confirmar) {
      return;
    }

    try {

      await excluirUsuario(id);

      await carregar();

      alert(
        "Usuário excluído com sucesso."
      );

    } catch (error: any) {

      console.error(
        "Erro ao excluir usuário:",
        error
      );

      console.error(
        "Resposta:",
        error.response?.data
      );

      alert(
        error.response?.data?.message ??
        "Não foi possível excluir o usuário."
      );

    }
  }

  if (loading) {

    return (
      <div className="rounded-lg bg-white p-8 text-center shadow">
        Carregando usuários...
      </div>
    );

  }

  return (
    <div className="space-y-4">

      <div className="rounded-lg bg-white p-4 shadow">

        <input
          type="text"
          placeholder="Pesquisar por nome, e-mail ou perfil..."
          value={pesquisa}
          onChange={(e) =>
            setPesquisa(e.target.value)
          }
          className="w-full rounded border p-2"
        />

      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead className="bg-slate-100">

              <tr>

                <th className="px-4 py-3 text-left">
                  Nome
                </th>

                <th className="px-4 py-3 text-left">
                  E-mail
                </th>

                <th className="px-4 py-3 text-left">
                  Perfil
                </th>

                <th className="px-4 py-3 text-left">
                  Status
                </th>

                <th className="px-4 py-3 text-right">
                  Ações
                </th>

              </tr>

            </thead>

            <tbody>

              {usuariosFiltrados.length === 0 ? (

                <tr>

                  <td
                    colSpan={5}
                    className="px-4 py-8 text-center text-slate-500"
                  >
                    Nenhum usuário encontrado.
                  </td>

                </tr>

              ) : (

                usuariosFiltrados.map(
                  (usuario) => (

                    <tr
                      key={usuario.id}
                      className="border-t"
                    >

                      <td className="px-4 py-3">
                        {usuario.nome}
                      </td>

                      <td className="px-4 py-3">
                        {usuario.email}
                      </td>

                      <td className="px-4 py-3">
                        {usuario.perfil}
                      </td>

                      <td className="px-4 py-3">

                        <span
                          className={
                            usuario.ativo === false
                              ? "rounded bg-red-100 px-2 py-1 text-sm text-red-700"
                              : "rounded bg-green-100 px-2 py-1 text-sm text-green-700"
                          }
                        >
                          {usuario.ativo === false
                            ? "Inativo"
                            : "Ativo"}
                        </span>

                      </td>

                      <td className="px-4 py-3">

                        <div className="flex justify-end gap-2">

                          <button
                            type="button"
                            onClick={() =>
                              onEditar(usuario)
                            }
                            className="rounded bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
                          >
                            Editar
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              excluir(usuario.id)
                            }
                            className="rounded bg-red-600 px-3 py-1 text-sm text-white hover:bg-red-700"
                          >
                            Excluir
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
