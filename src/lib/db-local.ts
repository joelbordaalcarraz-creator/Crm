/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Campana, ClienteCorporativo, ClienteIndividual, Festividad, Negocio, NegocioId,
  SeguimientoCumple, Usuario, UsuarioNuevo, UsuarioPatch,
} from "./types";

export interface ConfigSaludoRow { negocioId: NegocioId; mensaje: string; hora: string; }
export interface AprobacionMesRow { negocioId: NegocioId; anio: number; mes: number; aprobado: boolean; }
export interface DatosApp {
  negocios: Negocio[];
  usuarios: Usuario[];
  clientesIndividuales: ClienteIndividual[];
  clientesCorporativos: ClienteCorporativo[];
  campanas: Campana[];
  festividades: Festividad[];
  seguimientos: SeguimientoCumple[];
  configsSaludo: ConfigSaludoRow[];
  aprobaciones: AprobacionMesRow[];
}

const VACIO: DatosApp = {
  negocios: [], usuarios: [], clientesIndividuales: [], clientesCorporativos: [],
  campanas: [], festividades: [], seguimientos: [], configsSaludo: [], aprobaciones: [],
};

export async function cargarTodo(): Promise<DatosApp> {
  if (typeof window === "undefined") return VACIO;
  try {
    const guardado = window.localStorage.getItem("crm-datos-locales");
    return guardado ? JSON.parse(guardado) as DatosApp : VACIO;
  } catch {
    return VACIO;
  }
}

export async function dbCrearUsuario(u: UsuarioNuevo): Promise<Usuario> {
  return { ...u, id: `local-${Date.now()}` };
}
export async function dbActualizarUsuario(_id: string, _patch: UsuarioPatch): Promise<void> {}
export async function dbEliminarUsuario(_id: string): Promise<void> {}

export async function dbCrearClienteIndividual(c: ClienteIndividual) { return c; }
export async function dbActualizarClienteIndividual(_id: string, _patch: Partial<ClienteIndividual>) {}
export async function dbEliminarClienteIndividual(_id: string) {}
export async function dbCrearClienteCorporativo(c: ClienteCorporativo) { return c; }
export async function dbActualizarClienteCorporativo(_id: string, _patch: Partial<ClienteCorporativo>) {}
export async function dbEliminarClienteCorporativo(_id: string) {}
export async function dbCrearCampana(c: Campana) { return c; }
export async function dbActualizarCampana(_id: string, _patch: Partial<Campana>) {}
export async function dbEliminarCampana(_id: string) {}
export async function dbCrearFestividad(f: Festividad) { return f; }
export async function dbActualizarFestividad(_id: string, _patch: Partial<Festividad>) {}
export async function dbEliminarFestividad(_id: string) {}
export async function dbCrearSeguimiento(s: SeguimientoCumple) { return s; }
export async function dbActualizarSeguimiento(_id: string, _patch: Partial<SeguimientoCumple>) {}
export async function dbGuardarConfigSaludo(_negocioId: NegocioId, _mensaje: string, _hora: string) {}
export async function dbAprobarMes(_negocioId: NegocioId, _anio: number, _mes: number) {}

export type CambioRealtime = {
  tabla: "usuarios" | "clientes_individuales" | "clientes_corporativos" | "campanas" | "festividades" | "seguimiento_cumpleanos" | "config_saludo_cumpleanos" | "aprobacion_cumpleanos_mes";
  tipo: "INSERT" | "UPDATE" | "DELETE";
  nueva: Record<string, unknown> | null;
  vieja: Record<string, unknown> | null;
};
export function suscribirCambios(_onCambio: (c: CambioRealtime) => void): () => void { return () => {}; }
export function mapUsuario(r: Record<string, unknown>): Usuario { return r as unknown as Usuario; }
export function mapClienteIndividual(r: Record<string, unknown>): ClienteIndividual { return r as unknown as ClienteIndividual; }
export function mapClienteCorporativo(r: Record<string, unknown>): ClienteCorporativo { return r as unknown as ClienteCorporativo; }
export function mapCampana(r: Record<string, unknown>): Campana { return r as unknown as Campana; }
export function mapFestividad(r: Record<string, unknown>): Festividad { return r as unknown as Festividad; }
export function mapSeguimiento(r: Record<string, unknown>): SeguimientoCumple { return r as unknown as SeguimientoCumple; }
