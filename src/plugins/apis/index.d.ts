interface RequestsOptions extends RequestInit {
    method?: "GET" | "POST" | "put" | "DELETE" | "OPTION" | string,
    params?: Object | null,
    body?: any,
    headers?: any,
    responseType?: "JSON" | string
}