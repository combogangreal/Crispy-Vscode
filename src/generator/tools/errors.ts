type PythonErrorName =
    | "PYTHON_NOT_INSTALLED"
    | "PYTHON_UNSUPPORTED"

type PlatformErrorName = 
    | "UNSUPPORTED_PLATFORM"
    | "UNKNOWN_PLATFORM"

type GitErrorName =
    | "GIT_UNINSTALLED"

type BlackErrorName = 
    | "BLACK_UNINSTALLED"

type SphinxErrorName =
    | "SPHINX_UNINSTALLED"
    | "DOCS_FOLDER_NOT_PRESENT"

export class ErrorBase<T extends string> extends Error {
    name: T;
    message: string;
    cause: any;
    constructor(name: T, message: string, cause?: any) {
        super();
        this.name = name;
        this.message = message;
        this.cause = cause;
    }
}

export class PythonError extends ErrorBase<PythonErrorName> {}
export class PlatformError extends ErrorBase<PlatformErrorName> {}
export class GitError extends ErrorBase<GitErrorName> {}
export class BlackError extends ErrorBase<BlackErrorName> {}
export class SphinxError extends ErrorBase<SphinxErrorName> {}