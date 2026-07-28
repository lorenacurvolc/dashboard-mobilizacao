import { createClient } from '@supabase/supabase-js';

// Project URL do seu projeto Supabase (sem o "/rest/v1/" no final)
const supabaseUrl = 'https://abcecaicpnhnosaondvc.supabase.co';

// Chave "publishable" (segura para uso no navegador/cliente)
const supabaseAnonKey = 'sb_publishable_vhr67xxbtHNWhEhKaEO9nA_YdL7MJrk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
