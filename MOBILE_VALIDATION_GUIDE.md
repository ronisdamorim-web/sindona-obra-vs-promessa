# 📱 Guia Rápido - Validação Mobile

## ✅ Checklist de Validação

### 1️⃣ Abrir DevTools
```
F12 → Ctrl+Shift+M (Toggle Device Toolbar)
```

### 2️⃣ Selecionar Dispositivos
Testar em:
- ✅ iPhone SE (375px)
- ✅ iPhone 12 Pro (390px)
- ✅ Pixel 5 (393px)

### 3️⃣ Verificar Cada Seção

#### 🏠 **HERO (Seção 1)**
- [ ] Título "Sindona Paraíso" legível
- [ ] Subtítulo visível
- [ ] Sem espaços vazios grandes
- [ ] Padding adequado nas laterais

#### 🖼️ **COMPARAÇÕES (Seções 2-N)**
- [ ] Layout VERTICAL (não slider)
- [ ] Título no topo
- [ ] Análise logo abaixo do título
- [ ] Imagem "Promessa" primeiro
- [ ] Label "Promessa" acima da imagem
- [ ] Fonte da promessa abaixo da imagem
- [ ] Imagem "Realidade" depois
- [ ] Label "Realidade" acima da imagem
- [ ] Fonte da realidade abaixo da imagem
- [ ] **SEM textos duplicados**
- [ ] **SEM textos por trás de outros**

#### 📊 **STATUS DA OBRA**
- [ ] Título "Status Atual" legível
- [ ] Cards Vitra e Caixa em coluna única
- [ ] Percentuais grandes e visíveis
- [ ] Barras de progresso visíveis
- [ ] Labels das etapas legíveis
- [ ] Sem overflow horizontal

#### 📸 **GALERIAS E INFORMAÇÕES**
- [ ] Cards de informações em 1 coluna
- [ ] Ícones e textos legíveis
- [ ] Galerias Promessa e Obra em colunas separadas
- [ ] Carrossel funciona ao tocar
- [ ] Fontes das imagens visíveis
- [ ] Links clicáveis

#### 🔚 **FOOTER**
- [ ] Texto de encerramento visível
- [ ] Aviso legal legível
- [ ] Informações de contato visíveis
- [ ] Sem cortes de texto

### 4️⃣ Verificações Gerais

#### ❌ **NÃO DEVE TER:**
- [ ] Textos duplicados
- [ ] Ghost text (texto por trás)
- [ ] Espaços pretos grandes entre seções
- [ ] Scroll horizontal
- [ ] Textos cortados
- [ ] Imagens distorcidas
- [ ] Elementos sobrepostos

#### ✅ **DEVE TER:**
- [ ] Scroll suave
- [ ] Todas as seções visíveis
- [ ] Textos legíveis
- [ ] Imagens proporcionais
- [ ] Espaçamentos consistentes
- [ ] Touch targets adequados (44px mínimo)

---

## 🎯 Teste Rápido (2 minutos)

1. **Abrir:** http://localhost:5173
2. **Redimensionar:** 375px width (iPhone SE)
3. **Scroll:** Do topo ao fim
4. **Verificar:** 
   - ✅ Sem textos duplicados?
   - ✅ Sem espaços vazios?
   - ✅ Comparações em vertical?
   - ✅ Tudo legível?

Se todas as respostas forem **SIM** → ✅ **MOBILE OK!**

---

## 🐛 Problemas Comuns

### Problema: Textos duplicados
**Causa:** Cache do navegador
**Solução:** Ctrl+Shift+R (hard refresh)

### Problema: Layout quebrado
**Causa:** CSS não carregou
**Solução:** Verificar console (F12), recarregar página

### Problema: Imagens não aparecem
**Causa:** Caminho incorreto
**Solução:** Verificar console, verificar pasta public/

---

## 📱 Teste em Dispositivo Real

```bash
# 1. Iniciar servidor com acesso de rede
npm run dev -- --host

# 2. Anotar o IP local (ex: 192.168.1.100)

# 3. No celular, acessar:
http://192.168.1.100:5173

# 4. Testar scroll e interações
```

---

## ✨ Resultado Esperado

**Mobile deve estar:**
- 🎨 **Bonito** - Design premium preservado
- 📖 **Legível** - Textos claros e bem espaçados
- 🚀 **Rápido** - Sem travamentos
- 🎯 **Funcional** - Tudo funciona
- 🧹 **Limpo** - Sem bugs visuais

---

**Status:** ✅ Pronto para validação
**Última atualização:** 2026-01-12
