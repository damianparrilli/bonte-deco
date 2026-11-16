// Conexión a Supabase (base de datos, usuarios y fotos de Bonté Deco).
// La clave publicable es pública por diseño: la seguridad la dan las
// políticas de la base (ver supabase/instalar.sql).
import { createClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_KEY } from './supabase-config';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { flowType: 'implicit', persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
});
