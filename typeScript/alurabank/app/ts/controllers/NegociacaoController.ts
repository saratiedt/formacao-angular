import { domInject, imprime, throttle } from "../helpers/decorators/index";
import { Negociacao, Negociacoes } from "../models/index";
import { NegociacaoService } from "../service/index";
import { MensagemView, NegociacoesView } from "../views/index";

export class NegociacaoController {
  @domInject("#data")
  private _inputData: JQuery;
  @domInject("#datquantidadea")
  private _inputQuantidade: JQuery;
  @domInject("#valor")
  private _inputValor: JQuery;
  private _negociacoes = new Negociacoes();
  private _negociacoesView = new NegociacoesView("#negociacoesView");
  private _mensagemView = new MensagemView("#mensagemView");

  private _service = new NegociacaoService();

  constructor() {
    this._negociacoesView.update(this._negociacoes);
  }
  @throttle(500)
  adiciona(event: Event) {
    let data = new Date(this._inputData.val().replace(/-/g, ","));

    if (!this._ehDiaUtil(data)) {
      this._mensagemView.update(
        "Somente negociações em dias útFeis, por favor!"
      );
      return;
    }

    const negociacao = new Negociacao(
      data,
      parseInt(this._inputQuantidade.val()),
      parseFloat(this._inputValor.val())
    );

    this._negociacoes.adiciona(negociacao);

    imprime(negociacao, this._negociacoes, data);

    this._negociacoesView.update(this._negociacoes);
    this._mensagemView.update("Negociação adicionada com sucesso!");
  }

  private _ehDiaUtil(data: Date) {
    return (
      data.getDay() != DiaDaSemana.Sabado &&
      data.getDay() != DiaDaSemana.Domingo
    );
  }

  // app/ts/controllers/NegociacaoController.ts
  @throttle(500)
  importaDados() {
    this._service
      .obterNegociacoes((res) => {
        if (res.ok) return res;
        throw new Error(res.statusText);
      })
      .then((negociacoes) => {
        negociacoes.forEach((negociacao) =>
          this._negociacoes.adiciona(negociacao)
        );
        this._negociacoesView.update(this._negociacoes);
      });
  }
}
