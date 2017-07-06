export default class Utils {
    static isJson(string) {
        try {
            JSON.parse(string)
        } catch (e) {
            return false
        }

        return true
    }
}