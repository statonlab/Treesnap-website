export default class Utils {
    /**
     * Checks if a value is proper json.
     *
     * @param string
     * @returns {boolean}
     */
    static isJson(string) {
        try {
            JSON.parse(string)
        } catch (e) {
            return false
        }

        return true
    }

    /**
     * Flattens an object into an array of values only.
     *
     * @param obj
     * @returns {Array}
     */
    static flattenObject(obj) {
        return Object.keys(obj).map((key => {
            if (Array.isArray(obj[key])) {
                return _.flattenDeep(obj[key])
            } else if (typeof obj[key] === 'object') {
                return this.flattenObject(obj[key])
            }

            return obj[key]
        }))
    }
}