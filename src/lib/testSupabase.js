import { supabase } from './supabase';

export async function testSupabaseConnection() {
  const { data, error } = await supabase
    .from('mon_orgs')
    .select('*')
    .limit(1);

  if (error) {
    console.error('❌ Supabase :', error);
    return { success: false, error };
  }

  console.log('✅ Supabase connecté :', data);
  return { success: true, data };
}
testSupabaseConnection();