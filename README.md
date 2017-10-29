# API de Eventos do Sapucaia Tech

API para servir lista de eventos, meetups, encontros e qualquer tipo de aglomeração sobre tecnologia de Montes Claros (MG).

---

## AVISO

Teremos uma ferramenta que exibirá os eventos de forma mais organizada. Você pode contribuir por meio de issues, como explicado abaixo.

---

## Como funciona

Se você tem algum evento (seja participante ou mesmo criador) [crie uma nova issue aqui](https://github.com/sapucaiatech/eventos-api/issues/new), seguindo o template básico.

### Titúlo da Issue:

```
[Nome do Evento] / [Data do Evento: YYYY-MM-DD]
```

### Conteúdo da Issue:

```
- Evento: [Nome do Evento]
- Link: [URL/Site do Evento]
- Local: [Nome do local && (Endereço || URL do Google Maps)]
- Data: YYYY-MM-DD
- Horário:
- Descrição: Rápida descrição
```

---

## Desenvolvimento

Pré-requisitos:

* [Git](https://git-scm.com/downloads)
* [Docker](https://docs.docker.com/engine/installation/)
* [Docker Compose](https://docs.docker.com/compose/install/)

Agora basta clonar o projeto e executar com o Docker Compose:

```sh
git clone https://github.com/sapucaiatech/eventos-api.git
cd eventos-api
docker-compose up
```

## Licença

[MIT](./LICENSE) © Sapucaia Tech
