import { createClient } from '@supabase/supabase-js'

// Estas variáveis devem ser configuradas no arquivo .env
const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env?.VITE_SUPABASE_ANON_KEY || ''

console.log('🔧 Supabase Config:', {
    url: supabaseUrl ? '✓ Configurado' : '❌ Faltando',
    key: supabaseAnonKey ? '✓ Configurado' : '❌ Faltando'
})

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Função helper para buscar o conteúdo do site
export async function getSiteContent() {
    console.log('📥 Buscando conteúdo do Supabase...')

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
}

// Função helper para atualizar o conteúdo do site
export async function updateSiteContent(content: any) {
    console.log('📤 Salvando no Supabase:', content)

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
}
