#!/bin/bash

echo "🔍 Verificando DNS de naturerota.com.br..."
echo ""

echo "1️⃣ Verificando registro A:"
dig +short naturerota.com.br A

echo ""
echo "2️⃣ Verificando www:"
dig +short www.naturerota.com.br

echo ""
echo "3️⃣ Verificando nameservers:"
dig +short naturerota.com.br NS

echo ""
echo "✅ Se aparecer '76.76.21.21' ou 'cname.vercel-dns.com', está funcionando!"
