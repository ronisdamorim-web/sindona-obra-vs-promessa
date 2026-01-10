# 🚀 Migração para Supabase - Guia de Configuração

## 📋 Pré-requisitos

1. Conta no Supabase (https://supabase.com)
2. Projeto criado no Supabase

## 🔧 Passo 1: Configurar o Banco de Dados

1. Acesse o **SQL Editor** no painel do Supabase
2. Execute o arquivo `supabase-setup.sql` (na raiz do projeto)
3. Isso criará:
   - Tabela `site_content`
   - Políticas de segurança (RLS)
   - Registro inicial com os dados atuais

## 🔑 Passo 2: Configurar Variáveis de Ambiente

1. No painel do Supabase, vá em **Settings** → **API**
2. Copie:
   - **Project URL** (URL do projeto)
   - **anon public** key (chave pública)

3. Crie um arquivo `.env` na raiz do projeto:
```bash
VITE_SUPABASE_URL=https://seu-projeto.supabase.co
VITE_SUPABASE_ANON_KEY=sua-chave-anon-publica
```

4. **IMPORTANTE**: Adicione `.env` ao `.gitignore` para não commitar credenciais

## 🔐 Passo 3: Configurar Autenticação (Opcional - para Admin)

Se quiser proteger o painel admin com login:

1. No Supabase, vá em **Authentication** → **Providers**
2. Ative o provider desejado (Email, Google, etc.)
3. Crie um usuário admin em **Authentication** → **Users**

**Nota**: Por enquanto, o sistema permite UPDATE público. Para produção, recomenda-se:
- Implementar autenticação no painel `/admin`
- Atualizar a política RLS para exigir autenticação

## ✅ Passo 4: Testar

1. Reinicie o servidor de desenvolvimento:
```bash
npm run dev
```

2. Acesse o site público (`localhost:5173`)
   - Deve carregar dados do Supabase silenciosamente

3. Acesse `/admin`
   - Edite qualquer campo
   - Clique em "Salvar Alterações"
   - Deve salvar no Supabase e mostrar mensagem de sucesso

4. Recarregue a página pública
   - As alterações devem aparecer instantaneamente

## 🎯 Resultado

✅ **Antes**: Arquivo JSON local + download manual  
✅ **Agora**: Banco de dados Supabase + atualização em tempo real

## 🔒 Segurança em Produção

Para ambiente de produção, recomenda-se:

1. **Autenticação obrigatória no admin**:
```typescript
// Em AdminPanel.tsx
import { supabase } from '../../lib/supabase'

useEffect(() => {
  supabase.auth.getSession().then(({ data: { session } }) => {
    if (!session) {
      // Redirecionar para login
      window.location.href = '/login'
    }
  })
}, [])
```

2. **Atualizar política RLS**:
```sql
-- Substituir a política de UPDATE
DROP POLICY "Permitir atualização para autenticados" ON site_content;

CREATE POLICY "Permitir atualização apenas para admin"
ON site_content
FOR UPDATE
TO authenticated
USING (auth.uid() IN (
  SELECT id FROM auth.users WHERE email = 'seu-email-admin@example.com'
))
WITH CHECK (true);
```

## 📝 Notas

- O fallback para `state.json` ainda existe caso o Supabase falhe
- Nenhuma alteração visual foi feita no site público
- O sistema funciona de forma silenciosa para o usuário final
