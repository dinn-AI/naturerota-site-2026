#!/bin/bash

# Script para fazer deploy do Sanity Studio

echo "🚀 Fazendo deploy do Sanity Studio..."
echo ""

export SANITY_AUTH_TOKEN="skvEsE1mT84ixh2mbhLsPsmGNbi1LOuMyArsup0wtBMJIZSYmCynSbyyOolAFRQUf4MmgwP9egDUzrpUXyxQqNGFKVBvhWakZH4L23iZtvYVrGlLcmYJxAvYEVOyYPY6H9ZGe5C4zQbnYwwp2Cva2rgLI5eWeYGXYkbj8cdUoYXnvEI4hGmh"

# Fazer build
echo "1️⃣ Building Sanity Studio..."
npx sanity@latest build

# Fazer deploy
echo ""
echo "2️⃣ Deploying to Sanity..."
npx sanity@latest deploy --no-build

echo ""
echo "✅ Deploy concluído!"
echo "Acesse: https://naturerota.sanity.studio"

