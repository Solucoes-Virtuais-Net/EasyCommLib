interface IApi {
    path: string,
    method: any
}

interface meta {
    limit: number,
    next: number | null,
    offset: number,
    previous: number | null,
    total_count: number
}

interface ICategoryItem {
    id: number,
    id_externo: number | null,
    nome: string,
    descricao: string,
    categoria_pai: string | null,
    resource_uri: string
}

interface IResponsive {
    mediaPoint: number,
    logoAlignX?: alignX,
    toolsAlignX?: alignX,
    logoAlignY?: alignY,
    toolsAlignY?: alignY,
}

type alignX = "center" | "end" | "start"
type alignY = "end" | "start"
type CategoryAllResponse = meta & {
    objects: ICategoryItem[]
};