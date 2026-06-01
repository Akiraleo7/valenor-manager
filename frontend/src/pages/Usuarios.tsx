import { useState } from "react";

const usuariosIniciais = [
  {
    nome: "Leonardo Akira",
    email: "leonardo@valenor.com",
    perfil: "Administrador",
    status: "Ativo",
  },
  {
    nome: "Bruno Otávio",
    email: "bruno@valenor.com",
    perfil: "Operador",
    status: "Ativo",
  },
];

export const Usuarios = () => {
  const [usuarios, setUsuarios] =
    useState(usuariosIniciais);

  const [modalOpen, setModalOpen] =
    useState(false);

  const [nome, setNome] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [senha, setSenha] =
    useState("");

  const [perfil, setPerfil] =
    useState("Operador");

  const [status, setStatus] =
    useState("Ativo");

  const [pesquisa, setPesquisa] =
    useState("");

  const salvarUsuario = () => {
    if (
      !nome ||
      !email ||
      !senha
    ) {
      alert(
        "Preencha todos os campos."
      );

      return;
    }

    const emailExiste =
      usuarios.some(
        (usuario) =>
          usuario.email.toLowerCase() ===
          email.toLowerCase()
      );

    if (emailExiste) {
      alert(
        "Já existe um usuário com este e-mail."
      );

      return;
    }

    const novoUsuario = {
      nome,
      email,
      perfil,
      status,
    };

    setUsuarios([
      ...usuarios,
      novoUsuario,
    ]);

    setNome("");
    setEmail("");
    setSenha("");
    setPerfil("Operador");
    setStatus("Ativo");

    setModalOpen(false);
  };

  const usuariosFiltrados =
    usuarios.filter(
      (usuario) =>
        usuario.nome
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          ) ||
        usuario.email
          .toLowerCase()
          .includes(
            pesquisa.toLowerCase()
          )
    );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "24px",
          gap: "16px",
          flexWrap: "wrap",
        }}
      >
        <div>
          <h1
            style={{
              color: "#111827",
              marginBottom: "6px",
            }}
          >
            Usuários
          </h1>

          <span
            style={{
              color: "#6b7280",
              fontSize: "14px",
            }}
          >
            Gerencie os usuários do sistema
          </span>
        </div>

        <button
          onClick={() =>
            setModalOpen(true)
          }
          onMouseEnter={(e) => {
            e.currentTarget.style.transform =
              "translateY(-2px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform =
              "translateY(0px)";
          }}
          style={{
            backgroundColor: "#4f46e5",
            color: "#ffffff",
            border: "none",
            padding: "12px 18px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "all 0.2s ease",
          }}
        >
          + Novo Usuário
        </button>
      </div>

      <div
        style={{
          marginBottom: "20px",
        }}
      >
        <input
          type="text"
          placeholder="Pesquisar usuário..."
          value={pesquisa}
          onChange={(e) =>
            setPesquisa(
              e.target.value
            )
          }
          onFocus={(e) => {
            e.currentTarget.style.borderColor =
              "#6366f1";

            e.currentTarget.style.boxShadow =
              "0 0 0 3px rgba(99,102,241,0.15)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor =
              "#d1d5db";

            e.currentTarget.style.boxShadow =
              "none";
          }}
          style={{
            width: "100%",
            maxWidth: "320px",
            padding: "12px 16px",
            borderRadius: "12px",
            border:
              "1px solid #d1d5db",
            outline: "none",
            fontSize: "14px",
            transition:
              "all 0.2s ease",
          }}
        />
      </div>

      <div
        style={{
          backgroundColor:
            "#ffffff",
          borderRadius: "16px",
          padding: "24px",
          boxShadow:
            "0 2px 8px rgba(0,0,0,0.05)",
          overflowX: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse:
              "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom:
                  "1px solid #e5e7eb",
              }}
            >
              <th style={thStyle}>
                Nome
              </th>

              <th style={thStyle}>
                E-mail
              </th>

              <th style={thStyle}>
                Perfil
              </th>

              <th style={thStyle}>
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {usuariosFiltrados.map(
              (
                usuario,
                index
              ) => (
                <tr
                  key={index}
                  style={{
                    borderBottom:
                      "1px solid #f3f4f6",
                    transition:
                      "all 0.2s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "#f8fafc";

                    e.currentTarget.style.transform =
                      "scale(1.005)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      "transparent";

                    e.currentTarget.style.transform =
                      "scale(1)";
                  }}
                >
                  <td style={tdStyle}>
                    {usuario.nome}
                  </td>

                  <td style={tdStyle}>
                    {usuario.email}
                  </td>

                  <td style={tdStyle}>
                    {usuario.perfil}
                  </td>

                  <td style={tdStyle}>
                    <span
                      style={{
                        backgroundColor:
                          usuario.status ===
                            "Ativo"
                            ? "#22c55e"
                            : "#ef4444",

                        color:
                          "#ffffff",

                        padding:
                          "6px 12px",

                        borderRadius:
                          "999px",

                        fontSize:
                          "13px",

                        fontWeight:
                          "bold",
                      }}
                    >
                      {
                        usuario.status
                      }
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div
          style={{
            backgroundColor: "#ffffff",
            borderRadius: "20px",
            padding: "32px",
            width: "100%",
            maxWidth: "500px",

            border: "1px solid #e5e7eb",

            boxShadow:
              "0 25px 60px rgba(0,0,0,0.15)",
          }}
        >
          <div
            style={{
              backgroundColor:
                "#ffffff",
              borderRadius: "20px",
              padding: "32px",
              width: "100%",
              maxWidth: "500px",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                marginBottom:
                  "24px",
                color: "#111827",
              }}
            >
              Novo Usuário
            </h2>

            <div
              style={{
                display: "flex",
                flexDirection:
                  "column",
                gap: "16px",
              }}
            >
              <input
                placeholder="Nome"
                value={nome}
                onChange={(e) =>
                  setNome(
                    e.target.value
                  )
                }
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    "#6366f1";

                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99,102,241,0.15)";
                }}

                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "#d1d5db";

                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              />

              <input
                placeholder="E-mail"
                value={email}
                onChange={(e) =>
                  setEmail(
                    e.target.value
                  )
                }
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    "#6366f1";

                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99,102,241,0.15)";
                }}

                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "#d1d5db";

                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              />

              <input
                type="password"
                placeholder="Senha Temporária"
                value={senha}
                onChange={(e) =>
                  setSenha(
                    e.target.value
                  )
                }
                style={inputStyle}
                onFocus={(e) => {
                  e.currentTarget.style.borderColor =
                    "#6366f1";

                  e.currentTarget.style.boxShadow =
                    "0 0 0 3px rgba(99,102,241,0.15)";
                }}

                onBlur={(e) => {
                  e.currentTarget.style.borderColor =
                    "#d1d5db";

                  e.currentTarget.style.boxShadow =
                    "none";
                }}
              />

              <select
                value={perfil}
                onChange={(e) =>
                  setPerfil(
                    e.target.value
                  )
                }
                style={inputStyle}
              >
                <option>
                  Administrador
                </option>

                <option>
                  Operador
                </option>
              </select>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
                style={inputStyle}
              >
                <option>
                  Ativo
                </option>

                <option>
                  Inativo
                </option>
              </select>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "12px",
                marginTop: "28px",
              }}
            >
              <button
                onClick={() =>
                  setModalOpen(false)
                }
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                }}
                style={cancelButtonStyle}
              >
                Cancelar
              </button>

              <button
                onClick={salvarUsuario}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform =
                    "translateY(0px)";
                }}
                style={saveButtonStyle}
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const thStyle = {
  textAlign: "left" as const,
  padding: "14px",
  color: "#6b7280",
  fontSize: "14px",
};

const tdStyle = {
  padding: "16px 14px",
  color: "#111827",
};

const inputStyle = {
  padding: "14px 16px",
  borderRadius: "12px",
  border: "1px solid #d1d5db",
  outline: "none",
  fontSize: "14px",
  transition: "all 0.2s ease",
};

const cancelButtonStyle = {
  backgroundColor: "#e5e7eb",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.2s ease",
};

const saveButtonStyle = {
  backgroundColor: "#4f46e5",
  color: "#ffffff",
  border: "none",
  padding: "12px 18px",
  borderRadius: "12px",
  cursor: "pointer",
  fontWeight: "bold",
  transition: "all 0.2s ease",
};

export default Usuarios;