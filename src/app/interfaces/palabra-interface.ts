
export interface ResultPalabra {
ok: boolean;
msg: string;
resp: Resp[];
}

export interface Resp {
    id: number;
    ids: number;
    titulo: string;
    titulo_shipibo: string;
    descripcion: string;
    descripcion_shipibo: string;
    audio: string;
    id_abecedario: number;
    Abecedario : Abecedario;
}

export interface Abecedario{
    id: number;
    abecedario: string;
    abecedario_shipibo: string;
    titulo: string;
    titulo_shipibo: string;
    estado: number;
}