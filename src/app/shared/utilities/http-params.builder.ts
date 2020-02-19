import { HttpParams } from '@angular/common/http';

export class HttpParamsBuilder {
    private parameters: HttpParams = new HttpParams();

    get params() {
        return this.parameters;
    }

    public appendOptional(param: string, value: any) {
        return value ? this.append(param, value) : this;
    }

    public append(param: string, value: any) {
        this.parameters = this.parameters.append(param, `${value}`);
        return this;
    }
}
