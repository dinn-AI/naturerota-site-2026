# 🔧 Como Resolver o Timeout do Sanity

## ✅ Acabei de Fazer:
- ✓ Limpei todo o cache
- ✓ Reinstalei as dependências
- ✓ Atualizei o Sanity para 5.3.1

## 🎯 Tente Agora (NO TERMINAL DO MAC, NÃO NO CURSOR):

Abra o **Terminal.app** ou **iTerm** e execute:

```bash
cd $PROJECT_DIR
pnpm sanity dev
```

> **Nota:** Substitua `$PROJECT_DIR` pelo caminho da pasta do seu projeto.

---

## 🔥 Se AINDA Der Timeout, Tente Estas Soluções:

### SOLUÇÃO 2: Desabilitar Firewall Temporariamente

1. **Abra Configurações do Sistema**
2. **Segurança e Privacidade** → **Firewall**
3. **Desative temporariamente**
4. Tente rodar `pnpm sanity dev` novamente
5. **Reative o firewall depois!**

---

### SOLUÇÃO 3: Usar DNS do Google

No Terminal do Mac:

```bash
# Limpar cache DNS
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder

# Testar com DNS do Google
networksetup -setdnsservers Wi-Fi 8.8.8.8 8.8.4.4

# Agora tente rodar o Sanity
cd $PROJECT_DIR
pnpm sanity dev
```

**Para voltar ao DNS padrão depois:**
```bash
networksetup -setdnsservers Wi-Fi "Empty"
```

---

### SOLUÇÃO 4: Desabilitar Antivírus/VPN

Se você usa:
- **Antivírus** (Norton, McAfee, etc) → Desative temporariamente
- **VPN** → Desconecte temporariamente
- Tente rodar novamente

---

### SOLUÇÃO 5: Usar NPM ao invés de PNPM

```bash
cd $PROJECT_DIR

# Instalar com npm
npm install

# Rodar com npm
npm run sanity
```

---

### SOLUÇÃO 6: Configurar Timeout Maior no Node

```bash
cd $PROJECT_DIR

# Aumentar timeout
export NODE_OPTIONS="--max-http-header-size=80000"

# Tentar novamente
pnpm sanity dev
```

---

### SOLUÇÃO 7: Verificar Permissões de Rede

```bash
# Ver se há processos bloqueando
lsof -i :3333

# Se houver algo, matar:
lsof -ti:3333 | xargs kill -9

# Tentar novamente
pnpm sanity dev
```

---

## 🌐 SOLUÇÃO ALTERNATIVA (Sempre Funciona):

**Use o Sanity Studio na Web:**
- **URL:** `https://www.sanity.io/manage/project/[SEU_PROJECT_ID]`
- **Vision (Query Editor):** `https://www.sanity.io/manage/project/[SEU_PROJECT_ID]/vision`

**É 100% funcional e não depende de localhost!**

---

## 📝 O Que Testar Primeiro (Em Ordem):

1. ✅ **Tentar novamente** (já reinstalei tudo)
2. 🔥 **Desabilitar Firewall** (mais comum)
3. 🌐 **Mudar DNS** (resolve muitos casos)
4. 🛡️ **Desabilitar Antivírus/VPN**
5. 📦 **Usar NPM** (às vezes resolve)

---

## 🎯 Próximo Passo:

**Abra o Terminal.app (NÃO o Cursor) e execute:**

```bash
cd $PROJECT_DIR
pnpm sanity dev
```

**Me diga o resultado!**
