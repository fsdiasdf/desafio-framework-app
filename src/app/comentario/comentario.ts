import { Usuario } from "../login/usuario";
import { Post } from "../post/post";

export class Comentario {
    id: number;
    comentario: string;
    comentarios: string[]
    usuario: string;
    post: number;
}