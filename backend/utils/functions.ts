export function formatJsonToExcludePasswordAndBigint(obj: any): any {
    return JSON.parse(JSON.stringify(obj, (key, value) => {
        if (key === 'password') {
            return undefined; // Remove the password key
        }
        return typeof value === 'bigint' ? value.toString() : value;
    }));
}