// Script de teste para verificar conexão Supabase
// Cole este código no console do navegador

import { supabase } from './src/lib/supabase'

// Teste 1: Verificar conexão
console.log('🧪 TESTE 1: Verificando conexão...')
const { data: testData, error: testError } = await supabase
    .from('site_content')
    .select('*')
    .limit(1)

if (testError) {
    console.error('❌ Erro de conexão:', testError)
} else {
    console.log('✅ Conexão OK. Dados:', testData)
}

// Teste 2: Tentar inserir se vazio
if (!testData || testData.length === 0) {
    console.log('🧪 TESTE 2: Tabela vazia, inserindo registro inicial...')
    const { error: insertError } = await supabase
        .from('site_content')
        .insert({
            id: '00000000-0000-0000-0000-000000000001',
            data: {
                statusObra: {
                    progressoConstrutora: 15,
                    dataAtualizacao: "17/12/2025",
                    progressoCaixa: 29.96,
                    textoExplicativo: "Os percentuais apresentados provêm de fontes distintas.",
                    etapas: {
                        preliminares: 100,
                        terraplanagem: 50,
                        fundacao: 60,
                        estrutura: 9,
                        alvenaria: 0,
                        hidraulica: 2.3,
                        eletrica: 3,
                        demais: 0
                    }
                }
            }
        })

    if (insertError) {
        console.error('❌ Erro ao inserir:', insertError)
    } else {
        console.log('✅ Registro inicial criado!')
    }
}
