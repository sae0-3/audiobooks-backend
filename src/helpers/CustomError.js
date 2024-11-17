class CustomError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
  }
}


class DatabaseConnectionError extends CustomError {
  constructor(message = "No se pudo conectar a la base de datos. Por favor, inténtelo más tarde o contacte al soporte técnico si el problema persiste.") {
    super(message, 500);
  }
}

class ConnectionError extends CustomError {
  constructor(message = "No se pudo establecer una conexión con la base de datos. Verifique su conexión a la red o inténtelo más tarde.") {
    super(message, 500);
  }
}

class UniqueViolationError extends CustomError {
  constructor(message = "El recurso que intenta crear ya existe. Verifique los datos ingresados y vuelva a intentarlo.") {
    super(message, 409);
  }
}

class ForeignKeyViolationError extends CustomError {
  constructor(message = "No se pudo completar la operación porque el recurso relacionado no existe. Por favor, verifique su solicitud.") {
    super(message, 400);
  }
}

class NotNullViolationError extends CustomError {
  constructor(message = "Algunos campos obligatorios están vacíos. Asegúrese de proporcionar toda la información requerida.") {
    super(message, 400);
  }
}

class SerializationError extends CustomError {
  constructor(message = "Conflicto de transacción. Por favor, intente realizar la operación nuevamente.") {
    super(message, 409);
  }
}

class SyntaxError extends CustomError {
  constructor(message = "Error de sintaxis en la consulta enviada. Revise la estructura de su solicitud e intente nuevamente.") {
    super(message, 400);
  }
}

class UndefinedFunctionError extends CustomError {
  constructor(message = "La función solicitada no está definida en el sistema. Verifique su solicitud o contacte al soporte.") {
    super(message, 400);
  }
}

class DataLengthError extends CustomError {
  constructor(message = "El tamaño de los datos excede el límite permitido. Reduzca el contenido y vuelva a intentarlo.") {
    super(message, 400);
  }
}

class InsufficientPrivilegeError extends CustomError {
  constructor(message = "No tiene los privilegios necesarios para realizar esta operación. Contacte a un administrador si requiere acceso.") {
    super(message, 403);
  }
}

class TableNotFoundError extends CustomError {
  constructor(message = "La tabla solicitada no existe en el sistema. Verifique la información proporcionada.") {
    super(message, 404);
  }
}

class DivisionByZeroError extends CustomError {
  constructor(message = "Se detectó una división por cero en la consulta. Modifique los parámetros y vuelva a intentarlo.") {
    super(message, 400);
  }
}

class ServiceUnavailableError extends CustomError {
  constructor(message = "El servicio de la base de datos no está disponible en este momento. Por favor, intente nuevamente más tarde.") {
    super(message, 503);
  }
}

class InternalServerError extends CustomError {
  constructor(message = "Ocurrió un error inesperado en el servidor. Estamos trabajando para resolverlo. Intente más tarde.") {
    super(message, 500);
  }
}

class AccessDeniedError extends CustomError {
  constructor(message = "No tiene permiso para acceder a este recurso. Verifique sus credenciales e intente nuevamente.") {
    super(message, 403);
  }
}

class ValidationPageError extends CustomError {
  constructor(message = "El número de página o la cantidad de elementos por página es inválido. Ajuste los valores e intente nuevamente.") {
    super(message, 400);
  }
}

class AudiobookNotFoundError extends CustomError {
  constructor(message = "El audiolibro solicitado no fue encontrado. Verifique el identificador proporcionado.") {
    super(message, 404);
  }
}

class InvalidAudiobookIDError extends CustomError {
  constructor(message = "El identificador del audiolibro proporcionado no es válido. Por favor, revise su solicitud.") {
    super(message, 400);
  }
}

class MissingCredentialsError extends CustomError {
  constructor() {
    super("Faltan campos obligatorios en la solicitud. Asegúrese de completar todos los datos necesarios.", 400);
  }
}

class UserNotFoundError extends CustomError {
  constructor() {
    super("No se encontró un usuario con la información proporcionada. Verifique los datos ingresados.", 404);
  }
}

class InvalidCredentialsError extends CustomError {
  constructor(message = "Las credenciales proporcionadas no son correctas. Verifique su correo y contraseña e intente nuevamente.") {
    super(message, 401);
  }
}

class EmailExistsError extends CustomError {
  constructor(message = "El correo electrónico proporcionado ya está registrado. Intente iniciar sesión o use otro correo.") {
    super(message, 409);
  }
}

class InvalidPasswordError extends CustomError {
  constructor(message = "La contraseña no cumple con los requisitos mínimos de seguridad. Asegúrese de incluir al menos ocho caracteres, una letra mayúscula, una minúscula, un número y un carácter especial.") {
    super(message, 400);
  }
}


export {
  AccessDeniedError,
  AudiobookNotFoundError,
  ConnectionError,
  CustomError,
  DataLengthError,
  DatabaseConnectionError,
  DivisionByZeroError,
  EmailExistsError,
  ForeignKeyViolationError,
  InsufficientPrivilegeError,
  InternalServerError,
  InvalidAudiobookIDError,
  InvalidCredentialsError,
  InvalidPasswordError,
  MissingCredentialsError,
  NotNullViolationError,
  SerializationError,
  ServiceUnavailableError,
  SyntaxError,
  TableNotFoundError,
  UndefinedFunctionError,
  UniqueViolationError,
  UserNotFoundError,
  ValidationPageError
}
