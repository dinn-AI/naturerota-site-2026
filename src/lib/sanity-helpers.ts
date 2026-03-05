import { sanityClient } from './sanity';

/**
 * Fetch com timeout para o Sanity
 * @param query - Query GROQ do Sanity
 * @param params - Parâmetros da query
 * @param timeoutMs - Timeout em ms (padrão: 25000ms = 25s)
 * @returns Promise com resultado da query
 */
export async function fetchWithTimeout<T>(
  query: string,
  params: Record<string, any> = {},
  timeoutMs: number = 25000
): Promise<T> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const result = await sanityClient.fetch<T>(query, params, {
      signal: controller.signal,
    });
    clearTimeout(timeoutId);
    return result;
  } catch (error) {
    clearTimeout(timeoutId);
    throw error;
  }
}

/**
 * Fetch seguro com fallback
 * @param query - Query GROQ do Sanity
 * @param fallback - Valor padrão se falhar
 * @param params - Parâmetros da query
 * @param timeoutMs - Timeout em ms (padrão: 25000ms = 25s)
 * @returns Promise com resultado ou fallback
 */
export async function fetchSafe<T>(
  query: string,
  fallback: T,
  params: Record<string, any> = {},
  timeoutMs: number = 25000
): Promise<T> {
  try {
    return await fetchWithTimeout<T>(query, params, timeoutMs);
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Erro desconhecido';
    console.warn(`[Sanity] Erro ao buscar dados: ${errorMsg}`);
    return fallback;
  }
}
