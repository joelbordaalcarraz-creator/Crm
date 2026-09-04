"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Negocio, NegocioId, Usuario, UsuarioNuevo, UsuarioPatch } from "./types";
import { NEGOCIOS, NEGOCIO_TODAS, getNegocio } from "./mock/negocios";
import { negociosPermitidos } from "./permissions";
import { guardarUsuariosLocales, leerUsuariosLocales, UsuarioLocal } from "./usuarios-locales";

interface AppContextValue {
  usuario: Usuario | null;
  negocio: Negocio;
  negocios: Negocio[];
  negociosDisponibles: Negocio[];
  usuarios: Usuario[];
  listo: boolean;
  iniciarSesion: (usuario: string, contrasena: string) => Promise<boolean>;
  cerrarSesion: () => void;
  cambiarNegocio: (id: NegocioId) => void;
  crearUsuario: (u: UsuarioNuevo) => void;
  editarUsuario: (id: string, patch: UsuarioPatch) => void;
  eliminarUsuario: (id: string) => void;
}

const AppContext = createContext<AppContextValue | null>(null);
const STORAGE_USUARIO = "crm-usuario-id-activo";
const STORAGE_NEGOCIO = "crm-negocio-activo";

export function AppProvider({ children }: { children: ReactNode }) {
  const negocios: Negocio[] = NEGOCIOS;
  const [usuarios, setUsuarios] = useState<UsuarioLocal[]>([]);
  const [usuarioId, setUsuarioId] = useState<string | null>(null);
  const [negocioId, setNegocioId] = useState<NegocioId>("las-flores");
  const [listo, setListo] = useState(false);
  const usuario = usuarioId ? usuarios.find((u) => u.id === usuarioId) ?? null : null;

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    const negocioGuardado = window.localStorage.getItem(STORAGE_NEGOCIO) as NegocioId | null;
    const usuarioGuardado = window.localStorage.getItem(STORAGE_USUARIO);
    setUsuarios(leerUsuariosLocales());
    if (negocioGuardado) setNegocioId(negocioGuardado);
    if (usuarioGuardado) setUsuarioId(usuarioGuardado);
    setListo(true);
  }, []);
  /* eslint-enable react-hooks/set-state-in-effect */

  async function iniciarSesion(loginUsuario: string, contrasena: string): Promise<boolean> {
    const encontrado = usuarios.find((u) =>
      u.usuario.toLowerCase() === loginUsuario.trim().toLowerCase() && u.contrasena === contrasena
    );
    if (!encontrado) return false;
    setUsuarioId(encontrado.id);
    const alcance = negociosPermitidos(encontrado.rolTipo, encontrado.negocioId);
    const negocioInicial = alcance === "todos" ? encontrado.negocioId : alcance[0];
    setNegocioId(negocioInicial);
    window.localStorage.setItem(STORAGE_USUARIO, encontrado.id);
    window.localStorage.setItem(STORAGE_NEGOCIO, negocioInicial);
    return true;
  }

  const guardar = (siguientes: UsuarioLocal[]) => {
    setUsuarios(siguientes);
    guardarUsuariosLocales(siguientes);
  };

  const editarUsuario = (id: string, patch: UsuarioPatch) => {
    guardar(usuarios.map((u) => u.id === id ? { ...u, ...patch } : u));
  };

  const eliminarUsuario = (id: string) => {
    guardar(usuarios.filter((u) => u.id !== id));
  };

  const crearUsuario = (u: UsuarioNuevo) => {
    guardar([...usuarios, { ...u, id: `local-${Date.now()}` }]);
  };

  const cerrarSesion = () => {
    setUsuarioId(null);
    window.localStorage.removeItem(STORAGE_USUARIO);
  };

  const cambiarNegocio = (id: NegocioId) => {
    if (!usuario) return;
    const alcance = negociosPermitidos(usuario.rolTipo, usuario.negocioId);
    if (alcance !== "todos" && !alcance.includes(id)) return;
    setNegocioId(id);
    window.localStorage.setItem(STORAGE_NEGOCIO, id);
  };

  const negociosDisponibles = usuario
    ? (() => {
        const alcance = negociosPermitidos(usuario.rolTipo, usuario.negocioId);
        return alcance === "todos" ? [NEGOCIO_TODAS, ...negocios] : negocios.filter((n) => alcance.includes(n.id));
      })()
    : [NEGOCIO_TODAS, ...negocios];

  return (
    <AppContext.Provider value={{
      usuario,
      negocio: getNegocio(negocioId) ?? negocios[0],
      negocios,
      negociosDisponibles,
      usuarios,
      listo,
      iniciarSesion,
      cerrarSesion,
      cambiarNegocio,
      crearUsuario,
      editarUsuario,
      eliminarUsuario,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de <AppProvider>");
  return ctx;
}
