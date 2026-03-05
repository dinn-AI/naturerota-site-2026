#!/bin/bash

# Script para limpar caches do projeto e resolver problemas de timeout

set -e

echo "🧹 Limpando caches do projeto..."

# Matar processos antigos
echo "🛑 Parando processos antigos..."
killall -9 pnpm node astro 2>/dev/null || true
sleep 2

# Limpar caches
echo "🗑️  Removendo caches..."
rm -rf node_modules pnpm-lock.yaml .astro dist .pnpm-store .vite 2>/dev/null || true
find . -name ".DS_Store" -delete 2>/dev/null || true

# Reinstalar dependências com timeouts maiores
echo "📦 Reinstalando dependências..."
pnpm install --no-frozen-lockfile --fetch-timeout 120000

# Limpar arquivos de log antigos
echo "📝 Limpando logs antigos..."
rm -f dev*.log 2>/dev/null || true

echo "✅ Limpeza concluída com sucesso!"
echo ""
echo "🚀 Iniciando dev server..."
echo "Acesse: http://localhost:4321/"
echo "Se a porta 4321 estiver em uso, tente 4322, 4323, etc..."
echo ""

# Iniciar dev server
pnpm run dev

echo "✅ Limpeza concluída com sucesso!"
echo ""
echo "💡 Dica: Para iniciar o servidor de desenvolvimento, execute:"
echo "   pnpm run dev"
