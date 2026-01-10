import { createClient, SupabaseClient } from '@supabase/supabase-js'

// Estas variáveis devem ser configuradas no arquivo .env
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || ''

// Verificar se as credenciais estão disponíveis
const hasSupabaseCredentials = Boolean(supabaseUrl && supabaseAnonKey)

console.log('🔧 Supabase Config:', {
    url: supabaseUrl ? '✓ Configurado' : '❌ Faltando',
    key: supabaseAnonKey ? '✓ Configurado' : '❌ Faltando',
    enabled: hasSupabaseCredentials ? '✅ ATIVO' : '⚠️ DESATIVADO (usando fallback)'
})

// Criar cliente Supabase APENAS se as credenciais existirem
// Caso contrário, criar um cliente mock que sempre retorna null
export const supabase: SupabaseClient = hasSupabaseCredentials
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any // Mock client - funções vão retornar null

// Função helper para buscar o conteúdo do site
export async function getSiteContent() {
    // Se Supabase não estiver configurado, retornar null imediatamente
    if (!hasSupabaseCredentials) {
        console.warn('⚠️ Supabase não configurado - usando fallback local')
        return null
    }

    console.log('📥 Buscando conteúdo do Supabase...')

    try {
        const { data, error } = await supabase
            .from('site_content')
            .select('content')
            .eq('id', '00000000-0000-0000-0000-000000000001')
            .single()

        if (error) {
            console.error('❌ Erro ao buscar conteúdo:', error)
            return null
        }

        console.log('✅ Conteúdo recebido do Supabase:', data?.content)
        return data?.content || null
    } catch (error) {
        console.error('❌ Exceção ao buscar do Supabase:', error)
        return null
    }
}

// Função helper para atualizar o conteúdo do site
export async function updateSiteContent(content: any) {
    // Se Supabase não estiver configurado, lançar erro amigável
    if (!hasSupabaseCredentials) {
        const errorMsg = 'Supabase não configurado. Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para salvar alterações.'
        console.error('❌', errorMsg)
        throw new Error(errorMsg)
    }

    console.log('📤 Salvando no Supabase:', content)

    try {
        const { data, error } = await supabase
            .from('site_content')
            .update({
                content: content,
                updated_at: new Date().toISOString()
            })
            .eq('id', '00000000-0000-0000-0000-000000000001')
            .select()

        if (error) {
            console.error('❌ Erro ao salvar no Supabase:', error)
            throw new Error(`Falha ao salvar: ${error.message}`)
        }

        console.log('✅ Salvo com sucesso no Supabase:', data)
        return true
    } catch (error) {
        console.error('❌ Exceção ao salvar no Supabase:', error)
        throw error
    }
}
