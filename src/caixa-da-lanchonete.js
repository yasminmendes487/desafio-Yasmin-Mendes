class CaixaDaLanchonete {
  constructor() {
    // Definição do cardápio com código, descrição e valor
    this.cardapio = new Map([
      ["cafe", { descricao: "Café", valor: 3.0 }],
      ["chantily", { descricao: "Chantily (extra do Café)", valor: 1.5 }],
      ["suco", { descricao: "Suco Natural", valor: 6.2 }],
      ["sanduiche", { descricao: "Sanduíche", valor: 6.5 }],
      ["queijo", { descricao: "Queijo (extra do Sanduíche)", valor: 2.0 }],
      ["salgado", { descricao: "Salgado", valor: 7.25 }],
      ["combo1", { descricao: "1 Suco e 1 Sanduíche", valor: 9.5 }],
      ["combo2", { descricao: "1 Café e 1 Sanduíche", valor: 7.5 }],
    ]);

    // Taxa de desconto para pagamento em dinheiro
    this.descontoDinheiro = 0.05;
    // Taxa de acréscimo para pagamento a crédito
    this.acrescimoCredito = 0.03;
  }

  calcularValorDaCompra(formaDePagamento, itens) {
    const formasDePagamento = ["dinheiro", "debito", "credito"];

    // Verificação da forma de pagamento válida
    if (!formasDePagamento.includes(formaDePagamento)) {
      return "Forma de pagamento inválida!";
    }

    // Verificação de itens no carrinho
    if (itens.length === 0) {
      return "Não há itens no carrinho de compra!";
    }

    let valorTotal = 0;
    let hasPrincipais = new Set();
    let hasChantilyOrQueijo = false;

    for (const item of itens) {
      const [codigo, quantidade] = item.split(",");
      const menuItem = this.cardapio.get(codigo);

      // Verificação de código de item inválido
      if (!menuItem) {
        return "Item inválido!";
      }

      // Verificação de quantidade inválida
      if (quantidade <= 0) {
        return "Quantidade inválida!";
      }

      // Cálculo do valor total da compra
      valorTotal += menuItem.valor * quantidade;

      // Adiciona itens principais ao conjunto de hasPrincipais
      if (codigo !== "chantily" && codigo !== "queijo") {
        hasPrincipais.add(codigo);
      } else {
        hasChantilyOrQueijo = true;
      }
    }

    // Verificação de itens extras sem itens principais correspondentes
    for (const item of itens) {
      const [codigo] = item.split(",");

      if (
        hasChantilyOrQueijo &&
        (codigo === "chantily" || codigo === "queijo")
      ) {
        if (!hasPrincipais.has(codigo === "chantily" ? "cafe" : "sanduiche")) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
    }

    // Aplicação de descontos/acréscimos de acordo com a forma de pagamento
    if (formaDePagamento === "dinheiro") {
      valorTotal *= 1 - this.descontoDinheiro;
    } else if (formaDePagamento === "credito") {
      valorTotal *= 1 + this.acrescimoCredito;
    }

    // Formatação do valor total e retorno da mensagem
    return `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  }
}

export { CaixaDaLanchonete };
