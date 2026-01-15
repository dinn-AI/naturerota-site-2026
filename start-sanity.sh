#!/bin/bash

# Script para iniciar o Sanity Studio localmente
# Naturerota Blog

echo "🚀 Iniciando Sanity Studio..."
echo ""

# Navegar para o diretório do projeto
cd "$(dirname "$0")"

# Verificar se as variáveis de ambiente estão configuradas
if [ ! -f .env ]; then
    echo "❌ Arquivo .env não encontrado!"
    exit 1
fi

# Limpar cache do Sanity
echo "🧹 Limpando cache do Sanity..."
rm -rf .sanity node_modules/.sanity 2>/dev/null

echo ""
echo "✅ Cache limpo!"
echo ""

# Verificar se node_modules existe
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências..."
    pnpm install
fi

echo ""
echo "🎨 Iniciando Sanity Studio..."
echo "📍 O Studio será aberto em: http://localhost:3333"
echo ""
echo "⏳ Aguarde a compilação (pode levar alguns minutos)..."
echo ""

# Iniciar o Sanity Studio
pnpm sanity dev

# Se chegar aqui, o processo foi interrompido
echo ""
echo "❌ Sanity Studio foi encerrado"
