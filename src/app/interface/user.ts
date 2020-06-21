export interface user {
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno?: string;
    imagen: string;
    sexo: string;
    fechaNacimiento: string;
    nacionalidad: string;
    lugarNacimiento: string;
    paisResidencia: string;
    estadoReside: string;
    municipio: string;
    localidad: string;
    email?: string;
    fechaRegistroExterno: string;
    idExterno?: number;
    direccion: string;
}