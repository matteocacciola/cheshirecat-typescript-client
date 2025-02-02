export interface UriInterface {
    host: string;
    port?: number | null;
    scheme: string;
    toString(): string;
}

interface QueryParams {
    [key: string]: string;
}

export class Uri implements UriInterface {
    host: string = "";
    port?: number | null = null;
    scheme: string = "http";
    private path: string = "";
    private queryParams: QueryParams = {};

    withHost(host: string): this {
        this.host = host;
        return this;
    }

    withPort(port?: number | null): this {
        this.port = port;
        return this;
    }

    withScheme(scheme: string): this {
        this.scheme = scheme;
        return this;
    }

    withPath(path: string): this {
        this.path = path;
        return this;
    }

    withQueryItems(items: QueryParams): this {
        this.queryParams = { ...this.queryParams, ...items };
        return this;
    }

    toString(): string {
        let url = `${this.scheme}://${this.host}`;
        if (this.port) {
            url += `:${this.port}`;
        }
        if (this.path) {
            url += `/${this.path.replace(/^\/+/, "")}`;
        }
        const queryString = new URLSearchParams(this.queryParams).toString();
        if (queryString) {
            url += `?${queryString}`;
        }
        return url;
    }
}