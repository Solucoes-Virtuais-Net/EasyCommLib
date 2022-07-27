class EC_Library {
    chave: string;
    constructor(chave) {
        if (!chave || chave === "") {
            throw new Error("Erro na biblioteca! campio vazio, preencha com uma chave api.")
        } else {
            this.chave = chave
        }
    }

    private async Api<T>(request: ApiRequest): Promise<T> {
        return await new Promise((resolver, reject) => {

            // console.log(`https://api.awsli.com.br/v1/${request.path}?format=json&chave_api=${this.chave}&chave_aplicacao=dfa334b6-912c-4c8b-b2a9-d2eb91987ef3`)
            fetch(`https://api.awsli.com.br/v1/${request.path}${request.isQuery ? "&" : "?"}format=json&chave_api=${this.chave}&chave_aplicacao=dfa334b6-912c-4c8b-b2a9-d2eb91987ef3`, {
                // mode: "no-cors",
                method: request.method,
            })
                .then(res => res.json())
                .then((res) => {
                    resolver(res);
                })
                .catch(err => {
                    console.log({ [`https://api.awsli.com.br/v1/${request.path}?format=json&chave_api=${this.chave}&chave_aplicacao=dfa334b6-912c-4c8b-b2a9-d2eb91987ef3`]: err });
                    reject(err)
                });
        })
    }


    //GET

    async Categoria(categoriaId?: string): Promise<CategoriasAllResponse | void> {
        const response = await this.Api<CategoriasAllResponse>({ method: "GET", path: `categoria/${categoriaId ? categoriaId : ""}` })
            .then(res => { return res })
        return response;
    }

    async Marca(marcaid?: string): Promise<IMarcaResponse | void> {
        const response = await this.Api<IMarcaResponse>({ method: "GET", path: `marca/${marcaid ? marcaid : ""}` })
            .then(res => { return res })
        return response;
    }

    async Estoque(estoqueId?: string): Promise<IEstoqueResponse | void> {
        const response = await this.Api<IEstoqueResponse>({ method: "GET", path: `produto_estoque/${estoqueId ? estoqueId : ""}` })
            .then(res => { return res })
        return response;
    }

    async Produto(produtoId?: string): Promise<IEstoqueResponse | void> {
        const response = await this.Api<IEstoqueResponse>({ method: "GET", path: `produto/${produtoId ? produtoId : ""}` })
            .then(res => { return res })
        return response;
    }

    async Grade(produtoId?: string): Promise<IGradesResponse | void> {
        const response = await this.Api<IGradesResponse>({ method: "GET", path: `grades/${produtoId ? produtoId : ""}` })
            .then(res => { return res })
        return response;
    }

    async ImagensProduto(produtoId: string): Promise<IImagensResponse | void> {
        if (!produtoId || produtoId === "")
            throw new Error("Insira o id do produto")
        const response = await this.Api<IImagensResponse>({ method: "GET", isQuery: true, path: `produto_imagem/?produto=${produtoId}` })
            .then(res => { return res })
        return response;
    }

    // async ImagemEspecifico(produtoId: string): Promise<IImagensResponse | void> {
    //     if (!produtoId || produtoId === "")
    //         throw new Error("Insira o id do produto")
    //     const response = await this.Api<IImagensResponse>({ method: "GET", isQuery: true, path: `produto_imagem/?produto=${produtoId}` })
    //         .then(res => { return res })
    //     return response;
    // }

    ImagemVisualizar(caminho: string): string {
        if (!caminho || caminho === "")
            throw new Error("Selecione o caminho da imagem do produto.");
        return `https://cdn.awsli.com.br/${caminho}`;
    }

    async Preco(precoId?: string): Promise<IPrecoResponse | void> {
        const response = await this.Api<IPrecoResponse>({ method: "GET", isQuery: false, path: `produto_preco/${precoId ? precoId : ""}` })
            .then(res => { return res })
        return response;
    }

    async Cupom(cupomId?: string): Promise<ICupomResponse | void> {
        const response = await this.Api<ICupomResponse>({ method: "GET", isQuery: false, path: `cupom/${cupomId ? cupomId : ""}` })
            .then(res => { return res })
        return response;
    }

    async SEO(SEOId?: string): Promise<ISEOResponse | void> {
        const response = await this.Api<ISEOResponse>({ method: "GET", isQuery: false, path: `seo/${SEOId ? SEOId : ""}` })
            .then(res => { return res })
        return response;
    }

    async Cliente(clienteId?: string): Promise<IClienteResponse | void> {
        const response = await this.Api<IClienteResponse>({ method: "GET", isQuery: false, path: `cliente/${clienteId ? clienteId : ""}` })
            .then(res => { return res })
        return response;
    }

    async Banco(bancoId?: string): Promise<ISEOResponse | void> {
        const response = await this.Api<ISEOResponse>({ method: "GET", isQuery: false, path: `banco/${bancoId ? bancoId : ""}` })
            .then(res => { return res })
        return response;
    }

    async Pagamento(pagamentoId?: string): Promise<ISEOResponse | void> {
        const response = await this.Api<ISEOResponse>({ method: "GET", isQuery: false, path: `pagamento/${pagamentoId ? pagamentoId : ""}` })
            .then(res => { return res })
        return response;
    }

    async Envio(envioId?: string): Promise<ISEOResponse | void> {
        const response = await this.Api<ISEOResponse>({ method: "GET", isQuery: false, path: `envio/${envioId ? envioId : ""}` })
            .then(res => { return res })
        return response;
    }
    async Grupo(grupoId?: string): Promise<IGrupoResponse | void> {
        const response = await this.Api<IGrupoResponse>({ method: "GET", isQuery: false, path: `grupo/${grupoId ? grupoId : ""}` })
            .then(res => { return res })
        return response;
    }

    Pedido() {
        const Situacao = async (pedidoId?: string) => {
            const response = await this.Api<ISituacaoResponse>({ method: "GET", isQuery: false, path: `situacao/${pedidoId ? pedidoId : ""}` })
                .then(res => { return res })
            return response;
        }

        const HistoricoSituacao = async (pedidoId?: string) => {
            const response = await this.Api<ISituacaoResponse>({
                method: "GET",
                isQuery: pedidoId ? true : false,
                path: pedidoId ? `situacao_historico/search?numero=${pedidoId}` :
                    `situacao_historico/`
            })
                .then(res => { return res })
            return response;
        }

        const BuscarPedido = async (search: IPedidoFiltro) => {
            const response = await this.Api<any>({
                method: "GET",
                path: `pedido/search/?since_numero=${search.since_numero}&situacao_id=${search.situacao_id}&pagamento_id=${search.pagamento_id}&limit=${search.limit}`,
                isQuery: true
            }).then(res => { return res })
            return response;
        }

        const PedidoEspecifico = async (pedidoId: string) => {
            const response = await this.Api<any>({
                method: "GET",
                path: `pedido/${pedidoId}`
            }).then(res => { return res })
            return response;
        }

        return {
            Situacao,
            HistoricoSituacao,
            BuscarPedido,
            PedidoEspecifico
        }
    }

    async CodigoHTML(htmlId?: string): Promise<IGrupoResponse | void> {
        const response = await this.Api<IGrupoResponse>({ method: "GET", isQuery: false, path: `codigo_html/${htmlId ? htmlId : ""}` })
            .then(res => { return res })
        return response;
    }
}