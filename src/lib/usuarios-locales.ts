import { Usuario } from "./types";

export type UsuarioLocal = Usuario & { contrasena: string };

export const USUARIOS_LOCALES: UsuarioLocal[] = [
  { id: "socios", nombre: "Directorio", cargo: "Dirección", rolTipo: "direccion", rolLabel: "Dirección", iniciales: "D", usuario: "directorio", contrasena: "directorio2026", negocioId: "las-flores" },
  { id: "gerencia", nombre: "Gerente General", cargo: "Gerente General", rolTipo: "gerencial", rolLabel: "Gerencial", iniciales: "GG", usuario: "gerentegeneral", contrasena: "gerentegeneral2026", negocioId: "las-flores" },
  { id: "ventas-uno", nombre: "Ventas Uno", cargo: "Ventas", rolTipo: "ventas", rolLabel: "Ventas", iniciales: "VU", usuario: "ventasuno", contrasena: "ventasuno2026", negocioId: "las-flores", creadoPor: "gerencia" },
  { id: "ventas-dos", nombre: "Ventas Dos", cargo: "Ventas", rolTipo: "ventas", rolLabel: "Ventas", iniciales: "VD", usuario: "ventasdos", contrasena: "ventasdos2026", negocioId: "las-flores", creadoPor: "gerencia" },
  { id: "ventas-tres", nombre: "Ventas Tres", cargo: "Ventas", rolTipo: "ventas", rolLabel: "Ventas", iniciales: "VT", usuario: "ventastres", contrasena: "ventastres2026", negocioId: "umaru", creadoPor: "gerencia" },
];

export function leerUsuariosLocales(): UsuarioLocal[] {
  if (typeof window === "undefined") return [...USUARIOS_LOCALES];
  try {
    const guardados = window.localStorage.getItem("crm-usuarios-locales");
    return guardados ? JSON.parse(guardados) as UsuarioLocal[] : [...USUARIOS_LOCALES];
  } catch {
    return [...USUARIOS_LOCALES];
  }
}

export function guardarUsuariosLocales(usuarios: UsuarioLocal[]) {
  window.localStorage.setItem("crm-usuarios-locales", JSON.stringify(usuarios));
}