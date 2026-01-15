#!/bin/bash

# Deploy do Sanity Studio para a nuvem
# Naturerota

echo "🚀 Fazendo deploy do Sanity Studio para a nuvem..."
echo ""

cd "$(dirname "$0")"

# Verificar se está no diretório correto
if [ ! -f "sanity.config.ts" ]; then
    echo "❌ Arquivo sanity.config.ts não encontrado!"
    echo "Execute este script da pasta do projeto."
    exit 1
fi

echo "📦 Preparando deploy..."
echo ""

# Fazer deploy
echo "🌐 Fazendo deploy do Studio..."
echo ""

pnpm exec sanity deploy

echo ""
echo "✅ Deploy concluído!"
echo ""
echo "📍 Seu Studio estará disponível em:"
echo "   https://[hostname-escolhido].sanity.studio"
echo ""
