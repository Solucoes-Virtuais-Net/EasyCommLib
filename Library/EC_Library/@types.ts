interface ApiRequest {
    path: string,
    isQuery?: boolean,
    method: 'POST' | 'GET'
}

interface ICategoriaItem {
    categoria_pai: string | null,
    descricao: string,
    id: number,
    id_externo: number | null,
    nome: string,
    resource_uri: string,
    seo: string,
    url: string
}

interface IMarcaItem {
    id: number,
    id_externo: number | null,
    nome: string,
    apelido: string,
    descricao: string,
    imagem: string | null,
    resource_uri: string
}

interface IEstoqueItem {
    gerenciado: boolean,
    id: number,
    produto: string,
    quantidade: number,
    quantidade_reservada: number,
    quantidade_disponivel: number,
    resource_uri: string,
    situacao_em_estoque: number,
    situacao_sem_estoque: number
}

interface IImagenProdutoItem {
    caminho: string,
    id: number,
    mime: string,
    posicao: number | null,
    principal: boolean,
    produto: string,
    resource_uri: string
}

interface IGrade {
    id: number,
    nome: string,
    nome_visivel: string,
    resource_uri: string
}

interface IPreco {
    cheio: string,
    custo: string | null,
    id: number,
    produto: string,
    promocional: number,
    resource_uri: string
}

interface ICupomItem {
    aplicar_no_total: boolean,
    ativo: boolean,
    codigo: string,
    condicao_cliente: string,
    condicao_produto: string,
    cumulativo: boolean,
    data_criacao: Date,
    data_modificacao: Date,
    descricao: string,
    id: number,
    id_externo: number | null,
    quantidade: number,
    quantidade_por_cliente: number,
    quantidade_usada: number,
    resource_uri: string,
    tipo: string,
    validade: Date,
    valor: number,
    valor_minimo: number
}

interface ISEO {
    base_uri: string,
    description: string,
    id: number,
    keyword: string,
    resource_uri: string,
    title: string
}

interface IBancoItem {
    codigo: number,
    id: number,
    imagem: string,
    nome: string,
    resource_uri: string
}
interface IGrupoItem {
    id: number,
    nome: string,
    padrao: boolean,
    resource_uri: string
}

interface IPagamentoItem {
    codigo: number,
    id: number,
    imagem: string,
    nome: string,
    resource_uri: string
}

interface IEnvioItem {
    codigo: string,
    id: number,
    imagem: string,
    nome: string,
    resource_uri: string,
    tipo: string
}

interface IClienteItem {
    id: number,
    email: string,
    nome: string,
    tipo: string,
    resource_uri: string
}

interface IPedidoItem {
    id: number,
    numero: number,
    cliente_id: number,
    valor_subtotal: number,
    valor_envio: number,
    valor_desconto: number,
    valor_total: number,
    data_criacao: Date,
    data_modificacao: Date,
    data_expiracao: Date,
}

interface Imeta {
    limit: number,
    next: number | string | null,
    offset: number,
    previous: number | null,
    total_count: number
}

interface IPedidoFiltro {
    since_numero: number
    situacao_id: number
    pagamento_id: number
    limit: number
}

interface ISituacaoPedidoItem {
    aprovado: boolean,
    cancelado: boolean,
    codigo: string,
    final: boolean,
    id: number,
    nome: string,
    notificar_comprador: boolean,
    padrao: boolean,
    resource_uri: string
}

interface CategoriasAllResponse extends Imeta {
    objects: ICategoriaItem[]
}

interface IMarcaResponse extends Imeta {
    objects: IMarcaItem[]
}

interface IEstoqueResponse extends Imeta {
    objects: IEstoqueItem[]
}

interface IGradesResponse extends Imeta {
    objects: IGrade[]
}

interface IImagensResponse extends Imeta {
    objects: IImagenProdutoItem[]
}

interface IPrecoResponse extends Imeta {
    objects: IPreco[]
}
interface ICupomResponse extends Imeta {
    objects: ICupomItem[]
}

interface ISEOResponse extends Imeta {
    objects: ISEO[]
}

interface IBancoResponse extends Imeta {
    objects: IBancoItem[]
}

interface IPagamentoResponse extends Imeta {
    objects: IPagamentoItem[]
}

interface IEnvioResponse extends Imeta {
    objects: IEnvioItem[]
}

interface IClienteResponse extends Imeta {
    objects: IClienteItem[]
}
interface IGrupoResponse extends Imeta {
    objects: IGrupoItem[]
}

interface IPedidoResponse extends Imeta {
    objects: IPedidoItem[]
}

interface ISituacaoResponse extends Imeta {
        objects: ISituacaoPedidoItem[]
}