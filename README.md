## Sobre

METROSP STATUS é um projeto que mostra informações básicas porém vitais para o acompanhamento do status operacional das linhas de metrô em São Paulo.

Ele utiliza os dados de uma api localizada nesse repositório [https://github.com/calvinsteixeira/status-metro-api](https://github.com/calvinsteixeira/status-metro-api)

## Inicialização

```bash
npm install
npm run dev
```

O projeto estará disponível no endereço local: [http://localhost:3000](http://localhost:3000).

## Observações

A primeira requisição nos dados pode levar até 50 segundos.

# Motivo: 
A api utilizada para get nos dados foi hospedada na plataforma  [https://render.com/](https://render.com/) no plano gratuito. Isso acarreta em algumas restrições da plataforma, como estratégia de cold start, que fará com que o web service entre em suspensão caso fique inativo por muito tempo e retome a atividade caso receba uma nova request.