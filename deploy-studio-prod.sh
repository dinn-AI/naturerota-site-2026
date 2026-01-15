#!/bin/bash

# Script para fazer deploy do Sanity Studio em produção
# Execute: bash deploy-studio-prod.sh

echo "🚀 Deploy do Sanity Studio para Produção"
echo "========================================="
echo ""

# Verificar se está logado
echo "1. Verificando autenticação..."
npx sanity projects list > /dev/null 2>&1

if [ $? -ne 0 ]; then
  echo "❌ Você não está logado no Sanity."
  echo "   Execute: npx sanity login"
  echo "   E depois execute este script novamente."
  exit 1
fi

echo "✅ Autenticado com sucesso!"
echo ""

# Fazer deploy
echo "2. Fazendo deploy do Studio..."
echo "   Isso pode levar alguns minutos..."
echo ""

npx sanity deploy

if [ $? -eq 0 ]; then
  echo ""
  echo "✅ Deploy concluído com sucesso!"
  echo ""
  echo "🎉 Seu Sanity Studio está disponível em:"
  echo "   https://naturerota.sanity.studio"
  echo ""
  echo "📝 Próximos passos:"
  echo "   1. Acesse: https://naturerota.sanity.studio"
  echo "   2. Teste criar/editar um post"
  echo "   3. Seu site em produção já estará conectado!"
else
  echo ""
  echo "❌ Erro ao fazer deploy."
  echo "   Tente novamente ou peça ajuda."
fi
